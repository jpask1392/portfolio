import * as RadixCheckbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import cn from 'classnames';
import { useState } from 'react';
import DynamicIcon from '@/components/icons/DynamicIcon';

interface Props {
  value: string
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
  const [checked, setChecked] = useState(false);
  const checkBoxStyles = cn("block border rounded-md flex justify-center items-center", {
    "bg-primary" : style === "sideLabel" && checked,
    "border-primary" : checked,
    "border-black" : !checked,
    "h-6 w-6" : style === "sideLabel",
    "p-2 w-full" : style === "radio",
    "opacity-30" : disabled
  });

  const handleValueChange = (value: boolean) => {
    setChecked(!checked);

    /**
     * Pass the value to parent component
     */
    onValueChange && onValueChange(id, value)
  }

  return (
    <div className="flex space-x-3">
      <RadixCheckbox.Root 
        className={checkBoxStyles}
        onCheckedChange={handleValueChange}
        value={value}
        id={id}
        disabled={disabled}
      >
        {
          label && style === "sideLabel" &&  (
            <RadixCheckbox.Indicator>
              <DynamicIcon type="checkmark" />
            </RadixCheckbox.Indicator>
          )
        }

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
            className={cn("cursor-pointer", { "opacity-30" : disabled })}
            htmlFor={id}
          >{label}</Label.Root>
        ) 
      }
    </div>
  )
}

export default Checkbox;
