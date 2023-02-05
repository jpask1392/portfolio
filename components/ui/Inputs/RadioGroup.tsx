import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import cn from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  items: any[]
  name: string
  onChange: any
}

const RadioGroup: React.FC<Props> = ({
  items,
  name,
  onChange,
}) => {
  const [value, setValue] = useState("");

  const handleValueChange = (value: string) => {
    setValue(value)
    onChange(value, name);
  }

  useEffect(() => {
    // set defaults
    setValue(items[0])
  }, [items])

  return (
    <RadixRadioGroup.Root 
      className="flex flex-wrap -mx-2"
      onValueChange={handleValueChange}
      name={name}
      value={value}
    >
      {
        items.map((item, i) => {
          const RadioButtonStyles = cn("block border rounded-md p-2 w-full", {
            "border-red" : value === item,
            "border-white" : value !== item,
          })

          return (
            <div className="px-2 flex-1" key={i}>
              <RadixRadioGroup.Item
                key={item}
                className={RadioButtonStyles} 
                value={item}
              >
                {item}
              </RadixRadioGroup.Item>   
            </div>
          )
        })
      }
    </RadixRadioGroup.Root>
  )
}

export default RadioGroup;
