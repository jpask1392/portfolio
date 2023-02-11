import type { FormInput } from "@/types/storyBlok";
import type { SbBlokData } from "@storyblok/react";
import Select from "./Select";
import SubmitButton from "@/components/ui/Inputs/SubmitButton";
import Input from "./Input";
import { Formik, Form, Field } from "formik";
import cn from "classnames";

interface Props {
  onSubmit?: (values: any, actions: any) => any
  onSuccess?: any
  submitButton?: any
  className?: string
  fields: FormInput[]
  alignSubmit?: string
}

interface Blok extends SbBlokData, Props {}

interface FormProps extends Props {
  children?: any
  blok?: Blok
}

const FormWrapper: React.FC<FormProps> = (props) => {
  const {
    submitButton,
    onSuccess,
    fields = [],
    className,
    onSubmit,
    alignSubmit = "center"
  } = props.blok || props;

  let initialValues: any = {};
  fields.forEach(({ name, initialValue }) => initialValues[name] = initialValue)

  const handleSubmit = async (values: string[], actions: any) => {
    if (onSubmit) {
      const response = await onSubmit(values, actions);
      onSuccess && onSuccess(response, values)
    } else {
      // simulate response for testing
      await new Promise((r, reject) => setTimeout(reject, 1000))
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ 
        errors, 
        touched, 
        isValidating,
        isSubmitting 
      }) => (
        <Form className={cn(className, "w-full")}>
          <div className={cn("flex flex-wrap -mx-2 -mb-4", {
            "pb-6" : submitButton && submitButton.length
          })}>
            {
              fields.map(({
                name = "",
                placeholder = "",
                inputType = "input",
                width = "full",
                required = false,
                options,
                onChangeFunction,
                ...rest
              }, index) => {
                let codeBlock = false;
                if (onChangeFunction && onChangeFunction.content[0].type === "code_block") {
                  codeBlock = onChangeFunction.content[0].content[0].text;
                }

                const defaultProps = {
                  ...rest,
                  className: "px-2 mb-4",
                  name: name,
                  errors: errors,
                  touched: touched,
                  placeholder: `${placeholder}${required ? "*" : ""}`,
                  as: inputType,
                  required: required,
                  width: width || "full",
                  codeBlock: codeBlock,
                }

                if (inputType === "input" || inputType === "textarea") {
                  return (
                    <Input
                      key={index}
                      {...defaultProps}
                    />
                  )
                }

                if (inputType === "select") {
                  return (
                    <Field
                      key={index}
                      {...defaultProps}
                      component={Select} 
                      options={options?.items || [{ name: "", value: "" }]}  
                    />
                  )
                }
              })
            }            
          </div>
          
          <div className={`w-full text-${alignSubmit}`}>
            {
              submitButton && submitButton.length ? (
                <SubmitButton {...submitButton[0]} />
              ) : null
            }
          </div>       
        </Form>
      )}
    </Formik>
  )
}

export default FormWrapper;
