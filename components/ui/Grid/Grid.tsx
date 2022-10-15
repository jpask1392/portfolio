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
  layout = '12',
  children,
  padTop,
  xGap = "6",
  yGap = "0",
}) => {
  const childrenNonNull = children?.filter(Boolean)[0];

  /**
   * Examples
   * 
   * 6-6 | 2 columns, even
   * 3-3-6 | 3 columns, uneven
   */

  const columnSizes = layout.split("-");

  /**
   * Add classnames to children components
   */
  const childrenWithClasses = childrenNonNull.map((child: any, index: number) => {
    const flooredDivision = Math.floor(index / columnSizes.length);
    const minusFromIndex = columnSizes.length * flooredDivision;
    const columnSizesIndex = index - minusFromIndex;
    const classes = cn(`px-${xGap} py-${yGap}`, {
      [`w-${columnSizes[columnSizesIndex]}/12`] : columnSizes.length !== 1,
      "w-full" : columnSizes.length === 1,
    })

    return {
      ...child,
      props: {
        ...child.props,
        blok: {
          ...child.props.blok,
          className: classes,
        }
      }
    }
  })

  const rootClassName = cn(
    className,
    `flex flex-wrap ui-grid -mx-${xGap} -my-${yGap}`,
  )
  return (
    <div 
      className={rootClassName}
    >
      {childrenWithClasses}
    </div>
  )
}

export default Grid;