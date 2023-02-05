import Link from "next/link";
import Icon from "@/components/ui/Icon"
import { MARK_LINK, MARK_CODE, NODE_CODEBLOCK } from 'storyblok-rich-text-react-renderer';

export const NEXT_PUBLIC_NETWORK = process.env.NETWORK;
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
/* Frontend Constants */
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK;
export const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
export const ALCHEMY_PROJECT_ID = process.env.NEXT_PUBLIC_ALCHEMY_PROJECT_ID;


export const IRON_OPTIONS = {
  cookieName: 'siwe',
  password: 'complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

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
      return <Link legacyBehavior={true} href={href}><a className="underline">{children}</a></Link>;
    },
    [MARK_CODE]: (children) => <span dangerouslySetInnerHTML={{__html: children}} />
  },
  nodeResolvers: {
    [NODE_CODEBLOCK]: (children, props) => <span className={props.class} dangerouslySetInnerHTML={{__html: children}} />
  }
}
