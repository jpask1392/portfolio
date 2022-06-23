import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import FooterNewsletter from "./FooterNewsletter";
import Logo from "@/components/ui/Logo";
import cn from 'classnames';
import FooterLink from './FooterLink';
import DynamicIcon from '@/components/icons/DynamicIcon';
import { navLink } from "@/types/navigation";
import type { storyBlokImage } from "@/types/storyBlok";

interface Props {
  className?: string,
  menuOne: navLink[],
  menuTwo: navLink[],
  socials?: any[]
  newsletterTitle?: string
  newsletterText?: string
}

const Footer: React.FC<Props> = ({ 
  className,
  menuOne,
  menuTwo,
  socials,
  newsletterTitle,
  newsletterText,
}) => {
  return (
    <footer className={cn(className, "bg-primary pt-8 pb-16")}>
      
      <div className="">
        <div className="container">
          <div className="w-full flex flex-wrap space-x-10">
            {/* navigation primary */}
            <div className="flex-1">
              <ul className="flex space-x-10">
                {
                  menuOne.map((item, i) => {
                    return (
                      <li 
                        key={i}
                        className="md:[&:nth-child(3)]:hidden lg:[&:nth-child(3)]:block"
                      >
                        <FooterLink item={item} />
                      </li>
                    )
                  })
                }
              </ul>

              {/* <ul className="inline-flex space-x-3">
                {
                  socials?.map((social, i) => (
                    <li key={i} className="bg-white h-full w-16 text-center rounded-full py-2">
                      <StoryBlokLink sbLink={social.link}>
                        <DynamicIcon type={social['icon']} className="text-primary mx-auto"/>
                      </StoryBlokLink>
                    </li>
                  ))
                }
              </ul> */}
            </div>

            <div>
              <FooterNewsletter 
                newsletterTitle={newsletterTitle}
                newsletterText={newsletterText}
              />
            </div>

            <div className="flex-1">
              <ul>
              {
                menuTwo.map((item, i) => (
                  <li key={i} className="text-right">
                    <FooterLink item={item} />
                  </li>
                ))
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
