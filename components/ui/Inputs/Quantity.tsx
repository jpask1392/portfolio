import cn from 'classnames';
import { useRef } from 'react';

interface Props {
  className?: string
  onChange?: (quantity: number) => void
  defaultValue?: number
}

const Quantity: React.FC<Props> = ({ 
  className,
  defaultValue = 1,
  onChange
}) => {
  const inputRef = useRef<null | HTMLInputElement>(null);

  const buttonClassNames = cn([
    'z-20'
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
    <div className={cn(className, 'text-sm inline-flex relative w-full h-full border border-[var(--primary-color)] rounded-full')}>
      <input 
        ref={inputRef}
        name="quantity"
        min={1}
        max={999}
        type="number"
        onChange={handleOnChange}
        defaultValue={defaultValue} 
        className={cn("bg-transparent appearance-none pl-5 rounded-full w-full min-w-[50px]")}
      />

      <div className="flex flex-col pr-5">
        <button 
          className={`${buttonClassNames} right-0`} 
          onClick={() => handleClick('plus')}
        >+</button>
        <button 
          className={buttonClassNames} 
          onClick={() => handleClick('minus')}
        >-</button>
      </div>
    </div>
  )
}
export default Quantity;
