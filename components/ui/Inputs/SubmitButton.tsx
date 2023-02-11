import Button from '../Button';
import { useFormikContext } from 'formik';

const SubmitButton = (props: any) => {
  const { values, submitForm } = useFormikContext();

  return (
    <Button
      {...props}
      ajaxClick={submitForm}
      isSubmit
    />
  )
}

export default SubmitButton;