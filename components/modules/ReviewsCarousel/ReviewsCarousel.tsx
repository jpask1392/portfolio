import ReviewTile from "./ReviewTile";


interface Props {
  
}

const ReviewsCarousel: React.FC<Props> = (props) => {
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