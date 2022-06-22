import DynamicComponent from "@/components/helpers/DynamicComponent";
import { SbEditableContent } from "@/types/storyBlok";
import { NextSeo } from 'next-seo';

interface Props {
  blok: SbEditableContent
}

const Product: React.FC<Props> = ({ blok }) => {
  return (
    <>
      {
        blok.body ? (
          blok.body.map((blok: SbEditableContent) => (
            <DynamicComponent 
              blok={blok} 
              key={blok._uid} 
            />
          ))
        ) : null
      }
    </>
  )
};

export default Product;
