import StoryBlokLink from '@/components/helpers/StoryBlokLink';
import * as Accordion from '@radix-ui/react-accordion';
import DynamicIcon from "@/components/icons/DynamicIcon";
import cn from 'classnames';
import { navLink } from '@/types/navigation';
import { useState } from 'react';

interface Props {
  item: navLink
}

const FooterLink: React.FC<Props> = ({
  item
}) => {
  const [open, setOpen] = useState(item.name);

  if (item.subItems.length) {
    return (
      <Accordion.Root 
        type="single" 
        defaultValue={item.name}
        collapsible={true}
        onValueChange={(value) => setOpen(value)}
      >
  
        <Accordion.Item value={item.name}>
          <Accordion.Header className="h4 pb-4 border-b md:border-none">
            <Accordion.Trigger className="flex justify-between items-center w-full md:pointer-events-none">
              <span className="caption">{item.name}</span>
              <DynamicIcon 
                className="md:hidden h-3"
                type="togglePlusMinus"
                open={open !== ""}
              />
            </Accordion.Trigger>
          </Accordion.Header>
  
          <Accordion.Content>
            <ul 
              className={cn("mt-5", {
              "lg:columns-2 gap-0" : item.subItems.length > 5
              })}
            >
              {
                item.subItems.map((item, i) => {
                  return (
                    <li 
                      key={i} 
                      className="text-sm mb-2 mr-10"
                    >
                      <StoryBlokLink
                        className="border-b pb-px"
                        sbLink={item.link}
                      >
                        {item.name}
                      </StoryBlokLink>
                      
                    </li>
                  )
                })
              }
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
  } {
    return (
      <StoryBlokLink
        className="text-base uppercase font-header text-red"
        sbLink={item.link}
      >
        {item.name}
      </StoryBlokLink>
    )
  }
}

export default FooterLink;
