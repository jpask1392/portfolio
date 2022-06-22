import useSWR from 'swr';
import FeaturedCollectionTile from './FeaturedCollectionTile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string
  collectionNames?: string
}

const FeaturedCollections: React.FC<Props> = ({ 
  className,
  collectionNames = '',
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
    <div className={className} ref={containerRef}>
      <div className="flex flex-wrap -mx-2 -mb-4">
        {
          collections?.map((collection, i) => 
            <div key={i} className="collection-item-wrapper w-full lg:w-1/3 px-2 pb-4">
              <FeaturedCollectionTile collection={collection} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FeaturedCollections;
