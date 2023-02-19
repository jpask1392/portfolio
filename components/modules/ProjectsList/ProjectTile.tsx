import { useScrollContext } from "@/components/context/scroll";
import cn from "classnames";
import CustomImage from "@/components/ui/Image/CustomImage";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import DynamicIcon from "@/components/icons/DynamicIcon";
import type { storyBlokLink, storyBlokImage } from "@/types/storyBlok";
import { render } from "storyblok-rich-text-react-renderer";
import { useEffect, useRef, useState } from "react";

interface Props {  
  name: string
  siteLink: storyBlokLink
  images: storyBlokImage[]
  category?: any[]
  excerpt?: string
  meta: string
}

const ProjectTile: React.FC<Props> = ({
  name,
  siteLink,
  images,
  category: categories,
  excerpt,
  meta = "ROLE: lead developer and designer"
}) => {
  const { scroll } = useScrollContext();
  const [ expanded, setExpanded ] = useState(false);
  const [ hasExpanded, setHasExpanded ] = useState(false);
  const sectionRef = useRef(null)

  // useEffect(() => {
    
  // }, [expanded])

  const handleClick = () => {
    if (!scroll) return;
    if (window.innerWidth < 1068) return;
    let expandedCopy = !expanded;
    setExpanded(!expanded);

    setTimeout(() => {
      scroll.update()

      if (expandedCopy) {
        scroll.scrollTo(sectionRef.current, {
          duration: 700,
          callback: () => {
            scroll.stop()
          }
        })
      };

      if (!expandedCopy) {
        scroll.start()
      }

      setHasExpanded(expandedCopy)
    }, 700)
  }

  return (
    <article className="flex flex-wrap -mx-10 relative" ref={sectionRef}>
      <div className="w-full md:w-5/12 px-10 flex flex-col md:absolute inset-y-0 z-10">
        <h3 className="h3 mb-1 md:hidden">Project</h3>
        <ConditionalLink link={siteLink}> 
          <h2 className={cn("h1 flex items-start transition-all duration-700", {
            "text-black": expanded,
          })}>
            <span dangerouslySetInnerHTML={{__html: name}} className={cn("transition-all duration-700", {
              "text-black bg-white": expanded,
              "bg-black text-white": !expanded,
            })}/>
            { siteLink ? <DynamicIcon type="newTab" className="w-3 shrink-0" /> : null }
          </h2>
        </ConditionalLink>

        <div className={cn("mt-auto pt-10 max-w-[533px] transition-all", {
          "opacity-0 pointer-events-none" : expanded,
          "opacity-100" : !expanded
        })}>
          <h5 className="h5 text-white">{meta}</h5>
          <div className="opacity-60">{render(excerpt)}</div>
        </div>
      </div>
      <div className={cn("w-full md:w-2/12 px-10 flex flex-wrap md:flex-nowrap md:absolute md:left-[41.666%] transition-all", {
        "opacity-0" : expanded,
        "opacity-100" : !expanded
      })}>
        <h3 className="h3 mt-20 mb-1 md:hidden">Highlights</h3>
        {
          categories && categories.length ? (
            <ul className="w-full md:w-auto">
              {
                categories.map((category, i) => (
                  <li key={i} className="h2 text-outlined-dark">{category}</li>
                ))
              }
            </ul>
          ) : null
        }
      </div>
      <div className={cn("h-full  mt-6 md:mt-0 transition-all md:px-10 duration-700 relative", {
        "md:left-[58.3333%] md:w-5/12" : !expanded,
        "left-0 w-full" : expanded
      
      })}>
        <div className={cn(" overflow-scroll flex items-start space-x-1"
          
        )}>
          {
            images?.map((image, i) => {
              return (
                <div 
                  key={i} 
                  className={cn("flex-shrink-0 cursor-pointer transition-all duration-700", {
                    "h-[350px]": !expanded,
                    "h-screen": expanded
                  })}
                  onClick={handleClick}
                >
                  {
                    hasExpanded ? (
                      <CustomImage 
                        className="h-full w-auto"
                        image={image}
                      />
                    ) : (
                      <CustomImage 
                        className="h-full w-auto"
                        image={image} 
                        maxWidth={600}
                      />
                    )
                  }
                  
                </div>
              )
            })
          }
        </div>
      </div>
    </article>
  )
}

const ConditionalLink = ({children, link}: any) => {
  if (!link) return children;

  return <StoryBlokLink sbLink={link}>{children}</StoryBlokLink>
}

export default ProjectTile;