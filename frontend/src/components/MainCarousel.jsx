'use client'
import React from 'react'
import Image from 'next/image';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const MainCarousel = () => {
  return (
    <div className='m-8'>
<Carousel responsive={responsive} >
 <div><Image src="/1 (1).png" alt="Image 1" width={700} height={600}/></div> 
  <div><Image src="/1 (2).png" alt="Image 2" width={700} height={600}/></div>
  <div><Image src="/1 (3).png" alt="Image 3" width={700} height={600}/></div>
  <div><Image src="/1 (4).png" alt="Image 4" width={700} height={600}/></div>
</Carousel>
    </div>
  )
}

export default MainCarousel