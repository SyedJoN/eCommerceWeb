import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Logo } from "../Components/index";
import { deleteAddress, getAddresses, updateAvatar } from "../store/authSlice";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


function UserProfile({ width = '150px', height = '150px' }) {
    const { register, handleSubmit } = useForm();

    const currentUser = useSelector(state => state.auth.currentUser)

    const userProfile = useSelector(state => state.auth.user)
    const navigate = useNavigate();

    const userAddresses = useSelector(state => state.auth.addresses);
    const [activeIndex, setActiveIndex] = useState(null);

    const editBtnHandler = () => {
        navigate(`/user/${currentUser.data._id}/profile/edit`)
    }
    const editAddressHandler = () => {
        navigate(`/user/${currentUser.data._id}/addresses/edit`)
    }
    const addAddressHandler = () => {
        navigate(`/user/${currentUser.data._id}/addresses/create`)
    }

    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(getAddresses());

    }, [currentUser])



    const deleteAddressHandler = (id, e) => {
        e.stopPropagation();
        dispatch(deleteAddress(id));
    }

    return currentUser && userProfile ? (

        <div className="mx-auto max-w-7xl px-2 lg:px-0 mt-3">


            {/* <div className="mx-auto max-w-3xl text-center">
                {/* <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-4xl lg:leading-tight">
                    Welcome {userProfile.firstName + ' ' + userProfile.lastName}
                </h2> */}

            {/* </div> */}
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">

                                    <p className='text-gray-800 text-sm'>{currentUser.data.email}</p>



                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                <div className="mt-2">

                                    <p className='text-gray-800 text-sm'>{userProfile.firstName}</p>



                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                <div className="mt-2">

                                    <p className='text-gray-800 text-sm'>{userProfile.lastName}</p>



                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                <div className="mt-2">

                                    <p className='text-gray-800 text-sm'>{userProfile.countryCode} {userProfile.phoneNumber}</p>



                                </div>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <img
                                        src={currentUser.data.avatar.url}
                                        alt="userAvatar"
                                        className="relative h-12 w-12 object-cover rounded-full"
                                    />


                                </div>
                            </div>



                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button onClick={editBtnHandler} type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Profile</button>
                        </div>
                    </div>

                    <div className=" border-gray-900/10 pb-12">


                        <h2 className="text-base font-semibold leading-7 text-gray-900">Your Addresses</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a proper and complete address where you can receive products.</p>
                        <div className="w-full max-w-md mt-3">
                            {userAddresses?.map((address, index) => (
                                <div key={index} className="mb-2">
                                    <button
                                        type="button" 
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex justify-between p-2 bg-gray-200 rounded-md focus:outline-none"
                                    >
                                        <div className="flex flex-wrap items-center">

                                            <span className="outline-none cursor-pointer" onClick={(e) => deleteAddressHandler(address._id, e)}>
                                                ❌
                                            </span>


                                        </div>
                                        <div className="flex flex-wrap items-center">
                                            <span className="text-lg font-medium">Address {index + 1}</span>
                                        </div>


                                        <svg
                                            className={`w-6 h-6 transition-transform duration-300 transform ${activeIndex === index ? 'rotate-180' : ''
                                                }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
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

                        <div className="mt-6 flex  items-center justify-end gap-x-3">
                            <button onClick={addAddressHandler} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Address</button>
                            <button onClick={editAddressHandler} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Addresses</button>


                        </div>

                    </div>


                </div>

            </form>




        </div>








    ) : null


}

export default UserProfile