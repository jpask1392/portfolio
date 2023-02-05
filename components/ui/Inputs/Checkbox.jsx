import cn from 'classnames';
import { useState, useEffect, useContext } from 'react';
import { FormContext } from "@/components/modules/Form";
import DynamicIcon from '@/components/icons/DynamicIcon';

const Checkbox = ({
  id,
  groupId,
  placeholder,
  required,
  valueTest,
  defaultSelected = false,
  style = "default"
}) => {
  const [ value, setValue ] = useState({[id] : defaultSelected});
  const { formData, setFormData } = useContext(FormContext);

  useEffect(() => {
    const newFormData = {}
    
    if (groupId) {
      newFormData = {
        ...formData, 
        [groupId]: {
          ...formData[groupId], 
          [id]: value[id]
        }
      }

      // clear out false values
      Object.keys(newFormData[groupId]).forEach(key => {
        if (!newFormData[groupId][key]) {
          delete newFormData[groupId][key];
        }
      });
      
    } else {
      newFormData = {
        ...formData, 
        ...value,
      }
    };

    id && setFormData(newFormData)
  }, [value])

  const handleChange = (e) => {
    setValue({[e.target.id] : e.target.checked})
  }

  // styles
  const fullBlockLabelStyles = cn("shadow-md p-3 rounded-lg w-full", {
    "bg-lightBlue font-bold" : value[id],
  });

  const fullBlockCheckboxStyles = cn("flex-shrink-0 border-2 w-4 h-4 inline-flex rounded-full mr-3 items-center justify-center", {
    "border-black" : value[id],
    "border-lightBlue" : !value[id]
  });

  const defaultCheckboxStyles = cn("w-5 h-5 inline-block border-2 mr-5 rounded-md inline-flex items-center justify-center bg-lightBlue", {
    "border-black" : value[id],
    "border-lightBlue" : !value[id]
  });

  return (
    <div>
      <input 
        id={id}
        type="checkbox"
        className="sr-only"
        onChange={handleChange}
        value={valueTest}
        required={required}
      />

      <label 
        htmlFor={id}
        className={cn("cursor-pointer flex items-center ", {
          [fullBlockLabelStyles] : style === "fullBlock",
        })}
      >
        <span 
          className={cn({
            [fullBlockCheckboxStyles] : style === "fullBlock",
            [defaultCheckboxStyles] : style === "default"
          })}>{value[id] ? <DynamicIcon type="check" /> : null}
        </span>
        {
          placeholder ? (
            <span
              className={cn({
                "text-greyText" : !value[id],
              })}
            >{placeholder + (required ? "*" : "")}</span>
          ) : null
        }
      </label>
    </div>
  )
}

export default Checkbox;