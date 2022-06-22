import DynamicIcon from '@/components/icons/DynamicIcon';
import { ReactNode, Component, useState } from 'react';
import { Checkbox, Slider } from '@/components/ui/Inputs';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  className?: string
  id?: string
  label?: string
  style?: "sideLabel" | "radio" | string
  type?: string
  values?: any[]
  onDataChange?: (inputId: any) => any
  initialPriceFilters: any
}

const ProductFilters: React.FC<Props> = ({
  label,
  id,
  style = "sideLabel",
  type = "checkbox",
  values = [],
  onDataChange,
  initialPriceFilters,
}) => {
  const [open, setOpen] = useState(true);

  const moduleClassNames = cn(
    {
      "flex flex-col space-y-4" : style === 'sideLabel',
      "grid grid-cols-3 gap-4" : style === 'radio'
    }
  );

  // runs if child components state changes
  const handleDataChange = (value: any) => {
    let formattedQuery = '';
    if (Array.isArray(value)) {
      // convert value to query for shopify
      formattedQuery = JSON.stringify({ price: { min: value[0], max: value[1] } })
    } else {
      formattedQuery = value;
    }

    onDataChange && onDataChange(formattedQuery)
  }

  return (
    <div className="filter-block pb-9 border-b border-gray2">
      <h4 
        className="caption relative cursor-pointer" 
        onClick={() => setOpen(!open)}
      >
        <span>{label || <Skeleton width="50%"/>}</span>
        <span className="absolute top-0 right-0">
          <DynamicIcon 
            type='togglePlusMinus' 
            open={open}
          />
        </span>
      </h4>
      <div className={cn("relative pr-12 mt-7", {
        'hidden' : !open
      })}>
        <div className={moduleClassNames}>
          {
            !values ? (
              <>
                <Skeleton width="16px" height="16px" inline className="mr-2"/>
                <Skeleton width="66%"/>
                <Skeleton width="16px" height="16px" inline className="mr-2"/>
                <Skeleton width="66%"/>
              </>
            ) : null
          }
          {
            type === 'LIST' && (
              values?.map((item: any ) => 
                <span 
                  key={item.id}
                  className={cn({
                    "flex" : style === 'sideLabel'
                  })}
                >
                  <Checkbox 
                    key={item.id}
                    id={item.input}
                    label={item.label}
                    value={item.value}
                    style={style}
                    onValueChange={handleDataChange}
                    disabled={item.count === 0}
                  />
                  {
                    style === 'sideLabel' && item.count > 0 ? (
                      <span className="ml-1"> ({item.count})</span>
                    ) : null
                  }
                </span>
              )
            )
          }
          {
            type === "PRICE_RANGE" && (
              <Slider 
                onValueChange={handleDataChange}
                id={id || ''}
                min={JSON.parse(initialPriceFilters.values[0].input).price.min}
                max={JSON.parse(initialPriceFilters.values[0].input).price.max}
                defaultValue={[
                  JSON.parse(values[0].input).price.min, 
                  JSON.parse(values[0].input).price.max
                ]}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductFilters;
