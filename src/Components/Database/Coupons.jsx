import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getProductById, getCoupons, deleteCoupon, getCouponById } from '../../store/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom'



function Coupons() {
  const navigate = useNavigate();
  const coupons = useSelector(state => state.product.coupons);
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 10
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
 
  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', currentPage);
    queryParams.append('limit', couponsPerPage);


    dispatch(getCoupons(queryParams.toString())).then((status) => {
      setTotalPages(status.payload.totalPages)
    }).finally(()=> {
      setLoading(false)
    })
    navigate(`/database/coupons?page=${currentPage}`);
  }, [dispatch, currentPage]);


  if (loading) {
    return <div className='mx-auto w-full max-w-7xl px-4 py-4'>Loading...</div>; // Adjust the loading indicator as needed
  }

  if (!coupons) {
    return null; // Handle the case when data is not available
  }

  const editHandler = (id) => {
    dispatch(getCouponById(id)).then((status) => {
      if (status.meta.requestStatus === 'fulfilled')
        navigate(`/database/coupons/edit-coupon/${id}`)

    })
  }


  const deleteCoupons = (id) => {
    dispatch(deleteCoupon(id)).then((status) => {
      if (status.meta.requestStatus === 'fulfilled') {
        dispatch(getCoupons());
      }
    })
  }


  const calDayLeft = (date) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const expiryTimestamp = new Date(date).getTime();
    const currentTimestamp = Date.now();
    const difference = expiryTimestamp - currentTimestamp;
    const daysLeft = Math.ceil(difference / millisecondsPerDay);

    return daysLeft;
  };
  return coupons ? (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-black">All Coupons</h2>

          </div>
          <div>
            <button
              onClick={() => navigate('/database/coupons/create-coupon')}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new coupon
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Coupon code
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Min cart value
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Discount value
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Expires in
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative py-3.5">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  {Array.isArray(coupons) && coupons?.map((coupon) => (
                    <tbody key={coupon._id} className="divide-y divide-gray-200 bg-white ">


                      <tr className='hover:bg-gray-100'>
                        <td className="whitespace-nowrap px-4 py-4">

                          <div className="flex items-center cursor-pointer p-3">

                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 ">
                                {coupon.name}
                              </div>
                              <div className="text-sm text-gray-500">Type: {coupon.type}</div>
                            </div>
                          </div>

                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm font-bold text-gray-900">{coupon.couponCode}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex font-normal text-sm leading-5 text-green-600">
                            {coupon.minimumCartValue}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex font-normal text-sm leading-5 text-green-600">
                            {coupon.discountValue}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-red-700">
                          {calDayLeft(coupon.expiryDate)} days
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-sm ${coupon.isActive ? 'text-green-600' : 'text-red-700'}`}>
                          {coupon.isActive ? 'Active' : 'Inactive'}
                        </td>

                        <td className="whitespace-nowrap  py-4 text-sm font-medium">

                          <Button onClick={() => editHandler(coupon._id)} bgColor='bg-blue-500'>
                            Edit
                          </Button>

                        </td>
                        <td className="whitespace-nowrap py-4 text-sm font-medium">

                          <Button onClick={() => deleteCoupons(coupon._id)} bgColor='bg-red-500' >
                            Delete
                          </Button>

                        </td>
                      </tr>


                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button
            className={`flex items-center gap-x-2 rounded-md border ${currentPage === 1 ? 'bg-gray-100 hover:bg-none' : 'bg-white'} px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>previous</span>
          </button>

          <div className="hidden items-center gap-x-3 md:flex">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}

                className={`rounded-md px-2 py-1 text-sm ${pageNumber === currentPage ? 'bg-gray-100' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            className={`flex items-center gap-x-2 rounded-md border ${currentPage === pageNumbers.length ? 'bg-gray-100 hover:bg-none' : 'bg-white'} px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  ) : null
}

export default Coupons;