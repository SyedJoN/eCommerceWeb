import React from 'react'
import Container from './Container/Container'

function HighlightedCollections() {
  return (
    <Container>
    <div className="gap-6 grid mx-auto my-10">
    <div className="group w-full relative cursor-pointer">
      
      <img className="w-full h-40 md:h-64 object-cover rounded-lg" src="slider1.jpg" alt="" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black transition-all duration-300 group-hover:bg-black/60 rounded-lg"></div>
   <h3 className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl lg:text-6xl text-center text-white font-bold">Best Sellers</h3>
    </div>
    <div className="grid grid-cols-2 gap-6">
    <div className="group w-full relative cursor-pointer">
      
      <img className="w-full object-cover h-64 md:h-auto rounded-lg" src="slider2.jpg" alt="" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black transition-all duration-300 group-hover:bg-black/60 rounded-lg"></div>
   <h3 className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl lg:text-6xl text-center text-white font-bold md:px-[50px]">Customer Favourites</h3>
    </div>
    <div className="group w-full relative cursor-pointer">
      
      <img className="w-full object-cover h-64 md:h-auto rounded-lg" src="slider3.jpg" alt="" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black transition-all duration-300 group-hover:bg-black/60 rounded-lg"></div>
   <h3 className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl lg:text-6xl text-center text-white font-bold px-[100px]">Style Essentials</h3>
    </div>
    </div>
  </div>
  </Container>
  )
}

export default HighlightedCollections