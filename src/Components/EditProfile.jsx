import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Logo, Select } from "./index";
import { updateAvatar, updateProfile, getAddresses, fetchCountries } from "../store/authSlice";
import { useForm } from 'react-hook-form';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';


function EditProfile() {
  const { register, handleSubmit } = useForm();
  const userAddresses = useSelector(state => state.auth.addresses);
  const currentUser = useSelector(state => state.auth.currentUser)
  const userProfile = useSelector(state => state.auth.user)
  const [firstName, setfirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber);
  const [countryCode, setCountryCode] = useState(userProfile.countryCode);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const countries = useSelector(state => state.auth.countries);
  const [selectedCountry, setSelectedCountry] = useState('')
  const [inputField, setInputField] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    phoneNumber: userProfile.phoneNumber
  })

  const handleField = (e) => {
    setInputField(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleSelectChange = (e) => {
    setSelectedCountry(e.target.value);
  }
  
  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }

  const formHandler = () => {
    console.log('submitted')
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(updateAvatar(file));
    }
  };

  const handleCancel = () => {
    navigate(`/user/${currentUser.data._id}`)

  }
  const submit = (e) => {
    e.preventDefault();
    if (countryCode !== '' && inputField.firstName !== '' && inputField.lastName !== '' && inputField.phoneNumber !== '') {
      const data = {
        "countryCode": countryCode,
        "firstName": inputField.firstName,
        "lastName": inputField.lastName,
        "phoneNumber": inputField.phoneNumber
      };

      dispatch(updateProfile(data)).then((status) => {
        if (status.meta.requestStatus === 'fulfilled') {
          navigate(`/user/${currentUser.data._id}`)
        }

      });
    } else {
      setError('Please fill all the fields');
    }
  };
  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(getAddresses())
  }, []);





  return currentUser && userProfile ? (

    <div className="mx-auto max-w-7xl px-2 lg:px-0 mt-3">
      <form onSubmit={submit}>
        <div className="space-y-5 mb-5">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Profile</h2>
            {/* <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p> */}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-4">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <div className="mt-2">

                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" name="firstName" id="firstName" autoComplete="firstName" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Muhammad" value={inputField.firstName} onChange={handleField} />
                  </div>




                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <div className="mt-2">

                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" name="lastName" id="lastName" autoComplete="lastName" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Jon" value={inputField.lastName} onChange={handleField} />
                  </div>




                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Phone No</label>
                <div className="mt-2">
                  <select className="inline-flex rounded-md mr-1 pr-7 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" defaultValue={countryCode} onChange={(e) => { setCountryCode(e.target.value) }}>
                    {Array.from({ length: 93 }, (_, index) => (
                      <option key={index} value={`+${index}`}>
                        +{index}
                      </option>
                    ))}
                  </select>


                  <input type="number" name="phoneNumber" className="inline-flex rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={inputField.phoneNumber} onChange={handleField} />





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
                  <Input
                    id="avatarInput"
                    type="file"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    accept="image/png"
                    {...register('image', {
                      required: true
                    })}
                    onChange={handleImageChange}

                  />

                </div>
              </div>



            </div>
         
          </div>
          <div className="flex items-center justify-end gap-x-6 ">
            <button type="button" onClick={handleCancel} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>

          </div>
        </div>
  
        </form>
        </div>
     



  ) : null


}

export default EditProfile