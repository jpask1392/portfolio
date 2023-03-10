import DynamicIcon from "@/components/icons/DynamicIcon";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import type { SbBlokData } from "@storyblok/react";
import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import Link from "next/link"
import HoverLink from "./HoverLink"
import { useGlobalContext } from "@/components/context/globalContext";
import { useEffect, useState } from "react";

interface Props {
  body: string
}

interface Blok extends SbBlokData, Props {}

interface IndexBodyProps extends Props {
  children: any
  blok?: Blok
}

const IndexBody: React.FC<IndexBodyProps> = (props) => {
  const {
    body
  } = props.blok || props;

  const { globals: { socials } } = useGlobalContext();

  return (
    <>  
     <h1 className="!text-[12vw] md:!text-[6vw] h1 w-full md:w-8/12 text-outlined-light">
        {render(body, {
          nodeResolvers: { 
            [NODE_PARAGRAPH]: (children) => <>{children}</>
          },
          blokResolvers: {
            ['hoverLink']: (props: any) => <HoverLink {...props} />
          }
        })}
      </h1>

      {
        socials && socials.length ? (
          <ul className="section section--spacing-md flex flex-wrap w-full md:w-7/12 md:-mx-5 space-y-6 md:space-y-0">
            {
              socials.map(({
                link,
                name,
                icon,
                handle,
              }: any, i: number) => {
                return (
                  <li key={i} className="w-full md:w-auto md:flex-1 md:px-5">
                    <StoryBlokLink sbLink={link} className="block hover:bg-gray-100 hover:border-gray-200 border border-transparent p-3 -m-3 rounded-md transition-all">
                      <div className="border-t border-black pt-4 flex justify-between">
                        <header>
                          <h3 className="h3">{name}</h3>
                          <p className="opacity-30">{handle}</p>
                        </header>
                        <span className="w-10 h-10 p-3 bg-black text-white rounded-full">
                          <DynamicIcon type={icon} className="" />
                        </span>
                        
                      </div>
                    </StoryBlokLink>
                  </li>
                )
              })
            }
          </ul>
        ) : null
      }
    </>
  )
}

export default IndexBody