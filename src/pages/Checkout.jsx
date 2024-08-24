import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { getCouponById, getProductById } from '../store/productSlice';
import { Container, CouponForm } from '../Components/index';
import {CheckoutForm} from '../Components/index';
import { useLocation } from 'react-router-dom';



function Checkout() {
  
  return  (
    <div className='py-8'>
      <Container>
        <CheckoutForm  />
      </Container>

    </div>

  )
}

export default Checkout