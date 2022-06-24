/**
 * Try a dynamic import here? 
 * 
 * May be a little heavy if we're not using all 
 * the icons? Something to look into.
 */

import Account from "./Account";
import AlertCircle from "./AlertCircle";
import ArrowBack from "./ArrowBack";
import ArrowDown from "./ArrowDown";
import ArrowBackCircle from "./ArrowBackCircle";
import ArrowDownCircle from "./ArrowDownCircle";
import Cart from "./Cart";
import Facebook from "./Facebook";
import Instagram from "./Instagram";
import Search from "./Search";
import Add from "./Add";
import AddCircle from "./AddCircle";
import Apps from "./Apps";
import Bag from "./Bag";
import CaretBackCircle from "./CaretBackCircle";
import CaretDownCircle from "./CaretDownCircle";
import ChevronBack from "./ChevronBack";
import ChevronDown from "./ChevronDown";
import Close from "./Close";
import Heart from "./Heart";
import HelpCircle from "./HelpCircle";
import InformationCircle from "./InformationCircle";
import List from "./List";
import Location from "./Location";
import Checkmark from "./Checkmark";
import Star from "./Star";
import AnnouncementArrow from "./AnnouncementArrow";
import TogglePlusMinus from "./TogglePlusMinus";
import Drops from "./Drops";

type Variant = string;

const Components: {
  [P in Variant]: React.ComponentType<any> | string
} = {
  account: Account,
  alertCircle: AlertCircle,
  arrowBack: ArrowBack,
  arrowBackCircle: ArrowBackCircle,
  arrowDown: ArrowDown,
  arrowDownCircle: ArrowDownCircle,
  announcementArrow: AnnouncementArrow,
  cart: Cart,
  facebook: Facebook,
  instagram: Instagram,
  search: Search,
  add: Add,
  addCircle: AddCircle,
  apps: Apps,
  bag: Bag,
  caretBackCircle: CaretBackCircle,
  caretDownCircle: CaretDownCircle,
  chevronBack: ChevronBack,
  chevronDown: ChevronDown,
  close: Close,
  heart: Heart,
  helpCircle: HelpCircle,
  informationCircle: InformationCircle,
  list: List,
  location: Location,
  checkmark: Checkmark,
  star: Star,
  togglePlusMinus: TogglePlusMinus,
  drops: Drops,
};

interface Props {
  type: string
  className?: string
  props?: any
  open?: boolean
}

const DynamicIcon: React.FC<Props> = ({
  type, 
  className,
  ...props
}) => {
  if (typeof Components[type] !== "undefined") {
    const Component = Components[type];
    return <Component className={`fill-current ${className}`} {...props} />;
  }
  return null;
};

export default DynamicIcon;
