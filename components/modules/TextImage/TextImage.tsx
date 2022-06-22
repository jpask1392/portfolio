import { ReactNode, Component } from 'react';

import CustomImage from '@/components/ui/Image';
import Logo from '@/components/ui/Logo';
import type { storyBlokImage } from '@/types/storyBlok';

import cn from 'classnames';

interface Props {
  className?: string
  children?: ReactNode | Component | any
  hasLogo?: boolean
  image: storyBlokImage
}

const ImmortalTools: React.FC<Props> = ({ 
  children,
  className,
  hasLogo = true,
  image,
}) => {
  const moduleClassNames = cn(className, 'bg-white text-black flex flex-wrap', {

  })
  return (
    <div className={moduleClassNames}>
      <div className="w-full lg:w-5/12 2xl:w-6/12 flex-shrink-0 bg-gray-300 lg:order-2">
        <div className="aspect-[100/68] md:aspect-[100/31] lg:aspect-[70/100] xl:aspect-square  bg-red-100">
          <CustomImage 
            image={image} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
      </div>

      <div className="p-12 xl:p-16 2xl:p-28 flex-1 md:flex lg:block md:space-x-16 lg:space-x-0">
        {
          hasLogo && (
            <div className="text-black mb-12 md:mb-0">
              <Logo className="fill-current h-4 xl:h-6 2xl:h-8"/>
            </div>
          )
        }
        <div className="flex items-center md:h-full">
          <div className="">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ImmortalTools;
