import { FormFieldTypes } from '../../utils/constants'
import { useState } from 'react'
// import SVG from 'react-inlinesvg'

// create possible fields
const TextArea = ({
  placeholder,
  required,
  name,
  width,
  setFormData,
  formData
}) => {
  const [ internalValue, setInternalValue ] = useState('')
  const handleChange = (e) => {
    setInternalValue(e.target.value)
    setFormData({...formData, [name]: e.target.value})
  }

  return (
    <div className="w-full border border-primary relative">
      <textarea 
        className="w-full h-full py-3 md:py-4 px-5"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        rows="10"
      />
      <span className="absolute top-6 left-4">
        {/* <SVG src={`/svg/${fields.icon}.svg`} /> */}
      </span>
    </div>
  )
}

const Text = ({
  placeholder,
  required,
  type,
  name,
  width,
  setFormData,
  formData
}) => {
  const [ internalValue, setInternalValue ] = useState('');
  const handleChange = (e) => {
    setInternalValue(e.target.value)
    setFormData({...formData, [name]: e.target.value})
  }

  return (
    <div className="w-full border border-primary relative">
      <input 
        className="w-full py-3 md:py-4 px-5"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder + (required ? '*' : '')}
        required={required}
        type={type}
      />
      <span className="absolute top-6 left-4">
        {/* <SVG src={`/svg/${icon}.svg`} /> */}
      </span>
    </div>
  )
}

const File = ({fields, setFormData, formData}) => {
  // const [ internalValue, setInternalValue ] = useState({})
  const handleChange = (e) => {
    // setInternalValue(e.target.value)
    setFormData({...formData, [fields.name]: e.target.files[0]})
  }

  return (
    <span className={`w-full max-w-${fields.width} p-3`}>
      <input 
        className="w-full border border-black p-4 bg-transparent"
        // value={internalValue}
        onChange={handleChange}
        required={fields.required}
        type="file"
        accept="application/msword, application/pdf"
      />
    </span>
  )
}

const FormRenderer = ({ item, setFormData, formData }) => {
  // map the components to constants
  const FormFieldMap = {
    [FormFieldTypes.TextArea]: TextArea,
    [FormFieldTypes.Text]: Text,
    [FormFieldTypes.Email]: Text,
    [FormFieldTypes.File]: File,
  };

  const contentTypeId = item.type;
  const Component = FormFieldMap[contentTypeId];

  if (!Component) {
    console.warn(`${contentTypeId} can not be handled`);
    return null;
  }

  const { _uid } = item;

  const componentProps = {
    ...item, // field data from item
    setFormData, // function to set form data
    formData // existing form data to duplicate
  };

  return <Component key={`${contentTypeId}-${_uid}`} {...componentProps} />;
};

export default FormRenderer