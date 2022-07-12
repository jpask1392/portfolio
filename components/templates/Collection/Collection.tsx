import Pagination from '@/components/ui/Pagination';
import SideFilterLayout from '../SideFilterLayout';
import HeroImage from "@/components/modules/HeroImage";
import Column from "@/components/ui/Column";
import Header from "@/components/ui/Header";
import { useRouter } from "next/router";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";
import ProductFilters from "@/components/ecommerce/ProductFilters";
import ProductTile from "@/components/ecommerce/ProductTile";
import cn from 'classnames';
import { useEffect, useState, useRef } from "react";
import useToast from "@/components/hooks/useToast";

interface Props {
  initalCollection: any,
}

const CollectionTemplate: React.FC<Props> = ({
  initalCollection
}) => {
  const [ collection, setCollection ] = useState(initalCollection);
  const [ loading, setLoading ] = useState(false);
  // const [ toasts, addToast ] = useToast();
  const didMountRef = useRef(false);
  const { scroll } : { scroll: any } = useSmoothScrollContext();

  // set default filtering
  const [ currentFilters, setCurrentFilters ]  = useState({
    filters: [
      "{\"price\":{\"min\":0,\"max\":1000000}}"
    ],
    sortKey: {
      key: "COLLECTION_DEFAULT", 
      reverse: false
    },
    pagination: {
      after: null,
      before: null,
    }
  });
  
  // use initial filter from static props to maintain max price
  const initialPriceFilters = initalCollection?.filters.find((el: any) => el.label === 'Price');

  // runs if childs state changes
  const handleDataChange = (filters: any) => {
    setCurrentFilters(filters);
  }

  useEffect(() => {
    if (didMountRef.current && scroll) {
      (async () => {
        setLoading(true);
  
        try {
          // send query to API
          const res = await fetch(`/api/catalog/collections`, {
            method: "POST",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({
              handle: collection.handle,
              productFilters: currentFilters.filters,
              sortKey: currentFilters.sortKey.key,
              reverse: currentFilters.sortKey.reverse,
              ...currentFilters.pagination,
            })
          });
    
          const collectionData = await res.json();
          if (collectionData) setCollection(collectionData);

          scroll && scroll.update();
        } catch (err) {
          // TODO: addToast is causing a rerender in the UI context
          // - need to review properly

          // addToast({
          //   message: "Something went wrong",
          //   style: "error"
          // })
        }
    
        setLoading(false)
      })()
    }

    didMountRef.current = true;
  }, [currentFilters, currentFilters.pagination])

  useEffect(() => {
    // initial collection changes on page re-route
    setCollection(initalCollection)
  }, [initalCollection])

  /**
   * Run on page change
   * 
   * @param pagination 
   */
  const onPageChange = (pagination: any)  => {
    // scroll up
    if (scroll) {
      scroll.scrollTo("top", {
        offset: 400,
        duration: 300,
      })
    }

    setCurrentFilters({
      ...currentFilters, 
      pagination: {...pagination},
    })
  }

  return (
    <>
      <HeroImage 
        image={collection.collectionHeader}
        style="narrow"
        overlay
        TopBlockComponent={() => (
          <Column
            hAlignContent="right"
          >
            <Header tag="h1" size="h1" color="primary">
              {collection.title}
            </Header>

            {
             collection.subHeader ? (
              <Header tag="h2" size="p" color="primary">
                {collection.subHeader.value}
              </Header>
              ) : null 
            }
          </Column>
        )}
      />

      <SideFilterLayout
        Filters={() => (
          collection?.filters ? (
            <ProductFilters
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}
              collection={collection}
              onDataChange={handleDataChange}
              initialPriceFilters={initialPriceFilters}
            />
          ) : null
        )}

        Content={() => (
          <>
            <div className={cn("grid gap-x-8 md:gap-x-14 xl:gap-x-28 gap-y-12 md:gap-y-20 grid-cols-2 md:grid-cols-3 transition-opacity", {
              'opacity-20': loading
            })}>
              {
                collection && collection.products ? (
                  collection.products.map((product: any, i: number) => 
                    <ProductTile key={product.id} product={product}/>
                  )
                ) : (
                  <div>No Products Found</div>
                )
              }
            </div>

            <Pagination 
              hasPreviousPage={collection.pagination.hasPreviousPage}
              hasNextPage={collection.pagination.hasNextPage}
              onPageChange={onPageChange}
              endCursor={collection.pagination.endCursor}
              startCursor={collection.pagination.startCursor}
            />
          </>
        )}
      />
    </>
  )
};

export default CollectionTemplate;
