import Link from "next/link";
import type { SbBlokData } from "@storyblok/react";
import useEmblaCarousel from "embla-carousel-react";
import ReviewTile from "./ReviewTile";

interface Props {
  reviews: {
    content: {
      author: string
      body: string
      jobTitle: string
      rating: number
      title: string
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

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    // dragFree: true,
  });

  return (
    <div className="relative pb-2 md:pb-0">
      <nav className="mb-4 flex space-x-6">
        <Link 
          href="/about" 
          className="font-header underline uppercase"
        >About me</Link>
        <Link
          href="/work" 
          className="font-header underline uppercase"
        >Projects</Link>
        <a 
          href="mailto:contact@jamiepask.com"
          className="font-header underline uppercase"
        >Contact Me</a>
      </nav>

      <div 
        className="cursor-grab active:cursor-grabbing" 
        ref={emblaRef}
      >
        <ul className="flex -mx-3">
          {
            reviews.map(({ content }, i) => {
              return (
                <li className="w-[90%] md:w-full max-w-[450px] min-w-0 flex-shrink-0 px-3" key={i}>
                  <ReviewTile {...content} />
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default ReviewsCarousel
