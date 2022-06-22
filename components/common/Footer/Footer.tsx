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
  menuThree: navLink[],
  socials?: any[]
  newsletterTitle?: string
  newsletterText?: string
  newsletterImage?: storyBlokImage
}

const Footer: React.FC<Props> = ({ 
  className,
  menuOne,
  menuTwo,
  menuThree,
  socials,
  newsletterTitle,
  newsletterText,
  newsletterImage
}) => {
  return (
    <footer className={cn(className, "bg-primary flex flex-wrap")}>
      {/* Primary Menu */}
      <div className="w-full xl:w-3/4 sm:order-2 xl:order-none py-10 md:py-24">
        <div className="px-7 md:px-16 xl:px-0 xl:w-auto xl:ml-24 xl:mr-6 2xl:mr-32 flex flex-wrap items-center h-full">
          <div className="w-full flex flex-wrap">

            {/* Logo column */}
            {/* <div className="hidden md:block w-1/3 lg:w-1/4">
              <Logo className="fill-current h-7" />
            </div> */}

            {/* navigation primary */}
            <div className="w-full md:w-2/3 lg:w-3/4 primary-nav flex flex-wrap justify-between space-y-4 md:space-y-0">
              
              {
                menuOne.map((item, i) => {
                  return (
                    <div 
                      key={i}
                      className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2"
                    >
                      <FooterLink item={item} />
                    </div>
                  )
                })
              }

              {
                menuTwo.map((item, i) => (
                  <div key={i} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2">
                    <FooterLink item={item} />

                    {/* Secondary tablet only */}
                    <div className="w-full md:w-2/3 lg:hidden md:mt-8">
                      <ul className="">
                        {
                          menuThree.map((item, i) => {
                            return (
                              <li key={i} className="caption h4 py-4 border-b md:border-none">
                                <StoryBlokLink sbLink={item.link}>
                                  {item.name}
                                </StoryBlokLink>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* secondary navigation */}
          <div className="hidden md:flex w-full flex-wrap mt-16">
            
            <div className="w-1/2 lg:w-1/4 relative">
              <div>
                <ul className="flex space-x-3">
                  {
                    socials?.map((social, i) => (
                      <li key={i} className="bg-white h-full w-16 text-center rounded-full py-2">
                        <StoryBlokLink sbLink={social.link}>
                          <DynamicIcon type={social['icon']} className="text-primary mx-auto"/>
                        </StoryBlokLink>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="w-3/4">
              <FooterNewsletter 
                newsletterTitle={newsletterTitle}
                newsletterText={newsletterText}
              />

              <ul className="hidden lg:flex space-x-16">
                {
                  menuThree.map((item, i) => {
                    return (
                      <li key={i} className="caption">
                        <StoryBlokLink sbLink={item.link}>
                          {item.name}
                        </StoryBlokLink>
                      </li>
                    )
                  })
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
