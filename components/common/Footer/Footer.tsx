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
      <div className="container">
        <div className="w-full flex flex-wrap">

          {/* navigation primary */}
          <div className="order-2 md:order-none w-full md:flex-1 my-8 md:my-0 md:mr-8">
            <ul className="flex justify-between md:justify-start">
              {
                menuOne.map((item, i) => {
                  return (
                    <li 
                      key={i}
                      className="md:[&:nth-child(3)]:hidden xl:[&:nth-child(3)]:block md:mr-8 xl:mr-20 last:mr-0"
                    >
                      <StoryBlokLink
                        className="text-base xl:text-4xl uppercase font-header text-secondary block"
                        sbLink={item.link}
                      >
                        {item.name}
                      </StoryBlokLink>
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

          <div className="order-1 md:order-none w-full md:w-auto">
            <FooterNewsletter 
              newsletterTitle={newsletterTitle}
              newsletterText={newsletterText}
            />
          </div>

          <div className="order-2 md:order-none flex-1 md:ml-8">
            <ul className="w-full flex flex-wrap justify-between md:block">
              {
                menuTwo.map((item, i) => (
                  <li key={i} className="text-right">
                    <StoryBlokLink
                      className="text-xs lg:text-base text-secondary block"
                      sbLink={item.link}
                    >
                      {item.name}
                    </StoryBlokLink>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
