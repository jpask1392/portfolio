import { ReactNode, Component } from 'react';

import CollectionsGridTile from './CollectionsGridTile';

import cn from 'classnames';

interface Props {
  className?: string
  children?: ReactNode | Component | any
  collections: any
}

const CollectionsGrid: React.FC<Props> = ({ 
  className,
  collections,
}) => {
  return (
    <div className={className}>
      <div className="grid gap-6 xl:gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {
        collections.map((data: any, i: number) => {
            return (
              <div key={i} className={cn("h-[28rem] xl:h-[32rem] 2xl:h-[44rem]", {
                "md:col-span-2" : i === 0,
                "lg:col-span-2 xl:col-span-1" :  i !== 0 && i % 7 === 0,
                "xl:col-span-2" : i !== 0 && i % 6 === 0,
              })}>
                <CollectionsGridTile key={i} collection={data} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CollectionsGrid;
