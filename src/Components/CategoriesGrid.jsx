import React from 'react'

function CategoriesGrid({categories, buttonCategoryHandler}) {
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 my-10 px-4">
    {categories?.map((cat) => (
      <div
        key={cat._id}
        className="relative aspect-[16/9] w-auto md:aspect-auto md:h-[400px]"
      >
        <img
          src={
            cat.name === "Hoodies"
              ? "/categories/hoodies.jpeg"
              : cat.name === "Bottom"
              ? "/categories/bottom.jpeg"
              : cat.name === "Tees"
              ? "/categories/tees.jpg"
              : cat.name === "Shirts"
              ? "/categories/shirts.jpg"
              : ""
          }
          alt={cat.name}
          className="z-0 h-full w-full rounded-lg object-cover"
        />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-lg font-semibold text-white">
            {cat.name}
          </h1>

          
            <button
              className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
              onClick={() => buttonCategoryHandler(cat.name, cat._id)}
            >
              Shop Now &rarr;
            </button>
          
        </div>
      </div>
    ))}
  </div>
  )
}

export default CategoriesGrid