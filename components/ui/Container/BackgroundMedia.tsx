import CustomImage from '@/components/ui/Image';
import Image from 'next/image';
import type { storyBlokImage } from '@/types/storyBlok';


interface BackgroundMediaProps {
  image: storyBlokImage
  backgroundOverlay?: number
  bgColor: string
  priority?: boolean
}

const BackgroundMedia: React.FC<BackgroundMediaProps> = ({
  image,
  backgroundOverlay = 0,
  bgColor,
  priority
}) => {
  return (
    <div className="absolute inset-0">
      <div className="relative w-full h-full">
        <div 
          className={`${bgColor} absolute inset-0 z-10`}
          style={{ opacity: (backgroundOverlay > 1) ? 1 : backgroundOverlay }}
        />

        <CustomImage
          image={image}
          layout="fill"
          preload={priority}
        />
      </div>
    </div>
  ) 
};

export default BackgroundMedia;