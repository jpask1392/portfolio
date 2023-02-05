import cn from 'classnames';
import { ReactNode, Component } from 'react';
import type { SbBlokData } from "@storyblok/react";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  layout?: string
  padTop?: 'lg' | 'md' | 'sm' | undefined
  xGap?: string,
  yGap?: string,
  layoutTablet ?: string
  xGapTablet?: string
  yGapTablet?: string
  layoutDesktop?: string
  xGapDesktop?: string
  yGapDesktop?: string
  flipOnMobile?: boolean
  pushStartDesktop?: number
}

interface Blok extends SbBlokData, Props {}

interface GridProps extends Props {
  children: any
  blok?: Blok
}

const Grid: React.FC<GridProps> = (props) => {
  const {
    className,
    children,
    padTop,
    layout = '12', // layout is default mobile
    xGap = "2",
    yGap = "2",
    layoutTablet = '',
    xGapTablet,
    yGapTablet,
    layoutDesktop = '',
    xGapDesktop,
    yGapDesktop,
    pushStartDesktop,
    flipOnMobile = false
  } = props.blok || props;

  const childrenNonNull = props.blok ? props.blok.content : children?.filter(Boolean)[0];

  /**
   * Examples
   * 
   * 6-6 | 2 columns, even
   * 3-3-6 | 3 columns, uneven
   */

  const responsive: any = {
    base: {
      columnSizes: layout.split("-"),
      xGap: xGap,
      yGap: yGap,
    }
  }

  if (layoutTablet) {
    responsive['md'] = {
      columnSizes: layoutTablet.split("-"),
      xGap: xGapTablet,
      yGap: yGapTablet,
    }
  }

  if (layoutDesktop) {
    responsive['lg'] = {
      columnSizes: layoutDesktop.split("-"),
      xGap: xGapDesktop,
      yGap: yGapDesktop,
      pushStart: pushStartDesktop,
    }
  }

  /**
   * Add classnames to children components
   */
  const childrenWithClasses = childrenNonNull.map((child: any, index: number) => {
    let classes = cn({
      "order-1 md:order-none " : flipOnMobile && index === 0
    });

    Object.keys(responsive).map((key) => {
      const { columnSizes, xGap, yGap, pushStart } = responsive[key];

      const flooredDivision = Math.floor(index / columnSizes.length);
      const minusFromIndex = columnSizes.length * flooredDivision;
      const columnSizesIndex = index - minusFromIndex;

      classes += cn({
        [`${key !== 'base' ? key + ":" : ""}w-${columnSizes[columnSizesIndex]}/12`] : columnSizes.length !== 1,
        "w-full" : columnSizes.length === 1,
        [`${key !== 'base' ? key + ":" : ""}px-${xGap}`]: xGap,
        [`${key !== 'base' ? key + ":" : ""}py-${yGap}`]: yGap,
        [`${key !== 'base' ? key + ":" : ""}ml-${pushStart}-12`]: pushStart,
      })

      classes += " ";
    })

    return props.blok 
      ? <StoryblokComponent key={child._uid} blok={{...child, className: classes}} />
      : {
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
    `flex flex-wrap ui-grid pt-${padTop}`, {
      [`-mx-${responsive.base.xGap}`]: responsive.base.xGap,
      [`md:-mx-${responsive.md?.xGap}`]: responsive.md?.xGap,
      [`lg:-mx-${responsive['2xl']?.xGap}`]: responsive['2xl']?.xGap,
      [`-my-${responsive.base?.yGap}`]: responsive.base.yGap,
      [`md:-my-${responsive.md?.yGap}`]: responsive.md?.yGap,
      [`lg:-my-${responsive['2xl']?.yGap}`]: responsive['2xl']?.yGap,
    }

  )
  return (
    <div 
      className={rootClassName}
      {...(props.blok && storyblokEditable(props.blok))}
    >
      {childrenWithClasses}
    </div>
  )
}

export default Grid;