import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Logo, Select } from "../Components/index";
import { updateAvatar, updateProfile, getAddresses, createAddress, updateAddress, fetchCountries } from "../store/authSlice";
import { useForm } from 'react-hook-form';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';


function CreateAddress() {
    const userAddresses = useSelector(state => state.auth.addresses);

    const { register, handleSubmit } = useForm();
    const currentUser = useSelector(state => state.auth.currentUser)
    const userProfile = useSelector(state => state.auth.user)
    const [firstName, setfirstName] = useState(userProfile.firstName);
    const [lastName, setLastName] = useState(userProfile.lastName);
    const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber);
    const [countryCode, setCountryCode] = useState(userProfile.countryCode);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null);
    const countries = useSelector(state => state.auth.countries);
    const [selectedCountry, setSelectedCountry] = useState('')
    const [addressesField, setAddressesField] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "Pakistan"
    });

    const handleFieldChange = (e) => {
        setAddressesField((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        dispatch(fetchCountries());
    }, [])

    const handleCancel = () => {
        navigate(`/user/${currentUser.data._id}`)

    }


        ;

    // const [inputField, setInputField] = useState({
    //     addressLine1: addresses.addressLine1,
    //     addressLine2: addresses.addressLine1,
    //     country: addresses.phoneNumber
    // })





    const submit = (e) => {
        e.preventDefault();

        if (!addressesField.addressLine1 || !addressesField.addressLine2 || !addressesField.state || !addressesField.pincode ||!addressesField.city || !addressesField.country) {
            console.error("Incomplete address data");
            return;
          }
        
          dispatch(createAddress({ userData: addressesField })).then((status) => {
            if(status.meta.requestStatus === 'fulfilled') {
                navigate(`/user/${currentUser.data._id}`);
            }
          });
        }


    


    return (

        <div className="mx-auto max-w-7xl px-2 lg:px-0 mt-3 mb-3">
            <form onSubmit={submit}>
                <div className="space-y-12">


                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Addresses</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a proper and complete address where you can receive products.</p>
                        <div className="w-full max-w-md mt-3">

                            <div className="mb-2">

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Address Line 1</label>
                                        <div className="mt-2">
                                            <input type="text" name="addressLine1" value={addressesField.addressLine1} onChange={handleFieldChange} id="addressLine1" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Address Line 2</label>
                                        <div className="mt-2">
                                            <input type="text" name="addressLine2" id="addressLine2" value={addressesField.addressLine2} onChange={handleFieldChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    {/* <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div> */}

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                name="country"
                                                value={addressesField.country}
                                                onChange={handleFieldChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                {countries?.map((country) => (

                                                    <option key={country.name.common} value={country.name.common}>
                                                        {country.name.common}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>





                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                        <div className="mt-2">
                                            <input type="text" name="city" id="city" value={addressesField.city} onChange={handleFieldChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                                        <div className="mt-2">
                                            <input type="text" name="state" id="state" value={addressesField.state} onChange={handleFieldChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                                        <div className="mt-2">
                                            <input type="text" maxLength={6}
                                                name="pincode" id="pincode" value={addressesField.pincode} onChange={handleFieldChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                    {error &&
                        <div className='w-full bg-red-600 py-2 text-white px-2'>
                            {error}
                        </div>}


                    <div className="flex items-center justify-end gap-x-6">
                        <button type="button" onClick={handleCancel} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>

                    </div>


                </div>

            </form>
        </div>

    )


}

export default CreateAddress