import DynamicIcon from "@/components/icons/DynamicIcon";
import { FormContext } from "@/components/modules/Form";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import cn from "classnames";
import type { button } from '@/types/button';
import Link from 'next/link';
import { useEffect, useState, useContext } from "react";
import { ThreeDots } from 'react-loading-icons';


const Button: React.FC<button> = ({
  buttonStyle = 'primary',
  onDark = false,
  className,
  linkClasses,
  disabled,
  text,
  link = {},
  ariaLabel,
  onClick,
  ajaxClick, // function should return a promise
  isSubmit,
  maxWidth = true,
}) => {
  const [ loading, setLoading ] = useState(false);
  const { submitting } = useContext<any>(FormContext);

  useEffect(() => {
    setLoading(submitting)
  }, [submitting]);

  const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
    if (ajaxClick) {
      e.preventDefault();

      (async () => {
        setLoading(true);

        const makeRequest = 
          async (e: React.SyntheticEvent<EventTarget>) => ajaxClick(e);

        try {
          await makeRequest(e);
        } catch (err) {
          // TODO: show a toast pop up if ajax call fails
          console.warn(err);
          alert('something went wrong')
        }
        
        setLoading(false);
        return;
      })()
    } else if (onClick) {
      onClick(e);
      return;
    }
  }

  return (
    <>
      <StoryBlokLink 
        sbLink={isSubmit ? false : link}
        onClick={handleClick}
        className={cn("button relative", className, {
          "pointer-events-none" : loading || disabled,
          "inline-flex items-center link" : buttonStyle === 'link',
          [buttonStyle]: buttonStyle !== 'link',
          "mw" : maxWidth,
        })}
      >
        <span className={cn({'opacity-0' : loading })}>{text}</span>
        <span className={cn('absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2', {'opacity-0' : !loading })}>
          <ThreeDots fill="black" height="10px"/>
        </span> 
      </StoryBlokLink>
    </>
  )
}

export default Button;
