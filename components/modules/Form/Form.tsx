import cn from 'classnames';
import { ReactNode, Component, createContext, useRef, useState, useEffect } from 'react';
import { 
  handleContactFormSubmit,
  handleNewsletter,
} from './actions';
import { string, number, date } from 'yup';

interface Props {
  action?: "contact" 
    | "search" 
    | "newsletter"
  children: ReactNode[] | Component[] | any[] | ReactNode | Component | any
  initialState?: {}
  stylePreset?: string
  className?: string
  onSubmit?: (formData: any) => any
  onChange?: (formData: any) => any
}

/**
 * Context used to trigger ajax 
 * loading icon in submit button
 */
export const FormContext = createContext({});

const Form: React.FC<Props> = ({
  children,
  action,
  initialState : initialStateCopy = {},
  className,
  onSubmit,
  onChange,
}) => {
  // if coming from SB, initial state is an array
  let initialState: any = {};
  Array.isArray(initialStateCopy)
    ? initialStateCopy.forEach((state) => initialState[state.id] = state.initialValue || "")
    : initialState = initialStateCopy;

  const [ formData, setFormData ] = useState(initialState); // stores key values of form data
  const [ submitting, setSubmitting ] = useState(false); // used to trigger any ajax features
  const [ submitted, setSubmitted ] = useState(false); // used to trigger submit in children
  const didMountRef = useRef(false); // used to prevent running on first mount
  const validations = useRef<any>({}); // used to store validation data without re-rendering

  /**
   * Use this object to set up actions.
   * 
   * Used as a shortcut to running preset actions
   */
  const formActions: any = {
    contact: handleContactFormSubmit,
  } 

  /**
   * Function runs when form has been submitted
   * 
   * @param e 
   */
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setSubmitted(true);

    // run through all inputs and run validations
    // only show the first error so it doesn't look overwhelming to the user
    if( !Object.values(validations.current).every(item => item) ) {
      setSubmitting(false);
      return;
    }

    try {
      /**
       * Perform either a preset submit
       * action or a custom one.
       */
      action && (action in formActions)
        ? await formActions[action](formData)
        : onSubmit && (await onSubmit(formData))
    } catch (error) {
      console.warn(error)
    } finally {
      setSubmitting(false);
      setSubmitted(false);
    }
  }

  /**
   * Run a callback if the formdata changes
   */
  useEffect(() => {
    if (didMountRef.current) {
      (async() => {
        onChange && (await onChange(formData));
      })()
    }

    didMountRef.current = true;
  }, [formData])

  /**
   * 
   * 
   * @param input {} 
   * @returns 
   */
  const validate = async (input: {
    id: string,
    value: string,
    required: boolean,
    type: string,
  }) => {
    // Build validation schema per input type
    let inputSchema = string();
    if (input.required) { inputSchema = inputSchema.required() }
    // if (!input.required) { inputSchema = inputSchema.nullable() }
    if (input.type === 'email') { inputSchema = inputSchema.email() } 

    // this assertion throws an error if any are found
    // it will return the first error in the chain as an exception
    try {
      await inputSchema.validate(input.value, { strict: true });
      validations.current[input.id] = true;
    } catch (error) {
      // can customize error messages here if needed
      validations.current[input.id] = false;
      return error.message;
    }

    // return false if no errors found
    return false;
  }

  return (
    <FormContext.Provider 
      value={{ formData, setFormData, submitting, validate, submitted }}
    >
      <form
        action={action}
        onSubmit={handleSubmit}
        noValidate
        className={cn(className, "w-full")}
      >
        { children }
      </form>
    </FormContext.Provider>
  )
}

export default Form;
