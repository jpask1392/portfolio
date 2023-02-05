import Flyout from "@/components/ui/Flyout";
import Link from "next/link";
import MobileNavigationLink from './MobileNavigationLink';
import type { navLink } from '@/types/navigation';

interface Props {
  menu: navLink[]
  active: boolean
}

const MobileMenu: React.FC<Props> = ({
  menu,
  active,
}) => {
  return (
    <Flyout 
      active={active}
      Header={() => (
        <div className="flex h-full w-full">
          <Link legacyBehavior={true} href="/account/login">
            <a className="bg-white flex-1 flex justify-center items-center h3">
              Sign In
            </a>
          </Link>
          <Link legacyBehavior={true} href="/account/register">
            <a className="flex-1 bg-red flex justify-center items-center h3">
              Sign Up
            </a>
          </Link>
        </div>
      )}
    >
      <ul className="w-full min-h-full relative">
        {
          menu.map((link, i) => {
            return (
              <li key={i}>
                <MobileNavigationLink 
                  nav_link={link}
                />
              </li>
            )
          })
        }
      </ul>
    </Flyout>
  )
}

export default MobileMenu;
