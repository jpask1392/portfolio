import * as RadixSlider from '@radix-ui/react-slider';
import cn from 'classnames';
import { useState, useRef } from 'react';
import { formatMoney } from '@/utils/formatMoney';

interface Props {
  id: string
  onValueChange?: (value: any) => void
  min: number
  max: number
  defaultValue: number[]
}

const Slider: React.FC<Props> = ({
  onValueChange,
  id,
  min,
  max,
  defaultValue,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const thumbClassNames = cn([
    "w-6",
    "h-6",
    "bg-primary-800",
    "block",
    "absolute",
    "top-1/2",
    "left-1/2",
    "transform",
    "-translate-y-1/2",
    "-translate-x-1/2",
    "rounded-full"
  ]);

  const timeout = useRef<any>(null);
  const handleValueChange = (value: any) => {
    setInternalValue(value);
    
    if (timeout.current) {  
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(function() {
      onValueChange && onValueChange(value);
    }, 1000);
  }

  // console.log(min)
  // console.log(max)

  return (
    <div>
      <RadixSlider.Root 
        className="relative block w-full" 
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
      >
        <RadixSlider.Track className="h-px bg-red-100 w-full block">
          <RadixSlider.Range className="absolute h-full inline-block bg-primary" />
        </RadixSlider.Track>

        <RadixSlider.Thumb className={thumbClassNames} />
        <RadixSlider.Thumb className={thumbClassNames} />
        
      </RadixSlider.Root>

      <div className="mt-6 flex justify-end text-sm text-primary">
        {formatMoney(internalValue[0])} <span className="mx-2">-</span>
        {formatMoney(internalValue[1])}
      </div>
    </div>
  )
}
export default Slider;
