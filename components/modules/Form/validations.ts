export const validations = (
  value: string, 
  required: boolean,
  type?: string,
) => {
  const errors: string[] = [];

  if (!value.length && required) {
    errors.push('Cannot be blank');
    return errors;
  }

  return errors;

}