import React from 'react'
import Container from './Container/Container'

function NewArrival({products, buttonHandler}) {
  return (
    <Container>
    <div className="grid w-full items-center rounded-lg space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
    {products?.map((product) => (
      <div
      onClick={() => buttonHandler(product._id)}

        key={product._id}
        className="relative aspect-[16/9] w-auto md:aspect-auto md:h-full cursor-pointer "
      >
          <div className="relative group z-10">
          <img
            src={product.mainImage.url}
            alt={product.name}
            className="h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-all"></div>
        </div>
       
        <div className="relative text-left py-3">
          <h1 className="text-lg font-semibold text-black hover:underline">
            {product.name}
          </h1>
          <div className="mt-1 text-lg text-black font-bold">
            Rs. {product.price}
          </div>
       

          <button
            className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-indigo-600 border-indigo-600 border py-2 px-3 rounded-lg hover:bg-indigo-600 hover:text-white"
            onClick={() => buttonHandler(product._id)}
          >
            Shop Now &rarr;
          </button>
        </div>
      </div>
    ))}
  </div>
  </Container>
  )
}

export default NewArrival