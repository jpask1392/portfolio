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
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import ArrowBackCircle from "./ArrowBackCircle";
import ArrowDownCircle from "./ArrowDownCircle";
import Logo from "../ui/Logo";
import Cart from "./Cart";
import Facebook from "./Facebook";
import Instagram from "./Instagram";
import Search from "./Search";
import Add from "./Add";
import AddCircle from "./AddCircle";
import CaretBackCircle from "./CaretBackCircle";
import CaretDownCircle from "./CaretDownCircle";
import ChevronBack from "./ChevronBack";
import ChevronDown from "./ChevronDown";
import ChevronRight from "./ChevronRight";
import Close from "./Close";
import InformationCircle from "./InformationCircle";
import Identity from "./Identity";
import Location from "./Location";
import Checkmark from "./Checkmark";
import Star from "./Star";
import AnnouncementArrow from "./AnnouncementArrow";
import TogglePlusMinus from "./TogglePlusMinus";
import Filters from "./Filters";
import Select from "./Select";
import Error from "./Error"
import User from "./User"
import Twitter from "./Twitter";
import Check from "./Check";
import NewTab from "./NewTab";

type Variant = string;

const Components: {
  [P in Variant]: React.ComponentType<any> | string
} = {
  account: Account,
  alertCircle: AlertCircle,
  arrowBack: ArrowBack,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
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
  caretBackCircle: CaretBackCircle,
  caretDownCircle: CaretDownCircle,
  chevronBack: ChevronBack,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  close: Close,
  check: Check,
  informationCircle: InformationCircle,
  identity: Identity,
  location: Location,
  checkmark: Checkmark,
  star: Star,
  togglePlusMinus: TogglePlusMinus,
  logo: Logo,
  select : Select,
  error : Error,
  filters: Filters,
  user: User,
  twitter: Twitter,
  newTab: NewTab,
  
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
