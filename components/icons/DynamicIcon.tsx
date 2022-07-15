/**
 * Try a dynamic import here? 
 * 
 * May be a little heavy if we're not using all 
 * the icons? Something to look into.
 */

import Logo from "../ui/Logo";
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
import DollarSign from "./DollarSign";
import Bag from "./Bag";
import CaretBackCircle from "./CaretBackCircle";
import CaretDownCircle from "./CaretDownCircle";
import ChevronBack from "./ChevronBack";
import ChevronDown from "./ChevronDown";
import ChevronRight from "./ChevronRight";
import Close from "./Close";
import Heart from "./Heart";
import ShoppingBag from "./ShoppingBag";
import InformationCircle from "./InformationCircle";
import Identity from "./Identity";
import Location from "./Location";
import Checkmark from "./Checkmark";
import Star from "./Star";
import AnnouncementArrow from "./AnnouncementArrow";
import TogglePlusMinus from "./TogglePlusMinus";
import Cake from "./Cake";
import TikTok from "./Tiktok";
import Youtube from "./Youtube";
import Twitter from "./Twitter";

import Time from "./Time";
import Pigments from "./Pigments";
import Precision from "./Precision";
import Mixable from "./Mixable";
import Viscosity from "./Viscosity";
import Size from "./Size";

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
  'dollar-sign': DollarSign,
  bag: Bag,
  caretBackCircle: CaretBackCircle,
  caretDownCircle: CaretDownCircle,
  chevronBack: ChevronBack,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  close: Close,
  heart: Heart,
  'shopping-bag': ShoppingBag,
  informationCircle: InformationCircle,
  identity: Identity,
  location: Location,
  checkmark: Checkmark,
  star: Star,
  togglePlusMinus: TogglePlusMinus,
  cake: Cake,
  tiktok: TikTok,
  youtube: Youtube,
  twitter: Twitter,
  logo: Logo,
  time : Time,
  pigments : Pigments,
  precision : Precision,
  mixable : Mixable,
  viscosity : Viscosity,
  size : Size,
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
