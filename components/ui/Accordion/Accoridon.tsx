import * as Accordion from '@radix-ui/react-accordion';
import DynamicIcon from '@/components/icons/DynamicIcon';
import { sbEditable } from "@storyblok/storyblok-editable";
import { H4 } from "@/components/ui/Typography";
import { SbEditableContent } from "@/types/storyBlok";
import { render } from "storyblok-rich-text-react-renderer";
import cn from 'classnames';
import { useState } from 'react';

interface Props {
  blok?: SbEditableContent
  className?: string
  accordion_items?: any[]
}

const CustomAccordion: React.FC<Props> = ({
  accordion_items,
  className
}) => {
  const [ active, setActive ] = useState("");

  const handleValueChange = (value: string) => {
    setActive(value);
  }

  return (
    <Accordion.Root
      className={cn(className, "ui-accordion")}
      collapsible={true}
      type="single"
      onValueChange={handleValueChange}
    >
      {
        accordion_items?.map((item) => {
          return (
            <Accordion.Item 
              value={item._uid} 
              key={item._uid} 
              className="item"
            >
              <Accordion.Header asChild>
                <Accordion.Trigger 
                  className={cn([
                    "flex",
                    "w-full",
                    "border-b",
                    "border-secondaryLight",
                    "py-4",
                    "justify-between",
                    "items-center",
                    "text-secondary",
                    "text-left"
                  ])}>
                  <H4 className="font-medium">
                    {item.header}
                  </H4>
                  <DynamicIcon 
                    type="togglePlusMinus"
                    open={item._uid === active}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className='content'>
                <div className="mb-8 pt-4">
                  {render(item.content)}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          )
        })
      }
    </Accordion.Root>
  )
}

export default CustomAccordion;
