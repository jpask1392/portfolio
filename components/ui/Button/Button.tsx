import toast from 'react-hot-toast';
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import cn from "classnames";
import type { button } from '@/types/button';
import { useEffect, useState } from "react";
import { Oval } from 'react-loading-icons';
import type { SbBlokData } from "@storyblok/react"

interface Blok extends SbBlokData, button {}

interface ButtonProps extends button {
  children?: any
  blok?: Blok
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    buttonStyle = 'product',
    onDark = false,
    className,
    linkClasses,
    disabled,
    text,
    link = {},
    ariaLabel,
    onClick,
    ajaxClick, // function should return a promise
    maxWidth = true,
    isSubmit,
  } = props.blok || props;

  const [ loading, setLoading ] = useState(false);

  const handleAsync = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    setLoading(true);

    const makeRequest = 
      async (e: React.SyntheticEvent<EventTarget>) => ajaxClick && ajaxClick(e);

    try {
      await makeRequest(e);
    } catch (err) {
      console.warn(err);
      toast.error(err?.message || "Oops, something went wrong.")
    }
    
    setLoading(false);
  }

  return (
    <>
      <StoryBlokLink  
        isSubmit={isSubmit}
        sbLink={link}
        onClick={ajaxClick ? handleAsync : onClick}
        className={cn("button relative", className, {
          "pointer-events-none !bg-gray-300 text-black" : loading || disabled,
          "inline-flex items-center link" : buttonStyle === 'link',
          [buttonStyle]: buttonStyle !== 'link' && buttonStyle !== "product",
          "mw" : maxWidth,
          "bg-[var(--primary-color)] text-white" : buttonStyle === "product",
        })}
      >
        <span className={cn({'opacity-0' : loading })}>{text}</span>
        <span className={cn('absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2', {'opacity-0' : !loading })}>
          <Oval fill="black" height="16px"/>
        </span> 
      </StoryBlokLink>
    </>
  )
}

export default Button;
