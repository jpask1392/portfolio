import { useRouter } from 'next/router'
import { useScrollContext } from "@/components/context/scroll";
import NextLink from 'next/link';
import type { storyBlokLink } from "@/types/storyBlok";
import { ReactNode, Component } from 'react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

interface Props {
  className?: string
  sbLink: storyBlokLink | false
  children: ReactNode[] | Component[] | any[] | ReactNode | Component | any
  onMouseOver?: any
  onMouseLeave?: any
  onClick?: any
}

const StoryBlokLink: React.FC<Props> = ({
  className,
  sbLink,
  children,
  onMouseOver,
  onMouseLeave,
  onClick,
}) => {
  const { scroll } = useScrollContext();
  const router = useRouter();

  if (!sbLink) return <>{children}</>;

  const {
    url = '',
    linktype,
    cached_url,
    email,
    anchor,
  } = sbLink;

  // handle scroll with scrolljacking
  const handleAnchorClick = (e: any) => {
    if (anchor) {
      e.preventDefault();
      const target = document.querySelector(`#${anchor}`);

      if (router.asPath !== "/") {
        // go to home page
        router.push('/')

        setTimeout(() => {
          scroll.scrollTo(target)
        }, 1000)
      }

      scroll.scrollTo(target)
    }

    // run the click event from props
    onClick && onClick();
  }

  return <>
    { (linktype === 'email') && <a className={className} href={`mailto:${email}`}>{children}</a> }
    { (url.match(/^(https?:)?\/\//)) && <a href={url} className={className} target="_blank" rel="noreferrer">{children}</a> }

    {
      (!url.match(/^(https?:)?\/\//) && linktype !== 'email') ? (
        (<NextLink
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={handleAnchorClick}
          href={
            cached_url
              ? '/' + cached_url.replace("home", "") + (anchor ? `#${anchor}` : '') 
              : '/'
          }
          className={className}
          aria-label={`Link to ${cached_url}`}
        >
          {children}
        </NextLink>)
      ) : null
    }
  </>;
}

export default StoryBlokLink;
