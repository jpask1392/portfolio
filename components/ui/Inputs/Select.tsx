import DynamicIcon from '@/components/icons/DynamicIcon';
import cn from 'classnames';
import { useState } from 'react';
import * as Select from '@radix-ui/react-select';

interface Props {
  items: {
    name: string,
    value: string,
  }[]
  onChange: (value: any, name: string) => void
  defaultValue?: number[]
  name: string
}

const CustomSlider: React.FC<Props> = ({
  items,
  name,
  onChange,
}) => {
  const [value, setValue] = useState<string>(items[0].value);

  const handleValueChange = (value: string) => {
    setValue(value)
    onChange(value, name);
  }

  return (
    <Select.Root
      // name={name}
      defaultValue={items[0].value}
      onValueChange={handleValueChange}
    >
      <Select.Trigger className="w-full flex justify-between border-red border py-2 md:py-3 px-3 md:px-6 items-center">
        <Select.Value />
        <DynamicIcon type="select" className="rotate-90 h-5" />
        
      </Select.Trigger>

      <Select.Content className="bg-white rounded-sm border border-red">
        <Select.ScrollUpButton />

        <Select.Viewport className="px-3 py-3">
          {
            items.map((
              item, 
              index: number
            ) => {
              return (
                <Select.Item
                  key={index}
                  value={item.value} 
                  className={cn("h-12 flex items-center w-full px-3 hover:bg-red cursor-pointer", {
                    "bg-red" : item.value === value
                  })}
                >
                  <Select.ItemText>
                    <span className="text-red h3 !font-normal">
                      <span className="md:hidden">{item.name.split(":").pop()}</span>
                      <span className="hidden md:inline">{item.name}</span>
                    </span>
                  </Select.ItemText>
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
