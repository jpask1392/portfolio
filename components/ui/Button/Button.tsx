import { FormContext } from "@/components/modules/Form";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import cn from "classnames";
import type { button } from '@/types/button';
import { useEffect, useState, useContext } from "react";
import { ThreeDots } from 'react-loading-icons';


const Button: React.FC<button> = ({
  buttonStyle = 'primary',
  className,
  disabled,
  text,
  link = {},
  ariaLabel,
  onClick,
  ajaxClick,
  isSubmit,
  icon,
}) => {
  const [loading, setLoading] = useState(false);
  const { submitting } = useContext<any>(FormContext);

  useEffect(() => {
    setLoading(submitting)
  }, [submitting]);

  const buttonClasses = cn(className, { 
    [buttonStyle] : buttonStyle,
    'button' : buttonStyle !== 'link',
    'link text-primary relative overflow-x-hidden' : buttonStyle === 'link',
  });

  return (
    <>
      <StoryBlokLink 
        sbLink={isSubmit ? false : link}
        className={cn({
          "pointer-events-none" : loading,
        })}
      >
        <button
          type={isSubmit ? "submit" : undefined}
          className={buttonClasses}
          disabled={disabled || loading}
          aria-label={ariaLabel || "Button Click"}
          onClick={(e) => {
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
          }}
        >
          <span className={cn({'opacity-0' : loading })}>{text}</span>
          <span className="absolute right-4">{icon}</span>
          <span className={cn('absolute', {'opacity-0' : !loading })}>
            <ThreeDots fill="black" height="10px"/>
          </span>
        </button>
      </StoryBlokLink>
    </>
  )
}

export default Button;
