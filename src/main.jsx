import React from 'react'
import { Home, Login, Signup, Blogs, ForgetPassword, ChangePassword, ResetPassword, UserProfile, Database, Products, ViewProduct, Checkout, CreateAddress, EditCoupon, CreateCoupon } from './pages/index.js'
import {AuthLayout } from './Components/index.js'
import store from './store/store.js'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AddProduct, EditProduct, EditProfile, EditAddresses, Coupons } from './Components/index.js'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: 'blogs',
        element: (
          <AuthLayout authentication={true}>
            <Blogs />
          </AuthLayout>
        )
      },
      {
        path: 'forget-password',
        element: (
          <AuthLayout authentication={false}>
            <ForgetPassword />
          </AuthLayout>
        )
      },
      {
        path: 'change-password',
        element: (
          <AuthLayout authentication={true}>
            <ChangePassword />
          </AuthLayout>


        )
      },
      {
        path: 'reset-password/:token',
        element: (
          <AuthLayout authentication={false}>
            <ResetPassword />
          </AuthLayout>


        )
      },
      {
        path: 'user/:_id',
        element: (
          <AuthLayout authentication={true}>
            <UserProfile />
          </AuthLayout>


        )
      },
      {
        path: 'user/:_id/profile/edit',
        element: (
          <AuthLayout authentication={true}>
            <EditProfile />
          </AuthLayout>


        )
      },
      {
        path: 'user/:_id/addresses/create',
        element: (
          <AuthLayout authentication={true}>
            <CreateAddress />
          </AuthLayout>


        )
      },
      {
        path: 'user/:_id/addresses/edit',
        element: (
          <AuthLayout authentication={true}>
            <EditAddresses />
          </AuthLayout>


        )
      },
      {
        path: 'database',
        element: (
          <AuthLayout authentication={true}>
            <Database />
          </AuthLayout>


        )
      },
      {
        path: 'database/products',
        element: (
          <AuthLayout authentication={true}>
            <Products />
          </AuthLayout>

        )
      },
      {
        path: 'database/products/edit/:id',
        element: (
      
            <EditProduct />
     

        )
      },
      {
        path: 'database/products/add-product',
        element: (
          <AuthLayout authentication={true}>
            <AddProduct />
          </AuthLayout>

        )
      },
      {
        path: 'product/:id',
        element: (
          <ViewProduct />
        )
      },
      {
        path: '/checkout',
        element: (
          <Checkout />
        )
      },
      {
        path: 'database/coupons',
        element: (
          <AuthLayout authentication={true}>
          <Coupons />
          </AuthLayout>

        )
      },
      {
        path: 'database/coupons/edit-coupon/:id',
        element: (
          <AuthLayout authentication={true}>
          <EditCoupon />
          </AuthLayout>

        )
      },
      {
        path: 'database/coupons/create-coupon',
        element: (
          <AuthLayout authentication={true}>
          <CreateCoupon />
          </AuthLayout>

        )
      },
     
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>


)
