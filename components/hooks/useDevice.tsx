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

  useEffect(() => {
    const breakpoint = window.matchMedia( '(min-width: 1024px)' );
    breakpointChecker(breakpoint);

    breakpoint.addEventListener('change', breakpointChecker);

    return () => breakpoint.removeEventListener('change', breakpointChecker);
  }, []);

  return device;
}

export default useDevice;