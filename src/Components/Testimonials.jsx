import React from 'react'
import Container from './Container/Container'

function Testimonials() {
  return (
    <Container>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
    <div className="flex flex-col justify-center w-full h-full bg-white text-black px-8 py-12 rounded-lg shadow-lg">
    <div className="flex items-center self-start">

     <i className="fa-solid fa-star text-yellow-400"></i>
     <i className="fa-solid fa-star text-yellow-400"></i>
     <i className="fa-solid fa-star text-yellow-400"></i>
     <i className="fa-solid fa-star text-yellow-400"></i>
     <i className="fa-solid fa-star text-yellow-400"></i>
       <p className="text-black text-[15px] leading-3 font-bold ml-1">(5.0)</p>


     </div>
     <h1 className="font-bold py-2 italic">Loved the quality!</h1>
     <p className="py-4">"I recently purchased a few items from this brand and I am absolutely in love! The quality of the fabrics is fantastic, and everything feels so comfortable to wear."</p>
     <div className="flex">
       <img src="" alt="" />
       <div className="author">Sarah L.</div>
     </div>
    </div>
    <div className="flex flex-col justify-center w-full h-full bg-white text-black px-8 py-12 rounded-lg shadow-lg">
    <div className="flex items-center self-start">

      
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-regular fa-star text-yellow-400"></i>
       <p className="text-black text-[15px] leading-3 font-bold ml-1">(4.9)</p>

  
     </div>
     <h1 className="font-bold py-2 italic">Good quality!</h1>
     <p className="py-4">"I bought the casual cotton T-shirt last month, and it has become one of my favorites. The fabric is incredibly soft and breathable, perfect for summer days."</p>
     <div className="flex">
       <img src="" alt="" />
       <div className="author">Daniel Pattrick.</div>
     </div>
    </div>
    <div className="flex flex-col justify-center w-full h-full bg-white text-black px-8 py-12 rounded-lg shadow-lg">
    <div className="flex items-center self-start">


 
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-solid fa-star text-yellow-400"></i>
       <i className="fa-solid fa-star text-yellow-400"></i>
       <p className="text-black text-[15px] leading-3 font-bold ml-1">(5.0)</p>
   
     </div>
     <h1 className="font-bold py-2 italic">Classic Denim Jacket</h1>
     <p className="py-4">"I've been searching for the perfect denim jacket, and this one checks all the boxes. The fit is slightly relaxed but still flattering, and the light wash gives it a vintage vibe."</p>
     <div className="flex">
       <img src="" alt="" />
       <div className="author">Michael Carter.</div>
     </div>
    </div>
 </div>
 </Container>
  )
}

export default Testimonials