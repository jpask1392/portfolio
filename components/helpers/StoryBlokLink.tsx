import NextLink from 'next/link';
import type { storyBlokLink } from "@/types/storyBlok";

interface Props {
  className?: string
  sbLink: storyBlokLink | undefined
  children: any
  onClick?: any
  isSubmit?: boolean
  onMouseEnter?: any
  onMouseLeave?: any
}

const StoryBlokLink: React.FC<Props> = ({
  className,
  sbLink,
  children,
  isSubmit = false,
  ...rest
}) => {
  if (!sbLink) return <>{children}</>;

  const {
    url = '',
    linktype,
    cached_url,
    email,
    anchor,
  } = sbLink;

  return <>
    { (linktype === 'email') && <a className={className} href={`mailto:${email}`}>{children}</a> }
    { (url.match(/^(https?:)?\/\//)) && <a href={url} className={className} target="_blank" rel="noreferrer">{children}</a> }

    {
      (!url.match(/^(https?:)?\/\//) && linktype !== 'email' && !isSubmit) ? (
        (
        <NextLink
          href={cached_url ? '/' + cached_url + (anchor ? `#${anchor}` : '') : '/'}
          className={className}
          aria-label={`Link to ${cached_url}`}
          {...rest}
        >
          {children}
        </NextLink>)
      ) : null
    }

    {
      isSubmit ? (
        (
        <button
          type="submit"
          className={className}
          aria-label={`Link to ${cached_url}`}
          {...rest}
        >
          {children}
        </button>)
      ) : null
    }
  </>;
}

export default StoryBlokLink;
