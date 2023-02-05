import * as RadixCheckbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import cn from 'classnames';
import { useEffect, useState, useContext, useCallback } from 'react';
import DynamicIcon from '@/components/icons/DynamicIcon';
import { FormContext } from "@/components/modules/Form";

interface Props {
  value?: string | boolean | any
  label: string
  id: string
  style: string
  onValueChange?: (id: string, value: any) => void
  disabled?: boolean
}

const Checkbox: React.FC<Props> = ({
  value,
  label,
  id,
  style = 'sideLabel',
  onValueChange,
  disabled
}) => {
  const { formData, setFormData } = useContext<any>(FormContext);
  const [checked, setChecked] = useState(value);
  const checkBoxStyles = cn("block border flex justify-center items-center", {
    "bg-transparent" : style === "sideLabel" && checked,
    // "border-red" : checked,
    "border-red xl:border-red" : !checked,
    "h-2.5 w-2.5" : style === "sideLabel",
    "p-2 w-full" : style === "radio",
    "opacity-30" : disabled
  });

  const handleValueChange = (value: boolean) => {
    setChecked(value);

    // copy object for removing keys
    const formDataCopy = {...formData};

    value
      ? formDataCopy[id] = value
      : delete formDataCopy[id];

    id && setFormData(formDataCopy);
  }

  return (
    <div className="flex space-x-3">
      <RadixCheckbox.Root        
        defaultChecked={value}
        className={cn(checkBoxStyles, "mt-2.5 relative")}
        onCheckedChange={handleValueChange}
        value={checked}
        id={id}
        disabled={disabled}
      >
        
        <RadixCheckbox.Indicator>
          <span className="absolute inset-0 bg-red xl:bg-red"></span>
        </RadixCheckbox.Indicator>

        {
          label && style === "radio" &&  (
            <Label.Root htmlFor={id}>{label}
            </Label.Root>
          )
        }
      </RadixCheckbox.Root>

      { 
        label && style === "sideLabel" && (
          <Label.Root 
            className={cn("cursor-pointer h3 xl:text-white", { "opacity-30" : disabled })}
            htmlFor={id}
          >{label}</Label.Root>
        ) 
      }
    </div>
  )
}

export default Checkbox;
