import cn from 'classnames';
import useSWR from 'swr';
import FeaturedCollectionTile from './FeaturedCollectionTile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";

interface Props {
  className?: string
  collectionNames?: string
  tilesPerRow?: string
  tileStyle?: "primary" | "secondary"
}

const FeaturedCollections: React.FC<Props> = ({ 
  className,
  collectionNames = '',
  tilesPerRow = '2',
  tileStyle = 'primary',
}) => {
  const [ collections, setCollections ] = useState<any[]>([...Array(parseInt(tilesPerRow))].map(() => null));
  const { scroll } = useSmoothScrollContext();

  const containerRef = useRef<any>(null);
  const itemsRef = useRef<any>([])

  const queryNames = collectionNames.split(',');
  let queryString = "";
  queryNames.forEach((name: string, i: number) => {
    queryString += `(title:${name})`;
    if (i !== queryNames.length) queryString += ` OR `;
  });

  /**
   * Using an SWR (stale-while-revalidate) hook here 
   * because the data shouldn't be changing too much
   * 
   * See https://swr.vercel.app/docs/getting-started for more info
   */
  const { data, error } = useSWR(`/api/catalog/collections?query=${encodeURIComponent(queryString)}`, async (url) => {
    const res = await fetch(url);
    return await res.json();
  });

  useEffect(() => {
    // render the loaded collections
    if (data) setCollections(data);
  }, [data])

  // update pointers to refs
  useEffect(() => {    
    itemsRef.current = itemsRef.current.slice(0, collections.length);
 }, [collections]);

  useEffect(() => {
    if (scroll) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center+=63px',
          markers: false,
          scroller: "[data-scroll-container]",
        },
      });

      collections.map((item, i) => {
        if (!item) return;

        tl.fromTo(itemsRef.current[i], { 
          opacity: 0,
          y: 100,
        }, {
          opacity: 1,
          y: 0,
          // stagger: 0.15,
          duration: 0.9,
          ease: "power4.out",
        }, "-=0.75");
      })
      
    }
  }, [scroll, collections])

  return (
    <div 
      className={cn(className, "overflow-hidden")} 
      ref={containerRef}
    >
      <div className="flex flex-wrap -mx-2.5 md:-mx-4 -mb-8">
        {
          collections?.map((collection, i) => 
            <div 
              key={i}
              ref={el => (itemsRef.current[i] = el)}
              className={cn("pb-8", {
              "w-full lg:w-1/2 px-8 md:px-12 py-8 lg:px-4 odd:bg-primary lg:odd:bg-transparent" : tilesPerRow === '2',
              "w-full md:w-1/3" : tilesPerRow === '3',
              "w-1/2 lg:w-1/4 px-2.5 md:px-4" : tilesPerRow === '4'
             })}
            >
              <FeaturedCollectionTile 
                collection={collection} 
                tileStyle={tileStyle}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FeaturedCollections;
