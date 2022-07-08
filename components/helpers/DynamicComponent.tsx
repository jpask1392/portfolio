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
import Form from "@/components/modules/Form";
import TileGrid from "@/components/modules/TileGrid";

import FeaturedCollections from "@/components/ecommerce/FeaturedCollections";
import FeaturedProducts from "@/components/ecommerce/FeaturedProducts";
import FeaturedCollectionWithProducts from "@/components/ecommerce/FeaturedCollectionWithProducts";

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
    product: Product,
    featuredCollections: FeaturedCollections,
    featuredProducts: FeaturedProducts,
    heroImage: HeroImage,
    heroSplit: HeroSplit,
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
    featuredCollectionWithProducts: FeaturedCollectionWithProducts,
    tileGrid: TileGrid,
    table: Table,
    icon: Icon
  };

  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    return WithStoryBlok(Component)(blok, index);
  }
  return <Placeholder componentName={blok.component} />;
};

export default DynamicComponent;
