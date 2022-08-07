import ScrollBar from './ScrollBar';
import Carousel from './Carousel';
import { CarouselProvider  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ReactNode, Component } from 'react';

interface Props {
  children: ReactNode[] | Component[] | any[]
}

const CustomCarouselProvider: React.FC<Props> = ({
  children,
}) => {
 return (
  <CarouselProvider
    naturalSlideWidth={434}
    naturalSlideHeight={742}
    totalSlides={children.length}
    visibleSlides={3.5}
  >
    <Carousel items={children} />
    <ScrollBar />
  </CarouselProvider>
 )
}

export default CustomCarouselProvider;
