import cn from 'classnames';
import { useState, useEffect, useContext } from 'react';
import { FormContext } from "@/components/modules/Form";

interface Props {
  onValueChange?: (value: string, errors: any) => void
  id: string
  type?: string,
  name: string
  placeholder: string
  required?: boolean
  wrapperClasses?: string
  inputClasses?: string
}

const Input: React.FC<Props> = ({
  onValueChange,
  type = 'text',
  id,
  name,
  placeholder,
  required = false,
  wrapperClasses,
  inputClasses,
}) => {
  /**
   * Validation regex patterns for input types
   */
  const typeValidationPatterns: any = {
    tel: "^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$",
    email: "/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i"
  }

  const Tag = type === "textarea" ? "textarea" : "input";
  const [ value, setValue ] = useState('');
  const { formData, setFormData } = useContext<any>(FormContext);

  useEffect(() => {
    id && setFormData({...formData, [id]: value})
  }, [value])

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div 
      className={cn(wrapperClasses, "ui-input relative w-full mt-4")}
    >
      {/* The input */}
      <Tag 
        id={id}
        type={type === "textarea" ? undefined : type}
        className={cn("rounded-none py-3 px-3 w-full bg-transparent border", {
          "min-h-[100px]" : type === "textarea",
          "border-primary placeholder-primary text-primary" : true,
        })}
        placeholder={placeholder + (required ? "*" : "")}
        onChange={handleChange}
        value={value}
        required={required}
      />

      {/* Errors */}
      {/* {
        errors && displayError && (
          <span className="absolute top-full right-0 text-xs text-red-500 text-right w-7/12">
            {errors}
          </span>
        )
      } */}
    </div>
  )
}

export default Input;
