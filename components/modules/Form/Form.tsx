import useAccount from '@/components/hooks/useAccount';
import { ReactNode, Component, createContext, useContext, useState } from 'react';
import useToast from "@/components/hooks/useToast";
import { 
  handleContactFormSubmit,
  handleNewsletter,
} from './actions';

import cn from 'classnames';

interface Props {
  action: string
  children: ReactNode[] | Component[] | any[] | ReactNode | Component | any
  stylePreset?: string
  initialState?: any
}

/**
 * Context used to trigger ajax 
 * loading icon in submit button
 */
export const FormContext = createContext({});

const Form: React.FC<Props> = ({
  children,
  action,
  initialState = {},
}) => {
  const [ toasts, addToast ] = useToast();
  const [ formData, setFormData ] = useState(initialState);

  const [ submitting, setSubmitting ] = useState(false);

  const {
    handleCreateAccount,
    handleAccountLogin,
  } = useAccount();

  /**
   * Use this object to set up actions
   */
  const formActions: any = {
    contact: handleContactFormSubmit,
    // newsletter: handleNewsletter,
    accountLogin: handleAccountLogin,
    createAccount: handleCreateAccount,
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await formActions[action](formData);
    } catch (error) {
      console.warn(error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormContext.Provider 
      value={{ formData, setFormData, submitting }}
    >
      <form
        action={action}
        onSubmit={handleSubmit}
        noValidate
        className="w-full"
      >
        { children }
      </form>
    </FormContext.Provider>
  )
}

export default Form;
