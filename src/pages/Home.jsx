import React, { useState, useEffect } from "react";
import { blogList } from "../config/data";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCurrentUser, userProfile } from "../store/authSlice";
import { Banner, Container, Slideshow } from "../Components";
import {
  fetchProducts,
  getProductById,
  fetchCategories,
  getProductsByCategory,
} from "../store/productSlice";
import parse from "html-react-parser";
import { Search } from "lucide-react";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const buttonHandler = (id) => {
    dispatch(getProductById(id)).then((status) => {
      if (status.meta.requestStatus === "fulfilled") navigate(`/product/${id}`);
    });
  };
const buttonCategoryHandler = (cat, id) => {
  dispatch(getProductsByCategory({qt: 'page=1&limit=4', id})).then((status) => {
    if (status.meta.requestStatus === "fulfilled")       navigate(`/${cat}`, { state: { id } });;
  });
}
  useEffect(() => {
    if (Array.isArray(products)) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchProducts("limit=4"));

    dispatch(fetchCategories()).then((status) => {
      console.log(status);
    });
    dispatch(userProfile());
    console.log(categories, "categories");
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full">
      <div className="hero-section w-full overlay">
    <Container>
    <div className="hero-content">
      <h1 className="md:text-5xl font-bold text-white text-4xl">Welcome to MJ Store</h1>
      <p className="text-lg font-semibold text-white py-2">Get the best quality products at the best prices</p>
      <div className="relative search w-full max-w-xl mx-auto">
      <input type="text" placeholder="Search your favourite products..." className="inline-block w-full  bg-white text-black font-semibold text-lg px-4 py-3 rounded-md mt-4"/>
      <Search size={24} className="absolute bottom-[15px] right-4 text-indigo-600 cursor-pointer focus:outline-none"/>

      </div>
    </div>
    </Container>
      </div>
      {/* <Slideshow /> */}
<Container>
      <div className="w-full py-12">
        <div className="flex flex-wrap justify-center">
          <h1 className="w-full text-center text-4xl font-bold my-10 text-gray-800">
            New Arrivals
            <div className="w-24 mx-auto border-b-2 border-indigo-600 mt-2"></div>
          </h1>
          <div className="grid w-full items-center space-y-4 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {products?.map((product) => (
              <div
                key={product._id}
                className="relative aspect-[16/9] w-auto rounded-md md:aspect-auto md:h-[400px]"
              >
                <img
                  src={product.mainImage.url}
                  alt={product.name}
                  className="z-0 h-full w-full rounded-md object-cover"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-left">
                  <h1 className="text-lg font-semibold text-white">
                    {product.name}
                  </h1>
                  <div className="mt-2 text-sm text-gray-300">
                    {parse(product.description)}
                  </div>

                  <button
                    className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
                    onClick={() => buttonHandler(product._id)}
                  >
                    Shop Now &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Banner />
          <h1 className="w-full text-center text-4xl font-bold text-gray-800 my-10">
            Categories
            <div className="w-24 mx-auto border-b-2 border-indigo-600 mt-2"></div>
          </h1>
          <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {categories?.map((cat) => (
              <div
                key={cat._id}
                className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
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
                  className="z-0 h-full w-full rounded-md object-cover"
                />

                <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
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
          
        </div>
      </div>
    </Container>
    </div>
  );
}
export default Home;
