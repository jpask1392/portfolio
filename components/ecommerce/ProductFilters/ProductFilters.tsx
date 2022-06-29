
import cn from 'classnames';
import FilterBlock from './FilterBlock';
import { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton'
import { Checkbox, Slider } from '@/components/ui/Inputs';
import { Sort } from "@/components/ecommerce/ProductFilters";

interface Props {
  className?: string
  collection: any
  onDataChange?: (value: any) => void
  initialPriceFilters: any
}

const ProductFilters: React.FC<Props> = ({ 
  className,
  collection,
  onDataChange,
  initialPriceFilters
}) => {
  // TODO: I don't like how I'm repeating the state here and in the [handle].tsx file
  const [ activeFilters, setActiveFilters ] = useState<any>({filters: ["{\"price\":{\"min\":0,\"max\":1000000}}"]});
  const didMountRef = useRef(false);
  const [ sortKey, setSortKey ] = useState({key: "COLLECTION_DEFAULT", reverse: false});

  /**
   * Run when a filter has been clicked
   * 
   * @param value 
   */
  const handleDataChange = (value: string) => {
    let newArr = activeFilters.filters;
    let formattedQuery = '';

    if (Array.isArray(value)) {
      // convert value to query for shopify
      formattedQuery = JSON.stringify({ price: { min: value[0], max: value[1] } })
    } else {
      formattedQuery = value;
    }
  
    if (formattedQuery.includes('price')) {
      newArr[0] = formattedQuery;
    } else {
      (!activeFilters.filters.includes(formattedQuery))
        ? newArr.push(formattedQuery)
        : newArr.splice(newArr.indexOf(formattedQuery), 1);
    }

    setActiveFilters({filters: [...newArr], sortKey})
  }

  /**
   * Update filters if sortkey changes
   */
  useEffect(() => {
    setActiveFilters({...activeFilters, sortKey})
  }, [sortKey])

  /**
   * Pass the current state to parent component if changes
   */
  useEffect(() => {
    if (didMountRef.current) {
      onDataChange && onDataChange(activeFilters)
    }

    didMountRef.current = true;
  }, [activeFilters])

  return (
    <div className={className}>
      {
        collection.filters.map((filterRaw: any) => {
          const filter = {
            ...filterRaw,
            style: 'sideLabel',
          };
      
          if (filter.label === "Size") {
            filter.style = 'radio'
          }

          return (
            <>
              <FilterBlock
                key={filter?.id || null}
                style={filter?.style || null}
                label={filter?.label || null}
              >
                <>
                  {
                    !filter?.values ? (
                      <>
                        <Skeleton width="16px" height="16px" inline className="mr-2"/>
                        <Skeleton width="66%"/>
                        <Skeleton width="16px" height="16px" inline className="mr-2"/>
                        <Skeleton width="66%"/>
                      </>
                    ) : null
                  }
                  {
                    filter?.type === 'LIST' && (
                      filter?.values?.map((item: any ) => 
                        <span 
                          key={item.id}
                          className={cn({
                            "flex" : filter?.style === 'sideLabel'
                          })}
                        >
                          <Checkbox 
                            key={item.id}
                            id={item.input}
                            label={item.label}
                            value={item.value}
                            style={filter?.style}
                            onValueChange={handleDataChange}
                            disabled={item.count === 0}
                          />
                        </span>
                      )
                    )
                  }
                  {
                    filter?.type === "PRICE_RANGE" && (
                      <Slider 
                        onValueChange={handleDataChange}
                        id={filter?.id || ''}
                        min={JSON.parse(initialPriceFilters.values[0].input).price.min}
                        max={JSON.parse(initialPriceFilters.values[0].input).price.max}
                        defaultValue={[
                          JSON.parse(filter?.values[0].input).price.min, 
                          JSON.parse(filter?.values[0].input).price.max
                        ]}
                      />
                    )
                  }
                </>
              </FilterBlock>
            </>
          )
        })
      }

      <FilterBlock label="Sort">
        <Sort
          setSortKey={setSortKey}
          sortKey={sortKey}
        />
      </FilterBlock>
    </div>
  )
}

export default ProductFilters;
