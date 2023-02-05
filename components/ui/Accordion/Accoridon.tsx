import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useScrollContext } from "@/components/context/scroll";
import { useState } from 'react';
import Header from '@/components/ui/Header';
import * as Accordion from '@radix-ui/react-accordion';
import DynamicIcon from '@/components/icons/DynamicIcon';
import { render } from "storyblok-rich-text-react-renderer";
import cn from 'classnames';
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"
import { SbEditableContent } from "@/types/storyBlok";

interface Props {
  className?: string
  accordion_items?: {
    _uid: string
    header: string
    content: any
  }[]
  hideLines?: boolean
  largeTitles?: boolean
  toggler?: 'chevron' | 'plus'
}

interface Blok extends SbBlokData, Props {}

interface AccordionProps extends Props {
  children: any
  blok?: Blok
}

const CustomAccordion: React.FC<AccordionProps> = (props) => {
  const {
    accordion_items,
    className = "",
    hideLines = false,
    largeTitles = false,
    toggler = 'chevron'
  } = props.blok || props;

  const { scroll } = useScrollContext();
  const [ active, setActive ] = useState(accordion_items?.length ? accordion_items[0]._uid : "");

  const handleValueChange = (value: string) => {
    setActive(value);

    setTimeout(() => {
      // ScrollTrigger.refresh();
      scroll.update()
    }, 300)
  }

  return (
    <Accordion.Root
      className={cn(className, "ui-accordion")}
      collapsible={true}
      type="single"
      onValueChange={handleValueChange}
      defaultValue={accordion_items?.length ? accordion_items[0]._uid : undefined}
    >
      {
        accordion_items?.map((item) => {
          const Component = item.content;

          return (
            <Accordion.Item 
              value={item._uid} 
              key={item._uid} 
              className={cn("item", {
                
              })}
            >
              <Accordion.Header asChild>
                <Accordion.Trigger 
                  className={cn("flex w-full items-center text-left justify-between py-3 md:py-6 border-y border-black -mb-px", {
                    
                  })}
                >
                  <Header
                    tag="h3"
                    size="h3"
                    text={item.header}
                  />

                  {
                    toggler === 'chevron' ? (
                      <span className={cn("transition-all p-1 text-black", {
                        "rotate-180" : item._uid === active,
                      })}>
                        <DynamicIcon 
                          type="chevronDown"
                        />
                      </span>
                    ) : null
                  }

                  {
                    toggler === 'plus' ? (
                      <span className={cn("transition-all origin-center font-semibold", {
                        "rotate-45" : item._uid === active,
                        "ml-2" : hideLines
                      })}>
                        +
                      </span>
                    ) : null
                  }
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="content">
                <div className="pt-6 pb-11">
                  {
                    (typeof item.content === "function") ? (
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
