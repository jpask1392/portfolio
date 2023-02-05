import DynamicIcon from '@/components/icons/DynamicIcon';
import cn from 'classnames';
import { useState, useEffect, useContext, useRef } from 'react';
import { FormContext } from "@/components/modules/Form";

interface Props {
  onValueChange?: (value: string, errors: any) => void
  id: string
  placeholder: string
  type?: string
  required?: boolean
  wrapperClasses?: string
  inputClasses?: string
  onDark?: boolean
  initialValue?: string
  icon?: string
}

const Input: React.FC<Props> = ({
  id,
  type = 'text',
  placeholder,
  required = false,
  wrapperClasses,
  onDark,
  initialValue = '',
  icon
}) => {
  const Tag = type === "textarea" ? "textarea" : "input";
  const [ value, setValue ] = useState(initialValue);
  const [ inputError, setInputError ] = useState<string>("");

  // form state
  const { 
    formData, 
    setFormData, 
    validate,
    submitted,
  } = useContext<any>(FormContext);

  useEffect(() => {
    if (submitted) {
      (async () => {
        const errorCheck = await validate({
          id: id,
          value: value,
          required: required,
          type: type,
        });
  
        if (errorCheck) {
          setInputError(errorCheck)
        } else {
          setInputError("")
        }
      })()
    }
  }, [submitted])

  // validate everything when page loads
  // but do not show any indicators
  useEffect(() => {
    (async() => {
      await validate({
        id: id,
        value: value,
        required: required,
        type: type,
      });
    })()
  }, [])

  /**
   * Handle on the fly validations to the input
   * and update the current state of the form
   * 
   * @param e 
   */
  const handleValueChange = (e: any) => {
    e.preventDefault();

    (async () => {
      const errorCheck = await validate({
        id: id,
        value: e.target.value,
        required: required,
        type: type,
      });

      if (errorCheck) {
        setInputError(errorCheck)
      } else {
        setInputError("")
      }
    })()

    // set the value
    setValue(e.target.value);
    setFormData({...formData, [id]: e.target.value});
  }

  return (
    <div 
      className={cn(wrapperClasses, "ui-input relative w-full mt-4 first-of-type:mt-0")}
    >
      <span className="text-black absolute top-1/2 -translate-y-1/2 left-3 -mt-px">@</span>

      {/* The input */}
      <Tag 
        id={id}
        type={type === "textarea" ? undefined : type}
        className={cn("py-3 pr-5 pl-9 w-full bg-background focus:outline-none focus:ring-1 h-full text-sm lg:text-base", {
          "min-h-[100px] flex" : type === "textarea",
          "focus:ring-red-400" : inputError.length,
          "border-white placeholder-white text-white" : onDark,
          "border-black placeholder-black text-black" : !onDark,
        })}
        placeholder={placeholder + (required ? "*" : "")}
        onChange={handleValueChange}
        value={value}
        required={required}
        autoComplete={type === "password" ? "current-password" : undefined}
      />

      

      {/* Errors */}
      {
        inputError ? (
          <p className="text-sm text-red text-left pt-2 absolute top-full mt-2">
            <DynamicIcon type="error" className="text-red-700 h-4 inline-block mr-1 relative -top-px"/> 
            <span className="first-letter:uppercase inline-block">{inputError}.</span>
          </p>
        ) : null
      }
    </div>
  )
}

export default Input;
