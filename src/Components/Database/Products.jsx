import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { fetchProducts, deleteProductById, getProductById } from '../../store/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom'


function Products() {
  const navigate = useNavigate();
  const products = useSelector(state => state.product.products);
  const productsPerPage = 10
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const dispatch = useDispatch();

  const buttonHandler = (id) => {
    dispatch(getProductById(id)).then((status) => {
      if (status.meta.requestStatus === 'fulfilled')
        navigate(`/product/${id}`)

    })
  }

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', currentPage);
    queryParams.append('limit', productsPerPage);
    dispatch(fetchProducts(queryParams.toString())).then((status) => {
      setTotalPages(status.payload.totalPages)
    }).finally(()=> {
      setLoading(false)
    })
    navigate(`/database/products?page=${currentPage}`);
  }, [dispatch, currentPage]);

  const deleteProduct = (id) => {
    dispatch(deleteProductById(id));
  }
  const editHandler = (id) => {
    navigate(`/database/products/edit/${id}`)
  }


  if (loading) {
    return <div className='mx-auto w-full max-w-7xl px-4 py-4'>Loading...</div>; // Adjust the loading indicator as needed
  }

  if (!products) {
    return null; 
  }

  return products ? (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-black">All Products</h2>

          </div>
          <div>
            <button
              onClick={() => navigate('/database/products/add-product')}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new product
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
                        <span>Title</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        CreatedAt
                      </th>
                      <th scope="col" className="relative py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative py-3.5">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                    {Array.isArray(products) && products?.map((product) => (
                  <tbody key={product._id} className="divide-y divide-gray-200 bg-white ">
                      <tr className='hover:bg-gray-100'>
                        <td className="whitespace-nowrap px-4 py-4">

                          <div className="flex items-center cursor-pointer p-3" onClick={() => buttonHandler(product._id)}>
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={product.mainImage.url}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 ">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">Stock: {product.stock}</div>
                            </div>
                          </div>

                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">{product.category}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex font-normal text-sm leading-5 text-green-600">
                            {product.price} Rs
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {product.createdAt}
                        </td>
                        <td className="whitespace-nowrap  py-4 text-sm font-medium">

                          <Button onClick={() => editHandler(product._id)} bgColor='bg-blue-500'>
                            Edit
                          </Button>

                        </td>
                        <td className="whitespace-nowrap py-4 text-sm font-medium">

                          <Button onClick={() => deleteProduct(product._id)} bgColor='bg-red-500' >
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

export default Products;