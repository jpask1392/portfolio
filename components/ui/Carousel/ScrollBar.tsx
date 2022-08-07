import { CarouselContext } from 'pure-react-carousel';
import { useContext, useEffect, useState } from 'react';

const ScrollBar = () => {
  const carouselContext = useContext(CarouselContext);

  const onDrag = () => {
    console.log(carouselContext.state)
  }

  useEffect(() => {
    carouselContext.subscribe(onDrag);

    return () => carouselContext.unsubscribe(onDrag);

  }, [carouselContext]);

  return (
    <div className="w-full h-0.5 bg-gray-200 mt-14 relative rounded-full">
      <div className="absolute inset-y-0 bg-black w-1/4 rounded-full"/>
    </div>
  )
}

export default ScrollBar;
