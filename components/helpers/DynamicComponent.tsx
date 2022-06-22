import { SbEditableContent } from "@/types/storyBlok";
import dynamic from 'next/dynamic';

// templates
import Page from "@/components/templates/Page";
import Product from "@/components/templates/Product";

// modules
import Placeholder from "@/components/ui/Placeholder";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Grid from "@/components/ui/Grid";
import RichText from "@/components/ui/RichText";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Header from "@/components/ui/Header";
import Slideshow from "@/components/ui/Slideshow";
import Accordion from "@/components/ui/Accordion";

import HeroVideo from "@/components/modules/HeroVideo";
import HeroImage from "@/components/modules/HeroImage";
import HeroSplit from "@/components/modules/HeroSplit";
import FeaturedCollections from "@/components/ecommerce/FeaturedCollections";
import FeaturedProducts from "@/components/ecommerce/FeaturedProducts";
import TextImage from "@/components/modules/TextImage";
import ThreeItemGrid from "@/components/modules/ThreeItemGrid";
import ImmortalTools from "@/components/modules/ImmortalTools";
import ContactForm from "@/components/modules/ContactForm";
import SplitTiledImage from "@/components/modules/SplitTiledImage";
import Form from "@/components/modules/Form";
import { Input } from "@/components/ui/Inputs";

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
    product: Product,
    featuredCollections: FeaturedCollections,
    featuredProducts: FeaturedProducts,
    textImage: TextImage,
    heroVideo: HeroVideo,
    heroImage: HeroImage,
    heroSplit: HeroSplit,
    threeItemGrid: ThreeItemGrid,
    immortalTools: ImmortalTools,
    container: Container,
    column: Column,
    header: Header,
    grid: Grid,
    'rich-text': RichText,
    'button-group': ButtonGroup,
    button: Button,
    image: Image,
    slideshow: Slideshow,
    accordion: Accordion,
    
    splitTiledImage: SplitTiledImage,
    form: Form,
    formInput: Input,
  };

  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    return WithStoryBlok(Component)(blok, index);
  }
  return <Placeholder componentName={blok.component} />;
};

export default DynamicComponent;
