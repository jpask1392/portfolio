import * as Label from '@radix-ui/react-label';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

interface Props {
  onValueChange?: (value: string, errors: any) => void
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
  name,
  placeholder,
  required = false,
  wrapperClasses,
  inputClasses,
}) => {
  const inputRef = useRef<null | HTMLInputElement | HTMLTextAreaElement | any>(null);
  const [ value, setValue ] = useState('');
  const [ isHover, setIsHover ] = useState<boolean>(false);
  const [ errors, setErrors ] = useState<string | boolean>(false);
  const [ displayError, setDisplayErrors ] = useState<boolean>(false);
  const [ inputState, setInputState ] = useState<boolean | 'focus' | 'active'>(false);

  /**
   * Validation regex patterns for input types
   */
  const typeValidationPatterns: any = {
    tel: "^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$",
    email: "/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i"
  }

  /**
   * Attach events
   */
  const handleChange = (e: any) => {
    if (errors) setDisplayErrors(true);
    setValue(e.target.value);

    // pass the current value up
    onValueChange && onValueChange(e.target.value, errors);
  }

  const handleOnblur = () => { 
    (value.length === 0)
      ? setInputState(false)
      : setInputState('focus');
  }

  const handleOnFocus = () => setInputState('active');
  const handleMouseOver = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const handleInvalid = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (errors) setDisplayErrors(true);
  }

  useEffect(() => {
    // update error using HTML5 built in validation 
    if (inputRef.current) {
      if (!inputRef.current.checkValidity()) {
        setErrors(inputRef.current.validationMessage);
      } else {
        setErrors(false)
      }
    }

    if (!value.length && inputState === 'focus') {
      setInputState(false);
    }
  }, [value])

  return (
    <div 
      className={cn(wrapperClasses, "relative w-full mt-10")}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {/* The input */}
      {
        type !== 'textarea' ? (
          <input 
            ref={inputRef}
            className={cn(inputClasses, [
              "text-black",
              "w-full",
              "py-4",
              "px-7",
              "border-b",
              "border-gray-200",
              "focus:outline-none",
              "font-bold",
              "text-2xl"
            ], {
              "bg-gray-100" : inputState === 'active',
            })}
            name={name}
            type={type}
            pattern={typeValidationPatterns[type] || undefined}
            required={required}
            value={value}
            onChange={handleChange}
            onFocus={handleOnFocus}
            onBlur={handleOnblur}
            onInvalid={handleInvalid}
            onInput={handleOnFocus}
          />
        ) : null
      }

      {
        type === 'textarea' ? (
          <textarea 
            ref={inputRef}
            className={cn(inputClasses, [
              "text-black",
              "w-full h-full",
              "py-4",
              "px-7",
              "border-b",
              "border-gray-200",
              "focus:outline-none",
              "font-bold",
              "text-2xl"
            ], {
              "bg-gray-100" : inputState === 'active',
            })}
            name={name}
            cols={1}
            rows={5}
            required={required}
            value={value}
            onChange={handleChange}
            onFocus={handleOnFocus}
            onBlur={handleOnblur}
            onInvalid={handleInvalid}
          />
        ) : null
      }
      

      {/* Placeholder */}
      <Label.Root 
        className={cn([
          "absolute",
          "left-7",
          "transition-all",
          "duration-300",
          "text-black",
          "pointer-events-none"
        ], {
          "top-0 transform -translate-y-full text-sm pb-1 tracking-wide" : inputState,
          "top-1/2 transform -translate-y-1/2 font-bold text-2xl" : !inputState && type !== "textarea",
          "top-4 transform font-bold text-2xl" : !inputState && type === "textarea"
        })}
      >
        { placeholder }
      </Label.Root>

      {/* Animation Line */}
      <span className={cn([
        "h-px",
        "absolute",
        "bottom-0",
        "inset-x-0",
        "z-10",
        "transition-all",
        "duration-300"
      ], {
        "bg-primary" : inputState === 'active' || isHover && !displayError,
        "bg-red-500" : errors && displayError,
        "w-0" : !isHover && !inputState || inputState === 'focus' && !isHover,
        "w-full" : inputState || isHover
      })} />

      {/* Errors */}
      {
        errors && displayError && (
          <span className="absolute top-full right-0 text-xs text-red-500 text-right w-7/12">
            {errors}
          </span>
        )
      }
    </div>
  )
}

export default Input;
