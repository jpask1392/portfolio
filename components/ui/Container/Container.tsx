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
  extendRight?: boolean
  backgroundOverlay?: number
  spacing?: 'sm' | 'md' | 'lg'
  clearMargin?: string[]
  clearPadding?: string[]
  sbEditable?: SbEditableContent
}
139
const Container: React.FC<ContainerProps> = ({
  children,
  className,
  el = 'section',
  backgroundColor = '',
  textColor = '',
  backgroundMedia,
  backgroundOverlay,
  maxWidth = '2xl',
  contained = true,
  extendRight = false,
  spacing = 'md',
  clearMargin = [],
  clearPadding = [],
  sbEditable,
}) => {
  const rootClassName = cn(className, {
    "ml-auto md:-ml-16 xl:-ml-24": el !== 'div',
    'section': el === 'section',
    'mt-i-0': clearMargin.includes('top'),
    'mb-i-0': clearMargin.includes('bottom'),
    'pt-i-0': clearPadding.includes('top'),
    'pb-i-0': clearPadding.includes('bottom'),
    'section--spacing-sm': spacing === 'sm',
    'section--spacing-lg': spacing === 'lg',
    [`has-bg bg-${backgroundColor}`] : backgroundColor,
    [`text-${textColor}`] : textColor,
  });

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any

  return (
    <Component 
      className={rootClassName}
      {...sbEditable}
    >
      <div className={cn({
        'lg:pr-16 xl:pr-24' : !extendRight && contained,
        'md:pl-16 xl:pl-24' : contained,
      })}>
        {/* { 
          backgroundMedia && (
            <BackgroundMedia
              image={backgroundMedia}
              bgColor={backgroundColor}
              backgroundOverlay={backgroundOverlay}
              priority
            />
          )
        } */}
        <div className={`w-full max-w-screen-${maxWidth} mx-auto relative z-10`}>
          <div className={cn({
            'container overflow-hidden md:overflow-visible' : contained && !extendRight,
            'extend-right' : extendRight
          })}>
            {children}
          </div>
        </div>
      </div>
    </Component>
  )
}

export default Container;
