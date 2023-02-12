import CustomImage from "@/components/ui/Image/CustomImage";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import DynamicIcon from "@/components/icons/DynamicIcon";
import type { storyBlokLink, storyBlokImage } from "@/types/storyBlok";
import { render } from "storyblok-rich-text-react-renderer";

interface Props {  
  name: string
  siteLink: storyBlokLink
  images: storyBlokImage[]
  category?: any[]
  excerpt?: string
}

const ProjectTile: React.FC<Props> = ({
  name,
  siteLink,
  images,
  category: categories,
  excerpt
}) => {
  return (
    <article className="flex flex-wrap -mx-10">
      <div className="w-full md:w-5/12 px-10 flex flex-col">
        <h3 className="h3 mb-1 md:hidden">Project</h3>
        <ConditionalLink link={siteLink}> 
          <h2 className="h1 flex items-start">
            <span dangerouslySetInnerHTML={{__html: name}}/>
            { siteLink ? <DynamicIcon type="newTab" className="w-3 shrink-0" /> : null }
          </h2>
        </ConditionalLink>

        <div className="mt-auto pt-10 md:pt-20 max-w-[533px] opacity-60">
          {render(excerpt)}
        </div>
      </div>
      <div className="w-full md:w-7/12 px-10 flex flex-wrap md:flex-nowrap">
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

        <div className="h-full md:ml-[25%] flex items-start space-x-2 mt-6 md:mt-0">
            {
              images?.map((image, i) => {
                return (
                  <CustomImage 
                    key={i}
                    className="flex-shrink-0 shadow-md"
                    image={image} 
                    maxWidth={300}
                  />
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