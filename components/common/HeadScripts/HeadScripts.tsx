import Script from 'next/script'
import { useGlobalContext } from "@/components/context/globalContext";

const HeadScripts = () => {
  const { global } = useGlobalContext();

  return (
    <>
      {
        // Add global scripts
        global?.settings?.content?.headerScripts?.map((script: any) => {
          return (
            <Script
              key={script._uid}
              id={script._uid}
              src={script.src || undefined}
              strategy="afterInteractive"
              dangerouslySetInnerHTML={ script.inner ? {
                __html: script.inner,
              } : undefined}
            />
          )
        }
        ) || null
      }
    </>
  )
}

export default HeadScripts;
