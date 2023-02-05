import Script from "next/script";
import { SbEditableContent } from "@/types/storyBlok";
import { StoryblokComponent } from "@storyblok/react"

interface Props {
  blok: SbEditableContent
}

const Page: React.FC<Props> = ({ blok }) => {
  return (
    <>
      {
        blok.scripts?.length ? (
          blok.scripts.map((script: any) => (
            <Script
              key={script._uid}
              id={script._uid}
              src={script.src || undefined}
              strategy="afterInteractive"
              dangerouslySetInnerHTML={ script.inner ? {
                __html: script.inner,
              } : undefined}
            />
          ))
        )  : null   
      }
      {
        blok.hero?.length ? (
          <StoryblokComponent
            blok={blok.hero[0]} 
            key={blok.hero[0]._uid} 
          />
        ) : null
      }
      {
        blok.body ? (
          blok.body.map((blok: SbEditableContent) => (
            <StoryblokComponent
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
