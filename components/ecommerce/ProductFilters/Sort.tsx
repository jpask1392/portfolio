import DynamicIcon from '@/components/icons/DynamicIcon';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

interface Props {
  setSortKey: any
  sortKey: any
}

export const Sort: React.FC<Props> = ({
  setSortKey,
  sortKey
}) => {
  // use available keys from shopify's api
  const sortKeys = [
    { 
      key: 'BEST_SELLING',
      name: 'Best Selling',
      reverse: false,
    },
    { 
      key: 'PRICE',
      name: 'Price (Low to high)',
      reverse: false,
    },
    {
      key: 'PRICE',
      name: 'Price (High to low)',
      reverse: true,
    },
    // { 
    //   key: 'TITLE',
    //   name: 'Title (A-Z)',
    //   reverse: false,
    // },
    // { 
    //   key: 'TITLE',
    //   name: 'Title (Z-A)',
    //   reverse: true,
    // },
  ];

  return (
    <div>
      <ul>
        {
          sortKeys.map((item, i) => (
            <li
              key={i}
              onClick={() => setSortKey({ key: item.key, reverse: item.reverse })}
              className={cn("hover:underline text-left mb-5 cursor-pointer", {
                "underline": sortKey.key === item.key && sortKey.reverse === item.reverse
              })}
            >
              <span className="h7 text-secondary">{item.name}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
