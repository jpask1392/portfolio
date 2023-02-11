import type { SbBlokData } from "@storyblok/react";
import ReviewTile from "./ReviewTile";

interface Props {
  reviews: {
    content: {
      author: string
      body: string
      jobTitle: string
      rating: number
    }
  }[]
}

interface Blok extends SbBlokData, Props {}

interface ReviewsProps extends Props {
  children?: any
  blok?: Blok
}

const ReviewsCarousel: React.FC<ReviewsProps> = (props) => {
  const {
    reviews
  } = props.blok || props;

  return (
    <div>
      <ul className="flex -mx-3">
        {
          reviews.map(({ content }) => {
            return (
              <li className="w-1/2 2xl:w-1/3 flex-shrink-0 px-3">
                <ReviewTile {...content} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ReviewsCarousel