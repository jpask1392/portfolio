import cn from 'classnames';
import { useRef } from 'react';

interface Props {
  className?: string
  onChange?: (quantity: number) => void
}

const Quantity: React.FC<Props> = ({ 
  className,
  onChange
}) => {
  const inputRef = useRef<null | HTMLInputElement>(null);

  const buttonClassNames = cn([
    'absolute top-1/2 transform -translate-y-1/2 h-full w-10 z-20'
   ])

  const handleClick = (step: string) => {
    if (inputRef.current) {
      const currentVal = parseInt(inputRef.current?.value || '1');
      let newValue = currentVal;

      if (step === 'plus') newValue = currentVal + 1;
      if (step === 'minus' && newValue > 1) newValue = currentVal - 1;

      // set new value
      inputRef.current.value = newValue.toString();

      handleOnChange();
    }
  }

  const handleOnChange = (e?: React.SyntheticEvent<EventTarget>) => {
    if (inputRef.current) {
      // pass the state up if requested
      onChange && onChange(parseInt(inputRef.current.value));
    }
  }

  return (
    <div className={cn(className, 'text-sm inline-flex relative w-full h-full')}>

      <button 
        className={buttonClassNames} 
        onClick={() => handleClick('minus')}
      >-</button>

      <input 
        ref={inputRef}
        name="quantity"
        min={1}
        max={999}
        type="number"
        onChange={handleOnChange}
        defaultValue={1} 
        className={cn([
          "text-center",
          "bg-transparent",
          "appearance-none",
          "border border-red",
          "px-10",
          "rounded-none",
         ])}
      />

      <button 
        className={`${buttonClassNames} right-0`} 
        onClick={() => handleClick('plus')}
      >+</button>
    </div>
  )
}
export default Quantity;
