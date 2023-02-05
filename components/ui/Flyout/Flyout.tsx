import { useEffect } from "react";
import dynamic from "next/dynamic";
import cn from "classnames";

// import dynamically becuse we need access to the brower document
const FlyoutPortal = dynamic(() => import('./FlyoutPortal'), {
  ssr: false,
})

interface Props {
  children: any
  active: boolean
  setActive?: any
  Header?: any
}

const Flyout: React.FC<Props> = ({
  children,
  active,
  setActive,
  Header,
}) => {
  return (
    <FlyoutPortal>
      <div className={cn("fixed z-20 inset-0 top-[var(--header-height)]", {
        "pointer-events-none" : !active,
        "pointer-events-all" : active,
      })}>
        <div className={cn("bg-black absolute inset-0 transition-opacity duration-500", {
          "opacity-80" : active,
          "opacity-0" : !active,
        })} />
        <div className={cn("w-full absolute bottom-0 max-w-[calc(100%_-_6rem)] md:max-w-[400px] lg:max-w-[520px] transition-all duration-500 -top-[var(--header-height)] max-h-screen overflow-auto", {
          "left-0" : active,
          "-left-full" : !active,
        })}>
          {
            Header ? (
              <header className="bg-red h-[var(--header-height)] flex items-center">
                <Header />
              </header>   
            ) : null
          }
          { children }
        </div>
      </div>
    </FlyoutPortal>
  )
}

export default Flyout