import StoryBlokLink from "@/components/helpers/StoryBlokLink"
import DynamicIcon from "@/components/icons/DynamicIcon"
import { Social } from "@/types/socials"

interface Props {
  socials: Social[]
}

const Socials: React.FC<Props> = ({
  socials
}) => {
  return (
    <div className="items-baseline space-x-8 flex">
      {
        socials.map(({
          icon,
          name,
          link,
          srText
        }, i) => {
          return (
            <StoryBlokLink 
              sbLink={link || false}
              className={`icon-${name}`}
              key={i}
            >
              { 
                srText ? (
                  <span className="sr-only">{srText}</span>
                ) : null
              }
              <DynamicIcon type={icon} className="w-6 md:w-[38px]" />
            </StoryBlokLink>
          )
        })
      }
    </div>
  )
}

export default Socials;