import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { getProductById, getProductsByCategory } from "../store/productSlice";
import { Container, DisclosureComponent } from "../Components";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function CategoryProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const catProducts = useSelector((state) => state.product.catProducts);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("new");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const { id } = location.state || {};
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const buttonHandler = (id) => {
    dispatch(getProductById(id)).then((status) => {
      if (status.meta.requestStatus === "fulfilled") navigate(`/product/${id}`);
    });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortProducts = (products, sortOrder) => {
    switch (sortOrder) {
      case "new":
        return [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "low":
        return [...products].sort((a, b) => a.price - b.price);
      case "high":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };
  useEffect(() => {
    dispatch(getProductsByCategory({ qt: "page=1&limit=4", id }));
  }, []);

  const filterProductByPrice = (products, minPrice, maxPrice) => {
    return [...products].filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  };

  useEffect(() => {
    if (catProducts && catProducts.length > 0) {
      const filteredProducts = filterProductByPrice(
        catProducts,
        minPrice,
        maxPrice
      );
      const sorted = sortProducts(filteredProducts, sortOrder);
      setSortedProducts(sorted);
      if (filteredProducts.length === 0) {
        setErrorMsg("Sorry! No such product exists per the filter");
      } else {
        setErrorMsg("");
      }
    } else {
      setErrorMsg("No products found");
    }
  }, [catProducts, sortOrder, minPrice, maxPrice]);

  return (
    <Container>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-6 py-4 sm:px-6">
                        <div className="flex items-start justify-between pb-4">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Filter
                          </Dialog.Title>

                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6 focus:outline-none"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <hr className="border-t border-gray-300" />
                        <div className="py-4">
                          <DisclosureComponent
                            title="Price"
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                          />
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex justify-between options pt-5 w-full px-2">
        <div className="filter cursor-pointer">
          <div
            onClick={() => setOpen(true)}
            className="border border-gray-300 rounded-md py-2 px-5"
          >
            <i className="fa-sharp fa-solid fa-filter text-gray-500"></i>
            <span className="ml-2">Filter</span>
          </div>
        </div>
        <div className="sort">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            name="sort"
            id="sort"
            className="border border-gray-300 rounded-md cursor-pointer"
          >
            <option value="new">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="catProducts">
        {errorMsg ? (
          <>
            {" "}
            <div className="italic text-3xl pt-10 text-center">
              {errorMsg}...
            </div>
            <div className="flex justify-center">
              <i className="fa-regular fa-face-frown text-7xl py-3"></i>
            </div>
          </>
        ) : (
          <div className="grid w-full items-center rounded-md space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {sortedProducts?.map((product) => (
              <div
                onClick={() => buttonHandler(product._id)}
                key={product._id}
                className="relative aspect-[16/9] w-auto rounded-md md:aspect-auto md:h-full cursor-pointer "
              >
                <div className="relative group z-10">
                  <img
                    src={product.mainImage.url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-all"></div>
                </div>

                <div className="relative text-left py-3">
                  <h1 className="text-lg font-semibold text-black">
                    {product.name}
                  </h1>
                  <div className="mt-2 text-md text-black font-bold">
                    Rs. {product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default CategoryProducts;
