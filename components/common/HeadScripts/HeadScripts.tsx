import Script from 'next/script'
import { useRouter } from "next/router";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { useGlobalContext } from "@/components/context/globalContext";

/**
 * 
 * TODO: This component needs some work, 
 * having trouble unmounting the header script on page change.
 * 
 * Thought I could pass the loaded scripts to the next 
 * page via context and then remove and remoount them back in. 
 * 
 * Having some trouble with the context though
 */

export const ContextTest = createContext({
  loadedScripts: [],
  setLoadedScripts: (data: any) => data
});

export function ContextProvider ({ 
  children 
} : {
  children : any
}) {
  
  const [ loadedScripts, setLoadedScripts ] = useState<any>(["one"]);
  const value = { loadedScripts, setLoadedScripts };

  // useEffect(() => {
  //   console.log(loadedScripts)
  // }, [loadedScripts])

  return (
    <ContextTest.Provider value={value}>
      {children}
    </ContextTest.Provider>
  );
  }

const HeadScripts = () => {
  // consume parents context
  const { loadedScripts, setLoadedScripts } = useContext(ContextTest);
  

  // const router = useRouter();
  // const [load, setLoad] = useState(false);

  let { 
    global,
    story = {}
  } = useGlobalContext();

  // const handleRouteChange = () => {
  //   // setLoad(true);
  // }

  // const handleRouteChangeStart = () => {
  //   // setLoad(false);

  //   console.log('route change')
  //   console.log(loadedScripts.current)

  //   loadedScripts.current.forEach((script) => {
  //     console.log(script)
  //     script.parentNode.removeChild(script)
  //   });
  // }

  useEffect(() => {
    // console.log('mount')
    setLoadedScripts(["true"]);
    // setLoad(true);

    // router.events.on('routeChangeComplete', handleRouteChange)
    // router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      // router.events.off('routeChangeComplete', handleRouteChange)
      // router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])

  // useEffect(() => {
  //   console.log(loadedScripts)
  // }, [router.asPath])

  useEffect(() => {
    console.log("inner: ", loadedScripts)
  }, [loadedScripts])

  const onLoad = (e: any) => {
    // console.log(e.currentTarget);
    // console.log(setLoadedScripts)
    // setLoadedScripts(false);

    // if (script.strategy === "lazyOnload") {
    //   // do some stuff here
    //   console.log('load')
    // }
  }

  return (
    <>
      {/* <div>Hi</div> */}
      {/* {
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
              onLoad={onLoad}
            />
          )
        }
        ) || null
      } */}
    </>
  )
}

export default HeadScripts;
