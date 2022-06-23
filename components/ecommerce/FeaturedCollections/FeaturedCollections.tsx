import cn from 'classnames';
import useSWR from 'swr';
import FeaturedCollectionTile from './FeaturedCollectionTile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

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
  const [ collections, setCollections ] = useState<any[]>([null, null, null]);
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (containerRef?.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center+=63px',
          markers: false,
        },
      });

      tl.fromTo('.collection-item-wrapper', { 
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power4.out",
        
      });
    }
  }, [])

  return (
    <div className={cn(className, "overflow-hidden")} ref={containerRef}>
      <div className="flex flex-wrap -mx-4 -mb-8">
        {
          collections?.map((collection, i) => 
            <div key={i} className={cn("collection-item-wrapper px-4 pb-8", {
              "w-full xl:w-1/2" : tilesPerRow === '2',
              "w-full md:w-1/3" : tilesPerRow === '3',
              "w-full md:w-1/2 xl:w-1/4" : tilesPerRow === '4'
            })}>
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
