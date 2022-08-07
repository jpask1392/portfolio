import BackgroundMedia from './BackgroundMedia';
import cn from 'classnames';
import type { storyBlokImage } from '@/types/storyBlok';
import { SbEditableContent } from "@/types/storyBlok";

interface ContainerProps {
  children: any
  className?: string
  el?: string
  backgroundColor?: 'primary' | 'black' | 'white' | 'transparent'
  textColor?: string
  backgroundMedia?: storyBlokImage
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  contained?: boolean
  backgroundOverlay?: number
  spacing?: 'sm' | 'md' | 'lg'
  clearMargin?: string[]
  clearPadding?: string[]
  sbEditable?: SbEditableContent
}

const Container: React.FC<ContainerProps> = ({
  sectionId,
  children,
  className,
  el = 'section',
  backgroundColor = '',
  textColor = '',
  backgroundMedia,
  backgroundOverlay,
  maxWidth = '2xl',
  contained = true,
  spacing = 'sm',
  clearMargin = [],
  clearPadding = [],
  sbEditable,
}) => {
  const rootClassName = cn(className, {
    'section': el === 'section',
    '!mt-0': clearMargin.includes('top'),
    '!mb-0': clearMargin.includes('bottom'),
    '!pt-0': clearPadding.includes('top'),
    '!pb-0': clearPadding.includes('bottom'),
    'section--spacing-sm': spacing === 'sm',
    'section--spacing-md': spacing === 'md',
    'section--spacing-lg': spacing === 'lg',
    [`has-bg bg-${backgroundColor}`] : backgroundColor,
    [`text-${textColor}`] : textColor,
  });

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return (
    <Component 
      id={sectionId || undefined}
      className={rootClassName}
      {...sbEditable}
    >
      { 
        backgroundMedia && backgroundMedia.id && (
          <BackgroundMedia
            image={backgroundMedia}
            bgColor={backgroundColor}
            backgroundOverlay={backgroundOverlay}
            priority
          />
        )
      }
      <div className={`w-full max-w-screen-${maxWidth} mx-auto relative z-10`}>
        <div className={cn({
          'container' : contained,
        })}>
          {children}
        </div>
      </div>
    </Component>
  )
}

export default Container;
