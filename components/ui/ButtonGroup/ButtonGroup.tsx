import { sbEditable } from "@storyblok/storyblok-editable";
import { SbEditableContent } from "@/types/storyBlok";
import Button from '@/components/ui/Button';

import cn from 'classnames';
import type { button } from '@/types/button';

interface Props {
  blok?: SbEditableContent
  className?: string
  align?: 'start' | 'center' | 'end' | undefined
  padTop?: 'lg' | 'md' | 'sm' | undefined
  children: any
}

const ButtonGroup: React.FC<Props> = ({ 
  blok,
  className,
  align,
  children,
  padTop,
}) => {
  
  return (
    <div
      {...blok && sbEditable(blok)}
      className={cn(className, "ui-btn-group flex space-x-4 flex-wrap", {
        [`justify-${align}`] : align,
        "pt-24": padTop === 'lg',
        "pt-16": padTop === 'md',
        "pt-2 md:pt-5": padTop === 'sm',
      })}
    >
      { children }
    </div>
  );
};

export default ButtonGroup;
