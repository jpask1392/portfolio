import type { FormInput } from '@/types/storyBlok';
import DynamicIcon from '@/components/icons/DynamicIcon';
import cn from 'classnames';
import * as Select from '@radix-ui/react-select';

interface Props {
  options: {
    name: string,
    value: string,
  }[]
  onChange: (value: any, name: string) => void
  defaultValue?: number[]
  width?: string
  className?: string
  placeholder?: string
  form?: any
  field: FormInput
  codeBlock?: string
}

const CustomSelect: React.FC<Props> = ({
  options,
  onChange,
  field,
  form,
  placeholder = "",
  className,
  width = "full",
  codeBlock,
}) => {
  return (
    <div className={cn(className, `w-${width} relative`)}>
      <Select.Root
        // open={true}
        name={field.name}
        onValueChange={(value) => {
          form && form.setFieldValue(field.name, value);
          if (codeBlock) {
            // run some code from string
            const func = new Function("value", codeBlock);
            func(value);
          } 
        }}
      >
        <Select.Trigger className="min-w-full flex justify-between border-black border py-4 px-10 items-center rounded-full [&[data-placeholder]]:text-gray-400">
          <Select.Value placeholder={placeholder || undefined}/>  
          <DynamicIcon type="chevronDown" className="h-5" />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content 
            className="bg-slateBlue rounded-3xl border border-slateBlue"
          >
            <Select.ScrollUpButton />

            <Select.Viewport className="py-10 w-full px-5">
              {
                options.map((
                  item, 
                  index: number
                ) => {
                  return (
                    <Select.Item
                      key={index}
                      value={item.value} 
                      className={cn("border rounded-xl border-transparent flex items-center w-full cursor-pointer text-white p px-5 py-2 [&[data-highlighted]]:border-white", {
                        // "bg-primary" : item.value === value
                      })}
                    >
                      <Select.ItemText>
                        {item.name}
                      </Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>   
                  )
                })
              }
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
export default CustomSelect;
