import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { storyBlokLink } from "@/types/storyBlok";

interface Props {
  announcementLink: storyBlokLink
  announcementText: string
  announcementTitle: string
}

const Announcement: React.FC<Props> = ({
  announcementLink,
  announcementText,
  announcementTitle
}) => {
  return (
    <div id="announcement-bar" className="bg-primary text-center py-3">
      <div className="whitespace-nowrap items-center mx-auto text-xs md:text-base px-6 w-full overflow-auto">
        <strong className="">{announcementTitle}</strong>
        <span className="hidden md:inline ">{announcementText}</span>
        <span className="pl-8">
          <StoryBlokLink sbLink={announcementLink}>
            <DynamicIcon 
              type="announcementArrow" 
              className="inline"
            />
          </StoryBlokLink>
        </span>
      </div>
    </div>
  )
}

export default Announcement;