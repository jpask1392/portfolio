import DynamicIcon from '@/components/icons/DynamicIcon';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

interface Props {
  setSortKey: any
  sortKey: any
}

export const SortButton: React.FC<Props> = ({
  setSortKey,
  sortKey
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null >(null);

  // use available keys from shopifys api
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
    { 
      key: 'TITLE',
      name: 'Title (A-Z)',
      reverse: false,
    },
    { 
      key: 'TITLE',
      name: 'Title (Z-A)',
      reverse: true,
    },
  ];

  const handleClickOffElement = (e: any) => {
    if (!buttonRef.current?.contains(e.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOffElement)

    return () => {
      document.removeEventListener('click', handleClickOffElement)
    }
  }, [])

  return (
    <button 
      className="relative" 
      onClick={() => setOpen(!open)}
      ref={buttonRef} 
    >
      <span className="flex items-center">
        <span className="mr-2">Sort By</span>
        <DynamicIcon type="chevronDown"/>
      </span>

      {
        open ? (
          <div className="absolute top-full border border-gray2 mt-4 z-20 bg-black right-0">
            <ul className="text-sm no-gap">
              {
                sortKeys.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => setSortKey({ key: item.key, reverse: item.reverse })}
                    className={cn("hover:bg-gray-100 hover:text-black px-3 py-2 whitespace-nowrap text-left", {
                      "bg-gray2": sortKey.key === item.key && sortKey.reverse === item.reverse
                    })}
                  >
                    {item.name}
                  </li>
                ))
              }
            </ul>
          </div>
        ) : null
      }
    </button>
  )
}
