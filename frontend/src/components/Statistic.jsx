import React from 'react'

const Statistic = () => {
  return (
  <section className=" h-screen text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
      <div className="w-full sm:p-4 px-4 mb-6">
        <h1 className="title-font font-medium text-xl mb-2 text-black">Trusted by Thousands of Happy Shoppers</h1>
        <div className="leading-relaxed">We've been crafting style-forward fashion since 2018. 
Every piece is quality-checked, trend-conscious, and 
made to make you feel confident from day one.</div>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-black">12K+</h2>
        <p className="leading-relaxed">Happy Customers</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-black">4.8K</h2>
        <p className="leading-relaxed">5-Star Reviews</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-black">200+</h2>
        <p className="leading-relaxed">Styles Available</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-black">98%</h2>
        <p className="leading-relaxed">Satisfaction Rate</p>
      </div>
    </div>
    <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
      <img className="object-cover object-center w-full h-full" src="/statistic.jpg" alt="stats"/>
    </div>
  </div>
</section>
  )
}

export default Statistic