import cn from "classnames";
import StarRating from "@/components/ui/StarRating";
import { useEffect, useRef, useState } from "react";
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
  const [ active, setActive ] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const reviewBodyRef = useRef<HTMLDivElement | null>(null);

  const updateVariables = () => {
    if (!ref.current || !headerRef.current || !reviewBodyRef.current) return;
    ref.current.style.setProperty('--review-header-height', `${headerRef.current.offsetHeight}px`);
    ref.current.style.setProperty('--review-height', `${reviewBodyRef.current.offsetHeight + headerRef.current.offsetHeight}px`);
  }

  useEffect(() => {
    setTimeout(() => {
      updateVariables();
    }, 1000)

    window.addEventListener("resize", updateVariables);
    return () => window.removeEventListener("resize", updateVariables)
  }, [])

  return (
    <article 
      onClick={() => setActive(!active)}
      ref={ref}
      style={{ "--review-header-height": `100%`, "--review-height": "auto" } as React.CSSProperties}
      className={cn("bg-white relative")}
    >
      <div 
        className={cn("absolute inset-0 bg-white border rounded-md border-black overflow-hidden transition-all duration-300", {
          "h-[var(--review-height)] scale-105 shadow-md": active,
          "h-[var(--review-header-height)]": !active,
        })}
      >
        <div 
          className={cn("absolute top-[var(--review-header-height)] inset-x-0")}
        >
          <div ref={reviewBodyRef} className="pt-3 md:pt-0 p-8 text-xs text-black font-light ">
            { render(body) }
          </div>
        </div>
      </div>

      <header 
        className="flex justify-between items-end relative p-4 md:p-4 rounded-md"
        ref={headerRef}
      >
        <span className="relative block pr-2">
          <StarRating className="leading-none mb-2" />
          <h3 className="h3">{title || "Thank you, Jamie"}</h3>
          <h4 className="h5 text-black">{author}, {jobTitle}</h4>
        </span>

        <span className={cn("block ml-auto transition-all duration-500", {
          "rotate-180": active
        })}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
          </svg>
        </span>
      </header>
    
    </article>
  )
}

export default ReviewTile