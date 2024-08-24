import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { getCouponById, getProductById } from '../store/productSlice';
import { Container, CouponForm } from '../Components/index';

function EditCoupon() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const coupon = useSelector(state => state.product.specificCoupon);

  useEffect(() => {
    dispatch(getCouponById(id));

  }, [id])

  return coupon ? (
    <div className='py-8'>
      <Container>
        <CouponForm coupon={coupon} />
      </Container>

    </div>

  ) : null
}

export default EditCoupon