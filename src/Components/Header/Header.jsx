import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logo, Container, UserAvatar } from '../index';
import { logoutUser } from '../../store/authSlice';
import { setSearchValue } from '../../store/searchSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { applyCoupon, clearCart, getProductById, getUserCart, removeItemFromCart } from '../../store/productSlice';


function Header() {
    const userCart = useSelector(state => state.product.userCart);

    const location = useLocation();
    const activeTabClassName = 'bg-indigo-600 text-white';
    const currentUser = useSelector(state => state.auth.currentUser);
    const userProfile = useSelector(state => state.auth.user)
    const id = currentUser?.data._id;
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(false)
    const [coupon, setCoupon] = useState("");
    const [msg, setMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [cartVal, setCartVal] = useState(userCart?.data.items.length);

    const handleClearCart = () => {
        dispatch(clearCart());
   
    }

    useEffect(() => {
        setCartVal(userCart?.data.items.length)
        setErrorMsg('')
        setMsg('')
    }, [userCart])

    useEffect(() => {
        dispatch(getUserCart()).then(status=>console.log(status));
    }, [dispatch])

    useEffect(() => {


        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const checkoutHandler = () => {

        navigate('/checkout')

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
    const searchChange = (value) => {
        dispatch(setSearchValue(value));
    };

    const logoutHandler = () => {
        setShowDropdown(false);
        dispatch(logoutUser());
        navigate('/login');
    };

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
        setShowMenu(false);

    };

    const itemHandler = (productId) => {
        dispatch(getProductById(productId)).then((status) => {
            if (status.meta.requestStatus === 'fulfilled')
                navigate(`/product/${productId}`)
        })
    }

    const removeItem = (productId) => {
        dispatch(removeItemFromCart(productId)).then(status=>console.log(status, 'remove'))
    }

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
        setShowDropdown(false);

    };

    const handleMenuItemClick = (slug) => {
        navigate(slug);
        setShowMenu(false)
    };
    const handleDropdownItemClick = (slug) => {
        navigate(slug);
        setShowDropdown(false);
    };

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true,
        },
        {
            name: 'Blogs',
            slug: '/blogs',
            active: authStatus,
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'Password',
            slug: '/change-password',
            active: authStatus,
        },

    ];


    return (
        <header className='flex bg-white py-6'>
            <Container>
                {!isMobile && (
                    <nav className=''>
                        <div className='flex items-center justify-center'>
                            <Link to='/'>
                                <Logo width='80%' />
                            </Link>
                        </div>

                        {/* <ul className='flex mr-20 md:mr-0'>
                            <li>
                                <Search onChangeVal={searchChange} />
                            </li>
                        </ul> */}

                        <ul className='flex justify-center mt-10'>
                            {navItems.map((link) =>
                                link.active ? (
                                    <li className='text-black sm:text-sm xl:text-base md:text-xs' key={link.name}>
                                        <button
                                            className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-semibold ${location.pathname === link.slug ? activeTabClassName : ''
                                                }`}
                                            onClick={() => navigate(link.slug)}
                                        >
                                            {link.icon && <FontAwesomeIcon icon={link.icon} />} {/* Display icon if available */}
                                            {link.name}
                                        </button>
                                    </li>
                                ) : null
                            )}


                            {authStatus && (
                                <div className='relative'>
                                    <button className='flex items-center focus:outline-none ml-[6px]' onClick={handleDropdownToggle}>
                                        <UserAvatar />
                                    </button>
                                    {showDropdown && (
                                        <ul className='z-10 absolute top-full mt-2 bg-white border rounded-sm '>
                                            <li className={`${location.pathname === `/user/${currentUser?.data._id}` ? activeTabClassName : 'hover:bg-gray-200'}`}>
                                                <Link
                                                    to={`/user/${id}`}
                                                    className={`block px-4 py-2`}

                                                    onClick={() => handleDropdownItemClick(`/user/${id}`)}
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            {currentUser?.data.role === 'ADMIN' &&
                                                (
                                                    <li className={`${location.pathname === `/database` ? activeTabClassName : 'hover:bg-gray-200'}`}>
                                                        <Link
                                                            to={`/database`}
                                                            className={`block px-4 py-2`}

                                                            onClick={() => handleDropdownItemClick(`/database`)}
                                                        >
                                                            Database
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            <li>
                                                <button className='block w-full text-left px-4 py-2 hover:bg-gray-200' onClick={logoutHandler}>
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                            {authStatus && !isMobile && (
                                <p className='text-black m-2 font-bold md:text-sm lg:text-sm xl:text-base'>Hi {userProfile?.firstName}!</p>

                            )}
                            {authStatus && (
                                <div className='text-black sm:text-sm xl:text-base md:text-xs'>
                                    <button
                                        className={`relative inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-semibold`}
                                        onClick={() => setOpen((prev) => !prev)}
                                    >
                                        {faShoppingCart && <FontAwesomeIcon icon={faShoppingCart} />} Cart
                                        <span className='absolute top-0 left-8 rounded-full block w-4 h-4 text-xs text-white font-bold bg-red-500'>{cartVal}</span>
                                    </button>

                                </div>
                            )}
                        </ul>

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
                                                                    onClick={checkoutHandler}
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
                    </nav>

                )}


                {isMobile && (
                    <nav className='flex justify-between'>

                        <Link to='/'>
                            <Logo width='150px' />
                        </Link>


                        <div className='relative flex'>
                            <button className='scale-150 flex items-center focus:outline-none text-white' onClick={handleMenuToggle}>
                                {'\u2630'}
                            </button>

                            {showMenu && (
                                <ul className='text-center z-10 absolute top-full -left-9 mt-2 bg-white border rounded-sm'>

                                    {navItems.map((links) =>
                                        links.active ? (
                                            <li className={` hover:bg-gray-200 hover:text-black ${location.pathname === links.slug ? activeTabClassName : 'hover:bg-gray-200'
                                                }`} key={links.name}>
                                                <button
                                                    className={`z-10 px-2 py-2`}
                                                    onClick={() => handleMenuItemClick(links.slug)}
                                                >
                                                    {links.name}
                                                </button>
                                            </li>
                                        ) : null
                                    )}
                                </ul>
                            )}
                        </div>

                        {authStatus && (
                            <div className='relative'>
                                <button className='flex items-center focus:outline-none ml-[6px]' onClick={handleDropdownToggle}>
                                    <UserAvatar />
                                </button>
                                {showDropdown && (
                                    <ul className='z-10 absolute top-full -left-2 mt-2 bg-white border rounded-sm'>
                                        <li className={`hover:bg-gray-200 hover:text-black ${location.pathname === `/user/${currentUser?.data._id}` ? activeTabClassName : ''}`}>
                                            <Link
                                                to={`/user/${id}`}
                                                className='block px-2 py-2 '
                                                onClick={() => handleDropdownItemClick(`/user/${id}`)}
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        {currentUser?.data.role === 'ADMIN' &&
                                            (
                                                <li className={`${location.pathname === `/manage-products` ? activeTabClassName : ''}`}>
                                                    <Link
                                                        to={`/database`}
                                                        className={`block px-2 py-2 hover:bg-gray-200 hover:text-black`}

                                                        onClick={() => handleDropdownItemClick(`/database`)}
                                                    >
                                                        Database
                                                    </Link>
                                                </li>
                                            )
                                        }

                                        <li>
                                            <button className='block px-2 py-2 hover:bg-gray-200' onClick={logoutHandler}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}


                    </nav>
                )}

            </Container>
        
        </header>

    );
}

export default Header;
