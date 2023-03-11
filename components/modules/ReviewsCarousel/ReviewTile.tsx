import StarRating from "@/components/ui/StarRating";
import { render } from "storyblok-rich-text-react-renderer";

interface Props {
  author: string
  body: string
  jobTitle: string
  rating: number
  title: string
}

const ReviewTile: React.FC<Props> = ({
  author,
  body,
  jobTitle,
  rating,
  title
}) => {
  return (
    <article className="rounded-md flex-1 p-4 md:p-6 bg-white hover:bg-gray-100 border-gray-200 border transition-colors h-full">
      <hgroup className="mb-3 md:mb-6 inline-block">
        <span className="relative block">
          <h3 className="h3">"{title || "Thank you, Jamie"}"</h3>
          <StarRating className="absolute top-1/2 left-full -translate-y-1/2 ml-4" />
        </span>
        
        <h4 className="h5 text-greyText">{author}, {jobTitle}</h4>
      </hgroup>
      
      <div className="text-greyText font-light">
        { render(body) }
      </div>
    </article>
  )
}

export default ReviewTile