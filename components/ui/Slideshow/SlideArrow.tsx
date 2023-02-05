import DynamicIcon from "@/components/icons/DynamicIcon";
import cn from "classnames";

interface Props {
  direction: string
  className?: string
}

const SlideArrow: React.FC<Props> = ({ 
  direction,
  className 
}) => {
  const arrowClasses = cn([
    className,
    'w-4',
    'h-4',
    'flex',
    'items-center',
    'justify-center',
    'origin-center',
    { 'transform' : direction === 'next' },
    { 'rotate-180' : direction === 'next' }
  ]);

  return (
    <div className={arrowClasses}>
      <DynamicIcon type="arrowLeft" />
    </div>
  )
}

export default SlideArrow;