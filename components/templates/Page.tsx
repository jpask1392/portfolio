import DynamicComponent from "@/components/helpers/DynamicComponent";
import { SbEditableContent } from "@/types/storyBlok";
import { NextSeo } from 'next-seo';

interface Props {
  blok: SbEditableContent
}

const Page: React.FC<Props> = ({ blok }) => {
  return (
    <>
      {
        blok.hero?.length ? (
          <DynamicComponent
            blok={blok.hero[0]} 
            key={blok.hero[0]._uid} 
          />
        ) : null
      }
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

export default Page;
