import type { storyBlokLink } from '@/types/storyBlok';

export type button = {
  isSubmit?: boolean
  buttonStyle?: 'primary' | 'on-primary' | 'link'
  onDark?: boolean
  className?: string
  disabled?: boolean
  text: string
  link?: storyBlokLink
  ariaLabel?: string
  onClick?: (e: React.SyntheticEvent<EventTarget>) => void
  ajaxClick?: (e: React.SyntheticEvent<EventTarget>) => void
  maxWidth?: boolean
  icon?: any
}
