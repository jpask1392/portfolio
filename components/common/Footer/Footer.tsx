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
    <footer className={cn(className, "footer py-16")}>
      <div className="container flex items-center">
        <div className="">
          <DynamicIcon type="logo" />
        </div>

        <div className="flex-1 text-center">
          <ul className="inline-flex space-x-5">
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

        <div className="flex-shrink-0">
          <Button 
            text="Back to top"
            icon={<DynamicIcon type="arrowNewPage" />}
            link={{
              cached_url: "/",
              anchor: "#"
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
