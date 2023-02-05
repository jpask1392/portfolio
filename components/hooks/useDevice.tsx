import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import { useEffect, useState } from "react"

const useDevice = () => {
  const [device, setDevice] = useState<string | boolean>(false);

  const breakpointChecker = (breakpoint: any) => {
    if ( breakpoint.matches === true ) {
      setDevice('desktop')
    } else {
      setDevice('mobile')
    }
  }

  useIsomorphicLayoutEffect(() => {
    const breakpoint = window.matchMedia( '(min-width: 1560px)' );
    breakpointChecker(breakpoint);

    // added support for depreceated devices
    try {
      breakpoint.addEventListener('change', breakpointChecker);
      return () => breakpoint.removeEventListener('change', breakpointChecker);
    } catch (error) {
      breakpoint.addListener(breakpointChecker);
      return () => breakpoint.removeListener(breakpointChecker);
    }
    
  }, []);

  return device;
}

export default useDevice;