import type { 
  storyBlokLink, 
  storyBlokImage 
} from '@/types/storyBlok';

export type navLink = {
  name: string,
  link: storyBlokLink,
  subItems: navLink[],
  image?: storyBlokImage,
  hasMegaMenu?: boolean
  columnCount: string
  linkInColumnNumber: string
}
