
import cn from 'classnames';
import FilterBlock from './FilterBlock';
import { useEffect, useState, useRef } from 'react';

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
  const [activeFilters, setActiveFilters] = useState<any>(["{\"price\":{\"min\":0,\"max\":1000000}}"]);
  const didMountRef = useRef(false);

  // add filter to state
  const handleDataChange = (inputId: string) => {
    let newArr = activeFilters;
    
    if (inputId.includes('price')) {
      newArr[0] = inputId;
    } else {
      (!activeFilters.includes(inputId))
        ? newArr.push(inputId)
        : newArr.splice(newArr.indexOf(inputId), 1);
    }

    setActiveFilters([...newArr])
  }

  // pass up the current state
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
            <FilterBlock
              key={filter?.id || null}
              style={filter?.style || null}
              label={filter?.label || null}
              type={filter?.type || null}
              id={filter?.id || null}
              values={filter?.values || null}
              onDataChange={handleDataChange}
              initialPriceFilters={initialPriceFilters}
            />
          )
        })
      }
    </div>
  )
}

export default ProductFilters;
