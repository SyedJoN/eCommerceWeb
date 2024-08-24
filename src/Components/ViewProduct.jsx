import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Flickity from 'react-flickity-component';
import ZoomedImage from './Zoom/ZoomedImage';
import parse from 'html-react-parser'
import { addToCart, getCoupons } from '../store/productSlice';
import { getUserCart } from '../store/productSlice';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { applyCoupon, clearCart, getProductById, removeItemFromCart } from '../store/productSlice';
import Breadcrumbs from './Breadcrumbs';

function ViewProduct() {
    const userCart = useSelector(state => state.product.userCart);
    const [errorMsg, setErrorMsg] = useState(null)
    const [msg, setMsg] = useState(null)
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.specificProduct);
    const navigate = useNavigate();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [itemCount, setItemCount] = useState(1)
    const coupons = useSelector(state => state.product.coupons);
    const flickityRef = useRef(null);
    const [open, setOpen] = useState(false)
    const [coupon, setCoupon] = useState("");

    const handleClearCart = () => {
        dispatch(clearCart());
  
    }

    useEffect(() => {
        dispatch(getCoupons())
    }, [])
    
    const checkoutHandler = () => {

        navigate('/checkout')

    };
    const removeItem = (productId) => {
        dispatch(removeItemFromCart(productId))
    }
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
    const cartHandler = (productId, quantity) => {
        dispatch(addToCart({ productId, quantity })).then(() => {
            setOpen((prev) => !prev)
            
        }

        );
    };
    const buyHandler = (productId, quantity) => {
        dispatch(addToCart({ productId, quantity })).then(() => {
            dispatch(getUserCart());
            navigate('/checkout', { state: { itemCount } });
        });
    };


    const flickityOptionsMain = {
        initialIndex: selectedImageIndex,
        pageDots: false,
        prevNextButtons: false,
        wrapAround: false,
        draggable: true,
        dragThreshold: 3,
        cellAlign: 'center'

    };
    const setupFlickity = (imgIndex) => {
        if (flickityRef.current) {
            flickityRef.current.select(imgIndex);
            setSelectedImageIndex(imgIndex);

            flickityRef.current.on('change', () => {
                setSelectedImageIndex(flickityRef.current.selectedIndex);
            });
        }
    };


    const flickityOptionsSub = {
        initialIndex: selectedImageIndex,
        pageDots: false,
        prevNextButtons: false,
        wrapAround: false,
        draggable: false,

    };

    useEffect(() => {
        dispatch(getUserCart());
    })
    const copyCodeToClipboard = (code) => {
        const el = document.createElement('textarea'); // Create a textarea element
        el.value = code; // Set the value to be copied
        el.setAttribute('readonly', ''); // Make it read-only
        el.style.position = 'absolute';
        el.style.left = '-9999px'; // Move outside the visible area

        document.body.appendChild(el); // Append the textarea to the document
        el.select(); // Select the text inside the textarea
        document.execCommand('copy'); // Copy the selected text to the clipboard
        document.body.removeChild(el); // Remove the textarea from the document
    };

    const calDayLeft = (expiryDate) => {
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const expiryTimestamp = new Date(expiryDate).getTime();
        const currentTimestamp = Date.now();
        const difference = expiryTimestamp - currentTimestamp;
        const daysLeft = Math.ceil(difference / millisecondsPerDay);

        return daysLeft;
    };

    return product ? (




        <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
<Breadcrumbs/>
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
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {userCart?.data.items.map((item) => (
                                                                <li key={item.product._id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={item.product.mainImage.url}
                                                                            alt={item.product.name}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <button onClick={() => itemHandler(item.product._id)}>{item.product.name}</button>
                                                                                </h3>
                                                                                <p className="ml-4">Rs. {item.product.price}</p>
                                                                            </div>
                                                                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                                                        </div>
                                                                        <div className="flex flex-1 items-center justify-between text-sm">
                                                                            <p className="text-gray-500">Qty {item.quantity}</p>

                                                                            <div className="flex">
                                                                                <button
                                                                                    onClick={() => removeItem(item.product._id)}
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}


                                                        </ul>

                                                    </div>

                                                </div>

                                            </div>
                                            {userCart?.data.items.length > 0 && (
                                                <div className='flex flex-wrap items-end justify-end mx-5 my-2'>
                                                    <button onClick={handleClearCart} className='text-sm mt-36 text-indigo-600 hover:text-indigo-500'>Clear all</button>

                                                </div>
                                            )}
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>Rs. {userCart?.data.cartTotal}</p>
                                                </div>
                                                <p className={`${errorMsg ? 'text-red-600' : 'text-green-600'}`}>{msg || errorMsg}</p>
                                                <div className='flex mt-3'>
                                                    <input className='w-72 rounded-md text-3xl outline-none border border-gray-300' type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                                    <button onClick={couponBtnHandler} className='bg-gray-200 border border-gray-400 rounded md ml-2' htmlFor="">APPLY COUPON</button>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">

                                                    <button
                                                        onClick={()=> checkoutHandler}
                                                        className="w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Checkout
                                                    </button>

                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
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
            
              

            <div className="pt-8">
                <div className="flex items-center">
                    <ol className="flex w-full items-center overflow-hidden">
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a href="#">Home</a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a className="capitalize" href="#">
                                products
                            </a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a className="capitalize" href="#">
                                Nike Shoes
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="block grid-cols-9 gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
                <div className="col-span-9 lg:col-span-5">

                    <Flickity
                        className="carousel overflow-hidden lg:w-full lg:ml-0 xl:block xl:ml-0 xl:w-full md:w-[485px] md:ml-40 "
                        elementType="div"
                        options={flickityOptionsMain}
                        flickityRef={(c) => (flickityRef.current = c)}
                    >
                        {product.subImages.map((subImage, index) => (
                            <div key={index} onLoad={() => setupFlickity(0)}>
                                <ZoomedImage imageUrl={subImage.url} index={index} />
                            </div>
                        ))}

                    </Flickity>

                    <Flickity className="carousel cursor-pointer overflow-hidden flex xl:flex xl:ml-0 md:ml-40 lg:ml-0 md:w-full " elementType="div" options={flickityOptionsSub}>

                        {product.subImages.map((subImage, index) => (
                            <div key={index} className={`w-[76px] sm:w-[148px] md:w-[115px] lg:w-[145px] carousel-cell mr-2 mt-2 hover:opacity-90 ${selectedImageIndex === index ? 'border-2 border-black' : ''}`}>
                                <img src={subImage.url} alt={`Sub Image ${index}`}
                                    onClick={() => setupFlickity(index)} />
                            </div>
                        ))}
                    </Flickity>

                    <div className="bg-gray-100 p-6 rounded-md shadow-md mt-3">
                        <h2 className="text-2xl font-semibold mb-4">Available Coupon Codes</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {coupons?.map((coupon, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                                    <h3 className="text-lg font-medium mb-2">{coupon.couponCode}</h3>
                                    <p className="text-gray-600">Name: {coupon.name}</p>
                                    <p className="text-gray-600">Type: {coupon.type}</p>
                                    <p className="text-red-600 italic">Expires in {calDayLeft(coupon.expiryDate)} days</p>
                                    <button
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                        onClick={() => copyCodeToClipboard(coupon.couponCode)}
                                    >
                                        Copy Code
                                    </button>
                                </div>

                            ))}
                        </div>

                    </div>

                </div>
                <div className="col-span-4 pt-8 lg:pt-0">
                    <div className="mb-7 border-b border-gray-300 pb-7">
                        <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                            {product.name}
                        </h2>
                        <div className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                            {parse(product.description)}
                        </div>
                        <div className="mt-5 flex items-center ">
                            <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                                Rs. {product.price}
                            </div>
                            <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                                Rs. 50.00
                            </span>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 pb-3  ">
                        <div className="mb-4">
                            <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                                size
                            </h3>
                            <ul className="colors -mr-3 flex flex-wrap">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <li
                                        key={size}
                                        className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm "
                                    >
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4 ">
                            <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                                color
                            </h3>
                            <ul className="colors -mr-3 flex flex-wrap">
                                {['bg-orange-400', 'bg-pink-400', 'bg-violet-600', 'bg-red-500'].map((color) => (
                                    <li
                                        key={color}
                                        className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                                    >
                                        <span className={`block h-full w-full rounded ${color}`} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                        <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                            <button
                                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                                onClick={() => setItemCount((prev) => prev + 1)}
                            >

                                +
                            </button>
                            <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                                {itemCount}
                            </span>
                            <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                                onClick={() => setItemCount(prev => (prev > 1 ? prev - 1 : 1))}
                            >
                                -
                            </button>
                        </div>
                        <button
                            onClick={() => {

                                cartHandler(product._id, itemCount)
                            }
                            }
                            type="button"
                            className="h-11 w-full rounded-md bg-black text-md px-3 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            ADD TO CART
                        </button>

                    </div>
                    <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                        <button
                            onClick={() => {
                                buyHandler(product._id, itemCount)
                            }
                            }
                            type="button"
                            className="h-11 w-full rounded-md bg-black text-md px-3 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            BUY NOW
                        </button>
                    </div>
                    <div className="py-6 ">
                        <ul className="space-y-5 pb-1 text-sm">
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">SKU:</span>
                                N/A
                            </li>
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">Category:</span>
                                <a className="hover:text-heading transition hover:underline" href="#">
                                    kids
                                </a>
                            </li>
                            <li className="productTags">
                                <span className="text-heading inline-block pr-2 font-semibold">Tags:</span>
                                <a
                                    className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                                    href="#"
                                >
                                    Sneakers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="shadow-sm ">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Product Details
                            </h2>
                            <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                <div className="bg-heading h-0.5 w-full rounded-sm" />
                                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                            </div>
                        </header>
                        <div>
                            <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                                {product.description}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Additional Information
                            </h2>
                        </header>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Customer Reviews
                            </h2>
                        </header>
                    </div>
                </div>
            </div>

        </div>


    ) : null
}
export default ViewProduct;