import React from 'react'

const HeroSection = () => {
  return (
  <section className="text-gray-600 body-font h-screen">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Dress Bold. Live Bright.
Style That Speaks Before You Do.
        <br className="hidden lg:inline-blockreadymade gluten"/>
      </h1>
      <p className="mb-8 leading-relaxed">Discover handpicked fashion for every mood, season, and story. 
From everyday essentials to statement pieces — we bring you 
quality clothing that fits your life and your budget.</p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg">Shop Now</button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="/herosection.jpg"/>
    </div>
  </div>
</section> 
  )
}

export default HeroSection