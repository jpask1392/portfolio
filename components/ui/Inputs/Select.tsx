import * as RadixSlider from '@radix-ui/react-slider';
import cn from 'classnames';
import { useState, useRef } from 'react';
import { formatMoney } from '@/utils/formatMoney';
import * as Select from '@radix-ui/react-select';

interface Props {
  items: string[]
  onChange: (value: any, name: string) => void
  defaultValue?: number[]
  name: string
}

const CustomSlider: React.FC<Props> = ({
  items,
  name,
  onChange,
}) => {
  const [value, setValue] = useState<string>(items[0]);

  const handleValueChange = (value: string) => {
    setValue(value)
    onChange(value, name);
  }

  return (
    <Select.Root
      // name={name}
      defaultValue={items[0]}
      onValueChange={handleValueChange}
    >
      <Select.Trigger className="w-full flex justify-between border-secondary border py-3 px-6">
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>

      <Select.Content className="bg-white rounded-sm border border-secondary">
        <Select.ScrollUpButton />

        <Select.Viewport className="px-3 py-3">
          {
            items.map((item: string, index: number) => {
              return (
                <Select.Item
                  key={index}
                  value={item} 
                  className={cn("h-12 flex items-center w-full px-3", {
                    "bg-primary" : item === value
                  })}
                >
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>   
              )
            })
          }
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select.Root>
  )
}
export default CustomSlider;
