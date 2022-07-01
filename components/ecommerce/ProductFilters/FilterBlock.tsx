import DynamicIcon from '@/components/icons/DynamicIcon';
import { ReactNode, Component, useState } from 'react';
import { Checkbox, Slider } from '@/components/ui/Inputs';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  className?: string
  label?: string
  style?: "sideLabel" | "radio" | string
}

const ProductFilterBlock: React.FC<Props> = ({
  label,
  style = "sideLabel",
  children
}) => {
  const [open, setOpen] = useState(true);

  const moduleClassNames = cn(
    {
      "flex flex-col space-y-4" : style === 'sideLabel',
      "grid grid-cols-3 gap-4" : style === 'radio'
    }
  );

  return (
    <div className="filter-block mb-8 last:mb-0">
      <h4 
        className="caption relative cursor-pointer text-secondary flex items-center" 
        onClick={() => setOpen(!open)}
      >
        <span className="h4 pr-4">{label || <Skeleton width="50%"/>}</span>
        <span className="">
          <DynamicIcon 
            type='togglePlusMinus' 
            open={open}
          />
        </span>
      </h4>
      <div className={cn("relative mt-7", {
        'hidden' : !open
      })}>
        <div className={moduleClassNames + " pl-3"}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProductFilterBlock;
