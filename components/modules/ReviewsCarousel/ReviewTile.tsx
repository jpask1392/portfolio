import StarRating from "@/components/ui/StarRating";
import { render } from "storyblok-rich-text-react-renderer";

interface Props {
  author: string
  body: string
  jobTitle: string
  rating: number
}

const ReviewTile: React.FC<Props> = ({
  author,
  body,
  jobTitle,
  rating
}) => {
  return (
    <article className="rounded-md shadow flex-1 p-6 bg-white">
      <hgroup className="mb-6 inline-block">
        <span className="relative">
          <h3 className="h3">{author}</h3>
          <StarRating className="absolute top-1/2 left-full -translate-y-1/2 ml-4" />
        </span>
        
        <h4 className="h5">{jobTitle}</h4>
        
      </hgroup>
      
      <div className="opacity-50">
        { render(body) }
      </div>
    </article>
  )
}

export default ReviewTile