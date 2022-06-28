import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import FooterNewsletter from "./FooterNewsletter";
import cn from 'classnames';
import DynamicIcon from '@/components/icons/DynamicIcon';
import { navLink } from "@/types/navigation";

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
    <footer className={cn(className, "footer bg-primary pt-8 pb-10 md:pb-16")}>
      <div className="max-w-screen-2xl px-5 mx-auto">
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
                        className="text-base xl:text-4xl uppercase font-header text-secondary flex items-center"
                        sbLink={item.link}
                      >
                        <span>{item.name}</span> 
                        <span className="ml-5">
                          <DynamicIcon type="togglePlusMinus" open={false}/>
                        </span>
                      </StoryBlokLink>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <div className="order-1 md:order-none w-full md:w-auto">
            <FooterNewsletter 
              newsletterTitle={newsletterTitle}
              newsletterText={newsletterText}
            />
          </div>

          <div className="order-4 md:order-none flex-1 md:ml-8">
            <ul className="w-full flex flex-wrap justify-between md:block">
              {
                menuTwo.map((item, i) => (
                  <li key={i} className="text-right xl:mb-4">
                    <StoryBlokLink
                      className="text-xs lg:text-base xl:text-xl text-secondary block"
                      sbLink={item.link}
                    >
                      {item.name}
                    </StoryBlokLink>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="order-3 md:order-none w-full mb-4 lg:mb-0">
            <ul className="inline-flex space-x-5 lg:space-x-9 -translate-y-full lg:-translate-y-0">
              {
                socials?.map((social, i) => (
                  <li key={i} className={`icon-${social.name}`}>
                    <StoryBlokLink sbLink={social.link}>
                      <DynamicIcon 
                        type={social['icon']} 
                        className="text-secondary mx-auto h-3 w-3 lg:h-6 lg:w-6"
                      />
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
