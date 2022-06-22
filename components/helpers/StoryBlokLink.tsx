import NextLink from 'next/link';
import type { storyBlokLink } from "@/types/storyBlok";
import { ReactNode, Component } from 'react';

interface Props {
  classes?: string
  sbLink: storyBlokLink | false
  children: ReactNode[] | Component[] | any[] | ReactNode | Component
}

const StoryBlokLink: React.FC<Props> = ({
  classes,
  sbLink,
  children,
}) => {
  if (!sbLink) return <>{children}</>;

  const {
    url = '',
    linktype,
    cached_url,
    email,
    anchor,
  } = sbLink;

  return (
    <>
      { (linktype === 'email') && <a className={classes} href={`mailto:${email}`}>{children}</a> }
      { (url.match(/^(https?:)?\/\//)) && <a href={url} className={classes} target="_blank" rel="noreferrer">{children}</a> }

      {
        (!url.match(/^(https?:)?\/\//) && linktype !== 'email') ? (
          <NextLink href={cached_url ? '/' + cached_url + (anchor ? `#${anchor}` : '') : '/'}>
            <a className={classes} aria-label={`Link to ${cached_url}`}>
              {children}
            </a>
          </NextLink>
        ) : null
      }
    </>
  )
}

export default StoryBlokLink;
