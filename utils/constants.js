import Link from "next/link";
import Icon from "@/components/ui/Icon"
import { MARK_LINK } from 'storyblok-rich-text-react-renderer';

/**
 * See: https://www.npmjs.com/package/storyblok-rich-text-react-renderer
 * 
 */
export const renderOptions = {
  blokResolvers: {
    ['icon']: (props) => {
      return <Icon {...props} />
    }
  },
  markResolvers: {
    [MARK_LINK]: (children, props) => {
      const { linktype, href, target } = props;

      if (linktype === 'email') {
        // Email links: add `mailto:` scheme and map to <a>
        return <a href={`mailto:${href}`}>{children}</a>;
      }

      if (href.match(/^(https?:)?\/\//)) {
        // External links: map to <a>
        return <a href={href} target={target} className="underline">{children}</a>;
      }

      // Internal links: map to <Link>
      return <Link href={href}><a className="underline">{children}</a></Link>;
    }
  }
}
