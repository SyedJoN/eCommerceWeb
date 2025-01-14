import React, { useState, useEffect } from "react";
import { blogList } from "../config/data";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCurrentUser, userProfile } from "../store/authSlice";
import {
  Banner,
  Container,
  NewArrival,
  CategoriesGrid,
  HighlightedCollections,
} from "../Components";
import {
  fetchProducts,
  getProductById,
  fetchCategories,
  getProductsByCategory,
} from "../store/productSlice";
import parse from "html-react-parser";
import { Search } from "lucide-react";
import Testimonials from "../Components/Testimonials";

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
    dispatch(getProductsByCategory({ qt: "page=1&limit=4", id })).then(
      (status) => {
        if (status.meta.requestStatus === "fulfilled")
          navigate(`/${cat}`, { state: { id } });
      }
    );
  };
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
            <h1 className="md:text-5xl font-bold text-white text-4xl">
              Welcome to MJ Store
            </h1>
            <p className="text-lg font-semibold text-white py-2">
              Get the best quality products at the best prices
            </p>
            <div className="relative search w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search your favourite products..."
                className="inline-block w-full  bg-white text-black font-semibold text-lg px-4 py-3 rounded-md mt-4"
              />
              <Search
                size={24}
                className="absolute bottom-[15px] right-4 text-indigo-600 cursor-pointer focus:outline-none"
              />
            </div>
          </div>
        </Container>
      </div>
      {/* <Slideshow /> */}

      <div className="w-full">
        <div className="flex flex-wrap justify-center">
          <section className="bg-[#f4f4f4] w-full py-16">
            <h1 className="w-full text-center text-3xl md:text-4xl font-bold text-gray-800">
              New Arrivals
              <div className="w-24 mx-auto border-b-2 border-indigo-600 mt-2"></div>
            </h1>
            <NewArrival products={products} buttonHandler={buttonHandler} />
          </section>

          <Banner />
          <section className="bg-[#f4f4f4] w-full py-16">
            <h1 className="w-full text-center text-3xl md:text-4xl font-bold text-gray-800">
              Categories
              <div className="w-24 mx-auto border-b-2 border-indigo-600 mt-2"></div>
            </h1>

            <CategoriesGrid
              categories={categories}
              buttonCategoryHandler={buttonCategoryHandler}
            />
          </section>
          <section className="w-full py-0 lg:py-16">
            <HighlightedCollections />
          </section>
          <section className="bg-[#f4f4f4] w-full py-16">
          <h1 className="w-full text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            Customer Reviews
            <div className="w-24 mx-auto border-b-2 border-indigo-600 mt-2"></div>
          </h1>
          <Testimonials />
          </section>
        </div>
      </div>
    </div>
  );
}
export default Home;
