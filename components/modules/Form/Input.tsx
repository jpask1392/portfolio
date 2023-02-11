import type { FormInput } from "@/types/storyBlok";
import cn from "classnames";
import { Field } from "formik";

interface Props extends FormInput {
  errors?: any
  touched?: any
  className?: string
}

const Input: React.FC<Props> = ({
  name,
  errors,
  touched,
  required = true,
  as = "input",
  placeholder,
  className,
  width = "full",
  type = "text",
}) => {
  const validate = (value: string | undefined) => {
    if (required && !value) {
      return "Required Field";
    }
  }

  return (
    <div className={cn(className, `w-${width} relative`)}>
      <Field 
        name={name} 
        as={as}
        type={type}
        validate={validate} 
        className={cn("border w-full border-black rounded-3xl py-4 px-10", {
          "ring-offset-0 ring-2 ring-red-600" : errors[name] && touched[name],
        })}
        placeholder={placeholder || undefined}
      />
      {errors[name] && touched[name] && <div className="top-full text-xs mt-2">*{errors[name]}</div>}
    </div>
  )
}

export default Input;