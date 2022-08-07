import { useContext, useEffect, useState } from 'react';
import { Slider, Slide, CarouselContext } from 'pure-react-carousel';

interface Props {
  items: any
}

const Carousel: React.FC<Props> = ({
  items,
}) => {
  const carouselContext = useContext(CarouselContext);
  const [ currentSlide, setCurrentSlide ] = useState(carouselContext.state.currentSlide);

  const onChange = () => {
    setCurrentSlide(carouselContext.state.currentSlide);
  }

  useEffect(() => {
    carouselContext.subscribe(onChange);

    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  useEffect(() => {
    // console.log(currentSlide)
  }, [currentSlide])

  return (
    <>
      <Slider className="-mx-2.5">
        {
          items.map((slide: any, i: number) => {
            return (
              <Slide 
                index={i} 
                key={i}
              ><div className="px-2.5">{slide}</div></Slide>
            )
          })
        }
      </Slider>
    </>
  )
}

export default Carousel;