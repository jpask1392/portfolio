import cn from 'classnames';
import DynamicIcon from '@/components/icons/DynamicIcon';

import useToast from "@/components/hooks/useToast";

interface Props {
  style?: string | 'success' | 'error' | 'warning'
  message?: string
  title?: string
  index: number
}

const Toast: React.FC<Props> = ({
  style = 'success',
  message = 'This is the message.',
  title = style,
  index
}) => {
  const styles: any = {
    success: 'bg-green-300 border-green-800 text-black',
    error: 'bg-red-300 border-red-800 text-black',
    info: 'bg-blue-300 border-blue-800 text-black',
    warning: 'bg-yellow-100 border-yellow-500 text-black',
  }

  const [ toasts, addToast, removeToast ] = useToast();

  return (
    <div
      key={index}
      className={cn(
        "w-full md:w-96 mx-auto px-6 py-4 flex justify-center rounded-md relative border-l-8 mb-3 last-of-type:mb-0", 
        styles[style],
      )}
    >
      <div className="w-full">
        <h3 className="text-base font-medium capitalize tracking-wide">
          {title || 'title'}
        </h3>
        <p className="text-xs mt-2" dangerouslySetInnerHTML={{__html: message}} />
        <button className="absolute top-2 right-2" onClick={() => removeToast(index)}>
          <DynamicIcon type="close" className="fill-current" />
        </button>
      </div>
    </div>
  )
}

export default Toast;