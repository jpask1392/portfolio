import cn from 'classnames';
import { ReactNode, Component } from 'react';

interface GridProps {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  layout?: 'A' | 'B' | 'C' | 'D' | 'E'
  padTop?: 'lg' | 'md' | 'sm' | undefined
}

const Grid: React.FC<GridProps> = ({
  className,
  layout = 'A',
  children,
  padTop,
}) => {
  const rootClassName = cn(
    className,
    'flex flex-wrap ui-grid',
    {
      'grid-l-a': layout === 'A',
      'grid-l-b': layout === 'B',
      'grid-c': layout === 'C',
      'grid-l-d': layout === 'D',
      'grid-l-e': layout === 'E',
      "pt-12 md:pt-24": padTop === 'lg',
      "pt-7 md:pt-16": padTop === 'md',
      "pt-8": padTop === 'sm',
    }
  )
  return (
    <div 
      className={rootClassName}
    >
      {children}
    </div>
  )
}

export default Grid;