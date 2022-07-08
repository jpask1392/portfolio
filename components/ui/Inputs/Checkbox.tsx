import * as RadixCheckbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import DynamicIcon from '@/components/icons/DynamicIcon';

interface Props {
  value: string | boolean | any
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
  const [checked, setChecked] = useState(value);
  const checkBoxStyles = cn("block border rounded-md flex justify-center items-center", {
    "bg-transparent" : style === "sideLabel" && checked,
    "border-secondary" : checked,
    "border-black" : !checked,
    "h-6 w-6" : style === "sideLabel",
    "p-2 w-full" : style === "radio",
    "opacity-30" : disabled
  });

  const handleValueChange = (value: boolean) => {
    setChecked(value);

    /**
     * Pass the value to parent component
     */
    onValueChange && onValueChange(id, value)
  }

  return (
    <div className="flex space-x-3">
      <RadixCheckbox.Root
        defaultChecked={value}
        className={checkBoxStyles}
        onCheckedChange={handleValueChange}
        value={checked}
        id={id}
        disabled={disabled}
      >
        
        <RadixCheckbox.Indicator>
          <DynamicIcon type="checkmark" />
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
            className={cn("cursor-pointer h7 text-secondary", { "opacity-30" : disabled })}
            htmlFor={id}
          >{label}</Label.Root>
        ) 
      }
    </div>
  )
}

export default Checkbox;
