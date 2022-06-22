import cn from 'classnames';
import Logo from '@/components/ui/Logo';
import { Turn as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CollectionsGridTile from '@/components/ecommerce/CollectionsGrid/CollectionsGridTile';
import { gsap } from 'gsap';
import { useRouter } from 'next/router';

interface Props {
  className?: string
  collections?: any[]
}

const SideNavigation: React.FC<Props> = ({ 
  className,
  collections,
}) => {
  const router = useRouter();
  const [ open, setOpen ] = useState(false);
  const tl = useRef<any>(null);
  const gridRef = useRef(null);
  const asideClasses = cn(className, [
    'hidden lg:flex',
    'sticky',
    'top-0',
    'border-r border-b',
    'w-16 xl:w-24',
    'z-30',
    'h-screen',
    'border-gray2',
    'relative',
    'py-10',
  ]);

  useEffect(() => {
    if (gridRef.current) {
      tl.current = gsap.timeline({
        paused: true
      });

      tl.current.to(gridRef.current, {
        x: 0,
      })

      tl.current.to('.collection-item', {
        opacity: 1,
        stagger: 0.05
      })
    }

    return () => {
      tl.current.kill();
    };
  }, [])

  useEffect(() => {
    if (tl.current) {
      open ? tl.current.play() : tl.current.reverse();
    }
  }, [open])

  useEffect(() => {
    setOpen(false);
  }, [router.query])

  return (
    <aside className={asideClasses}>
      <div className="w-full relative z-30">
        <div 
          className="origin-bottom-left left-1/2 relative" 
          style={{
            transform: 'translateY(-100%) rotate(90deg) translateY(50%)',
          }}
        >
          <Link href={"/"}>
            <a aria-label="Company Logo">
              <Logo className="h-4 xl:h-6 2xl:h-8 fill-current"/>
            </a>
          </Link>
        </div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-center z-30">
        <button aria-label="collection overlay trigger">
          <Hamburger 
            size={28} 
            onToggle={toggled => setOpen(toggled)}
          />
        </button>
      </div>

      <div ref={gridRef} className={cn("absolute w-screen h-full top-0 -translate-x-full")}>
        <div className="ml-16 xl:ml-24 h-full bg-black ">
          <div 
            className="grid gap-2 grid-cols-5 grid-rows-2 h-full p-2.5 overflow-hidden"
          >
            {
              collections?.map((collection, index) => {
                return (
                  <div 
                    key={index} 
                    className={cn("w-full h-full bg-gray-100 collection-item opacity-0", {
                      "col-span-2" : index === 1
                    })}
                  >
                    <CollectionsGridTile collection={collection} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideNavigation;