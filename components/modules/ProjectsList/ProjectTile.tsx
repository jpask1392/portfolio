import CustomImage from "@/components/ui/Image/CustomImage";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import DynamicIcon from "@/components/icons/DynamicIcon";

const ProjectTile = ({
  name,
  siteLink,
  images,
}) => {
  return (
    <article className="flex -mx-10">
      <div className="w-5/12 px-10 flex flex-col">
        
        <ConditionalLink link={siteLink}> 
          <h2 className="h1 flex items-start">
            <span>{ name }</span>
            { siteLink ? <DynamicIcon type="newTab" className="w-2 shrink-0" /> : null }
          </h2>
        </ConditionalLink>

        <p className="mt-auto pt-20 max-w-[533px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor</p>
      </div>
      <div className="w-7/12 px-10 flex">
        <ul className="">
          <li className="h2 text-outlined">nextjs</li>
          <li className="h2 text-outlined">storyblok</li>
          <li className="h2 text-outlined">web3</li>
          <li className="h2 text-outlined">design</li>
        </ul>

        <div className="h-full ml-[25%] flex items-start space-x-2">
            {
              images?.map((image) => {
                return (
                  <CustomImage 
                    className="flex-shrink-0"
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

const ConditionalLink = ({children, link}) => {
  console.log(link)
  if (!link) return children;

  return <StoryBlokLink sbLink={link}>{children}</StoryBlokLink>
}

export default ProjectTile;