import { ReactNode, Component, createContext, useContext, useState } from 'react';
import useToast from "@/components/hooks/useToast";
import { 
  handleContactFormSubmit,
  handleNewsletter,
  handleAccountLogin
} from './actions';
import cn from 'classnames';

interface Props {
  action: string
  children: ReactNode[] | Component[] | any[] | ReactNode | Component | any
  stylePreset?: string
}

/**
 * Context used to trigger ajax 
 * loading icon in submit button
 */
export const FormContext = createContext({
  submitting: false,
  setSubmitting: (data: any) => data
});

const Form: React.FC<Props> = ({
  children,
  action,
  stylePreset,
}) => {
  const [ toasts, addToast ] = useToast();
  const [ submitting, setSubmitting ] = useState(false);
  const formActions: any = {
    contact: handleContactFormSubmit,
    newsletter: handleNewsletter,
    accountLogin: handleAccountLogin,
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    setSubmitting(true);

    // check form for errors
    if (!form.checkValidity()) {
      
      form.reportValidity();

      addToast({
        title: "Error",
        message: "Please correct form errors.",
        style: "error"
      });

      setSubmitting(false);

      return false;
    }

    // collect form data
    const data = Object.fromEntries(new FormData(form).entries());

    // trigger preset actions
    if (action in formActions) {
      const {
        successTitle = "",
        successMessage = "",
        errorTitle = "",
        errorMessage = "",
      } = await formActions[action](data);

      if (errorMessage) {
        addToast({
          title: "Error",
          message: errorMessage || "Oops",
          style: "error"
        });
      } else {
        addToast({
          title: "Success",
          message: successMessage || "Wohoo",
          style: "success"
        });
      }
    }

    setSubmitting(false);

    // clear form
    [...form.elements].forEach((target: any) => {
      let native: any = false;
      if (target.nodeName === "INPUT") {
        native = Object
          .getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
      }

      if (target.nodeName === "TEXTAREA") {
        native = Object
          .getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value');
      }

      if (!native) return;

      // native.set.call(target, '')
      // target.dispatchEvent(new Event('change', { bubbles: true })); 

      // 
    })
  }

  return (
    <FormContext.Provider 
      value={{ submitting, setSubmitting }}
    >
      <form
        action={action}
        onSubmit={handleSubmit}
        className={cn({
          "py-10 md:py-20 lg:py-32 px-5 md:px-16 xl:px-24 2xl:px-32" : stylePreset === "contactForm"
        })}
        noValidate
      >
        { children }
      </form>
    </FormContext.Provider>
  )
}

export default Form;
