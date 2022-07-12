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
  accordion_items?: {
    _uid: string
    header: string
    content: any
  }[]
  hideLines?: boolean
}

const CustomAccordion: React.FC<Props> = ({
  accordion_items,
  className,
  hideLines = false
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
          const Component = item.content;

          return (
            <Accordion.Item 
              value={item._uid} 
              key={item._uid} 
              className="item"
            >
              <Accordion.Header asChild>
                <Accordion.Trigger 
                  className={cn("flex w-full py-4 items-center text-secondary text-left", {
                    "border-b border-secondaryLight justify-between" : !hideLines,
                  })}
                >
                  <H4>{item.header}</H4>

                  <span className={cn("transition-all", {
                    "rotate-180" : item._uid === active,
                    "ml-6" : hideLines
                  })}>
                    <DynamicIcon 
                      type="chevronDown"
                    />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className='content'>
                <div className="mb-8 pt-4">
                  {
                    (typeof item.content === 'function') ? (
                      <Component />
                    ) : (
                      render(item.content)
                    )
                  }
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
