import Header from '@/components/ui/Header';
import DynamicComponent from '@/components/helpers/DynamicComponent';
import * as Tabs from '@radix-ui/react-tabs';
import { sbEditable } from "@storyblok/storyblok-editable";
import { SbEditableContent } from "@/types/storyBlok";
import cn from 'classnames';
import { useState } from 'react';


interface Props {
  blok?: SbEditableContent
  className?: string
  items: any[]
}

const CustomTabs: React.FC<Props> = ({
  items,
  className
}) => {
  const [ active, setActive ] = useState(items[0]._uid);

  const handleValueChange = (value: string) => {
    setActive(value);
  }

  return (
    <Tabs.Root
      className={cn(className, "ui-tabs")}
      onValueChange={handleValueChange}
      defaultValue={items[0]._uid}
    >
      <Tabs.List 
        aria-label="tabs"
        className="mb-10 flex justify-center space-x-10"
      >
        {
          items.map((item) => {
            return (
              <Tabs.Trigger 
                key={"trigger_" + item._uid}
                value={item._uid}
                className={cn("tab-item relative", {
                  "active" : item._uid === active,
                })}
              >
                <Header
                  tag="h3"
                  size="h3"
                >
                  {item.title}
                </Header>
              </Tabs.Trigger>
          )
          })
        }
      </Tabs.List>

      {
        items.map((item) => (
          <Tabs.Content 
            key={"content_" + item._uid}
            value={item._uid}
          >
            {
              item.content.map((blok: any) => 
                <DynamicComponent key={blok._uid} blok={blok} />
              )
            }
          </Tabs.Content>
         )
        )
      }
    </Tabs.Root>
  )
}

export default CustomTabs;
