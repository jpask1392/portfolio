import { useState } from 'react';
import Header from '@/components/ui/Header';
import * as Accordion from '@radix-ui/react-accordion';
import DynamicIcon from '@/components/icons/DynamicIcon';
import { SbEditableContent } from "@/types/storyBlok";
import { render } from "storyblok-rich-text-react-renderer";
import cn from 'classnames';

interface Props {
  blok?: SbEditableContent
  className?: string
  accordion_items?: {
    _uid: string
    header: string
    content: any
  }[]
  hideLines?: boolean
  largeTitles?: boolean
}

const CustomAccordion: React.FC<Props> = ({
  accordion_items,
  className,
  hideLines = false,
  largeTitles = false,
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
                  
                  <Header
                    tag="h4"
                    size={largeTitles ? "h3" : "h4"}
                    color={largeTitles ? "black" : "secondary"}
                  >{item.header}</Header>

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
