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
    <div id="announcement-bar" className="bg-red w-full">
      <div className="px-8 container-bordered text-center justify-center text-white h-8 flex items-center">
        <span className="h4">{announcementText}</span>
      </div>
    </div>
  )
}

export default Announcement;