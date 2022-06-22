import DynamicIcon from "@/components/icons/DynamicIcon";

export const FormFieldTypes = {
  Text: 'text',
  Email: 'email',
  TextArea: 'textarea',
  Select: 'select',
  File: 'file',
}

export const renderOptions = {
  blokResolvers: {
    ['icon']: (props) => <DynamicIcon {...props} />
  }
}
