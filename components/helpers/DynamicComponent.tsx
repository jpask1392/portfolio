import { SbEditableContent } from "@/types/storyBlok";

// templates
import Page from "@/components/templates/Page";

// modules
import Placeholder from "@/components/ui/Placeholder";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Grid from "@/components/ui/Grid";
import RichText from "@/components/ui/RichText";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Button from "@/components/ui/Button";
import { ImageModule } from "@/components/ui/Image";
import Header from "@/components/ui/Header";
import Slideshow from "@/components/ui/Slideshow";
import Accordion from "@/components/ui/Accordion";
import Tabs from "@/components/ui/Tabs";
import Marquee from "@/components/ui/Marquee";
import Table from "@/components/ui/Table";
import { Input } from "@/components/ui/Inputs";

import HeroImage from "@/components/modules/HeroImage";
import HeroSplit from "@/components/modules/HeroSplit";
import HeroReel from "@/components/modules/HeroReel";
import TextReveal from "@/components/modules/TextReveal";
import Form from "@/components/modules/Form";
import FeaturedProjects from "@/components/modules/FeaturedProjects";
import Services from "@/components/modules/Services";
import AccordionTimed from "@/components/modules/AccordionTimed";

import Icon from '@/components/ui/Icon';

// helper
import WithStoryBlok from '@/components/helpers/WithStoryBlok';

type Variant = string;

interface Props {
  blok: SbEditableContent
  index?: number
}

const DynamicComponent: React.FC<Props> = ({ blok, index = 0 }) => {
  const Components: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    page: Page,
    heroImage: HeroImage,
    heroSplit: HeroSplit,
    heroReel: HeroReel,
    textReveal: TextReveal,
    featuredProjects: FeaturedProjects,
    accordionTimed: AccordionTimed,
    services: Services,
    container: Container,
    column: Column,
    header: Header,
    grid: Grid,
    tabs: Tabs,
    marquee: Marquee,
    'rich-text': RichText,
    'button-group': ButtonGroup,
    button: Button,
    image: ImageModule,
    slideshow: Slideshow,
    accordion: Accordion,
    form: Form,
    formInput: Input,
    table: Table,
    icon: Icon,
  };

  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    return WithStoryBlok(Component)(blok, index);
  }
  return <Placeholder componentName={blok.component} />;
};

export default DynamicComponent;
