import cn from 'classnames';
import Container from "@/components/ui/Container";
import CustomImage from '@/components/ui/Image';

interface Props {
  className?: string
  collection: any
}

const Hero: React.FC<Props> = ({ 
  className,
  collection,
 }) => {
  const heroClassNames = cn(className, [
    "hero lg:pt-16",
  ], {});

  return (
    <Container el="header">
      <div className={heroClassNames}>
        <div className="flex flex-wrap -mx-10">
          <div className="w-full lg:w-1/2 lg:px-10">
            <CustomImage 
              image={collection.image}
              preload
            />
          </div>

          <div className="w-full lg:w-1/2 px-10 items-center flex mt-7 lg:mt-0">
            <div 
              className="collection-desc" 
              dangerouslySetInnerHTML={{__html: collection.descriptionHtml}}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Hero;
