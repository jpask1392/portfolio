import Logo from "@/components/ui/Logo";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import Button from "@/components/ui/Button";
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
}) => {
  return (
    <footer className={cn(className, "footer py-12 border-y border-black")}>
      <div className="container flex items-center">
        <div className="">
          <DynamicIcon type="logo" />
        </div>

        <div className="flex-1 text-center">
          <ul className="inline-flex space-x-7">
            {
              socials?.map((social, i) => (
                <li key={i} className={`icon-${social.name}`}>
                  <StoryBlokLink sbLink={social.link}>
                    <DynamicIcon 
                      type={social['icon']} 
                      className="text-secondary mx-auto h-3 w-3 lg:h-7 lg:w-7"
                    />
                  </StoryBlokLink>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="flex-shrink-0">
          <Button 
            text="Back to top"
            icon={<DynamicIcon type="arrowNewPage" />}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
              })
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
