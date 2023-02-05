import { StoryblokComponent } from "@storyblok/react"
import type { SbBlokData } from "@storyblok/react"

interface Props {
  children?: any
  bloks?: any
}

const ChildrenOrBloks: React.FC<Props> = ({
  children,
  bloks
}) => {
  return (
    children && Object.keys(children).length !== 0
      ? children
      : bloks?.map((contentBlok: SbBlokData) => <StoryblokComponent blok={contentBlok} key={contentBlok._uid} />)
  )
}

export default ChildrenOrBloks;