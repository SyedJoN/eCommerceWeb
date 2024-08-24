import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import RTE from './RTE'
import { Input, Button, Select } from "./index";
import { fetchCountries, getAddresses } from "../store/authSlice";
import { createProduct, updateProduct, fetchCategories, removeSubImages, getProductById, removeItemFromCart } from "../store/productSlice";
import { applyCoupon } from "../store/productSlice";
import { useLocation } from 'react-router-dom';


function CheckoutForm() {
  const location = useLocation();
  const itemCount = location.state?.itemCount;
  const dispatch = useDispatch();
  const userCart = useSelector(state => state.product.userCart);
  const [coupon, setCoupon] = useState("");
  const countries = useSelector(state => state.auth.countries);
  const userAddresses = useSelector(state => state.auth.addresses);
  const [openItem, setOpenItem] = useState(0);
  const products = useSelector(state => state.product.specificProduct);


  const [errorMsg, setErrorMsg] = useState(null)
  const [msg, setMsg] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null);
  const userStatus = useSelector(state => state.auth.user);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [checkedAddress, setCheckedAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  })

  const accordionItems = [
    { title: "Cash on delivery", content: "Pay with cash at your doorstep." },
    { title: "RazorPay", content: "Pay with RazorPay by adding card details." },
    { title: "Paypal", content: "Pay with Paypal by adding card details." }
  ];

  const toggleAccordionRadio = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  useEffect(() => {
    dispatch(fetchCountries())
    console.log(userCart)
  }, []);


  useEffect(() => {
    dispatch(getAddresses())

  }, [userStatus])

  const handleCheckboxChange = (address, index) => {
    setSelectedCheckbox(index);
    setCheckedAddress({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    })

  };


  const couponBtnHandler = () => {
    dispatch(applyCoupon({ couponCode: coupon })).then((status) => {
      if (status.meta.requestStatus === 'rejected') {

        setErrorMsg(status.payload.message)
        setMsg('')
      } else {
        setMsg('Applied successfully!')
        setErrorMsg('')
      }


    })
  }
  const removeItem = (productId) => {
    dispatch(removeItemFromCart(productId))
  }









  const { register, handleSubmit, watch, setValue, control, getValues } = useForm();
  useEffect(() => {

    if (userStatus) {

      const { firstName, lastName } = userStatus;
      setValue('firstName', firstName || '');
      setValue('lastName', lastName || '');
      setValue('addressLine1', checkedAddress.addressLine1)
      setValue('addressLine2', checkedAddress.addressLine2)
      setValue('city', checkedAddress.city)
      setValue('state', checkedAddress.state)
      setValue('pinCode', checkedAddress.pincode)
    }
  }, [checkedAddress])






  const submit = async (data) => {

    console.log(data.addressLine1)

  };


  return (

    <div>
      <div className='ml-5 w-full mt-5 flex border border-green-500 bg-green-50 px-3 py-3 text-sm rounded-sm'><svg className="mr-2 rounded-full bg-green-500" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path d="M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"></path>
      </svg> "{itemCount}x {products.name}" has been added to your cart.<span className='ml-auto underline text-gray-600 hover:bg-gray-400 hover:text-black'>CONTINUE SHOPPING</span></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">

        <div>

          <h1 className="text-lg font-bold m-2">Billing Details</h1>
          <form onSubmit={handleSubmit(submit)} id="checkoutForm" className="flex flex-wrap">
            <div className="w-full px-2 mb-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    label="First Name "
                    placeholder=""
                    required="true"

                    {...register("firstName", { required: true })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    label="Last Name "
                    placeholder=""
                    required="true"

                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>

              <Input
                label="Company Name (optional) "
                placeholder=""
                className="mb-4"
                {...register("company", { required: false })}
              />

              <div className="flex flex-wrap -mx-2  mt-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    label="Address Line 1 "
                    placeholder=""
                    required="true"
                    onChange={(e) => setCheckedAddress({ ...checkedAddress, addressLine1: e.target.value })}
                    {...register("addressLine1", { required: true })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <Input
                    label="Address Line 2 "
                    placeholder=""
                    required="true"
                    {...register("addressLine2", { required: true })}
                  />
                </div>
              </div>

              <label htmlFor="country">Country </label>
              <span
                className='text-red-600 text-xl'>*</span>
              <select id="country" className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4">
                <option>Pakistan</option>
                {countries?.map((country) => (
                  <option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <Input
                    label="City "
                    placeholder=""
                    required="true"
                    {...register("city", { required: true })}
                  />
                </div>
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <Input
                    label="State / Province "
                    required="true"
                    placeholder=""

                    {...register("state", { required: true })}
                  />
                </div>
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <Input
                    label="ZIP / Postal Code "
                    required="true"
                    placeholder=""
                    {...register("pinCode", { required: true })}
                  />
                </div>
              </div>


              {userStatus && (
                <div className="w-full max-w-2xl">
                  <h3 className="m-2 flex justify-center text-lg">OR</h3>
                  {userAddresses?.map((address, index) => (
                    <div key={index} className="mb-2">
                      <button
                        type="button" // Specify button type as "button"
                        className="w-full flex justify-between p-2 bg-gray-200 rounded-md focus:outline-none "
                      >
                        <div className="flex flex-wrap items-center">
                          <span className="text-lg font-medium">Address {index + 1}</span>
                        </div>
                        <div className="flex flex-wrap items-center">

                          <input className="outline-none cursor-pointer" type="checkbox"
                            checked={selectedCheckbox === index}
                            onChange={() => handleCheckboxChange(address, index)} />
                        </div>

                      </button>
                      <div
                        className={`overflow-hidden transition-max-height duration-300 ${activeIndex === index ? 'max-h-[550px]' : 'max-h-0'
                          }`}
                      >
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Address Line 1</label>

                            <div className="mt-2">
                              <p>{address.addressLine1}</p>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Address Line 2</label>
                            <div className="mt-2">
                              <p>{address.addressLine2}</p>

                            </div>
                          </div>

                          {/* <div className="sm:col-span-4">
                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                     <div className="mt-2">
                         <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                     </div>
                 </div> */}

                          <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                            <div className="mt-2">
                              <p className="">

                                {address.country}
                              </p>
                            </div>
                          </div>




                          <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                            <div className="mt-2">
                              <p>{address.city}</p>
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                            <div className="mt-2">
                              <p>{address.state}</p>
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                            <p>{address.pincode}</p>

                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <label htmlFor="notes">Order notes (optional)</label>
                <textarea className="resize-none px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full mb-4 " name="" id="" cols="20" rows="8"></textarea>

              </div>
            </div>
          </form>
        </div>

        <div>
          <div className="bg-gray-100 px-5 py-6 md:px-8 mt-16">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
                {userCart?.data.items.map((item) => (
                  <li key={item.product._id} className="flex items-stretch justify-between space-x-5 py-7">
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover"
                          src={item.product.mainImage.url}
                          alt={item.product.name}
                        />
                      </div>
                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">

                          <p className="text-sm font-bold">{item.product.name}</p>

                        </div>
                        <p className="text-xs font-medium ">x {item.quantity}</p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">
                        Rs. {item.product.price}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product._id)}
                        className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        <span className="sr-only">Remove</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}

              </ul>
            </div>
            <hr className="mt-6 border-gray-200" />
            <div className="mt-6">
              <p className={`${errorMsg ? 'text-red-600' : 'text-green-600'}`}>{msg || errorMsg}</p>
              <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                <div className="flex-grow">
                  <input
                    value={coupon} onChange={(e) => setCoupon(e.target.value)}
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter coupon code"
                  />
                </div>
                <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                  <button
                    onClick={couponBtnHandler}
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center justify-between text-gray-600">
                <p className="text-sm font-medium">Sub total</p>
                <p className="text-sm font-medium">Rs. {userCart?.data.cartTotal}</p>
              </li>
              <li className="flex items-center justify-between text-gray-900">
                <p className="text-sm font-medium ">Total</p>
                <p className="text-sm font-bold ">Rs. {userCart?.data.cartTotal}</p>
              </li>
            </ul>
            <hr className="mt-6 border-gray-200" />
            <ul className="mt-6">
              {accordionItems.map((item, index) => (
                <li className="my-2" key={index}>
                  <input
                    className='w-3 h-3'
                    type="radio"
                    name="paymentMethod"
                    id={`accordionItem${index}`}
                    onClick={() => toggleAccordionRadio(index)}
                    defaultChecked={index === 0}
                  />
                  <label htmlFor={`accordionItem${index}`} className="mx-2">{item.title}</label>
                  {openItem === index && (
                    <div className="accordion-content">
                      <div className="arrow-up"></div>
                      <div className="content-inner" style={{ backgroundColor: 'white', padding: '10px', marginTop: '10px' }}>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>



          <Button
            form='checkoutForm'
            type="submit"
            bgColor='bg-black'
            className="w-full mt-6 hover:bg-black/80"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );

}
export default CheckoutForm;
