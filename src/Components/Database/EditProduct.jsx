import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import PostForm from '../PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../store/productSlice';
import { Container } from '../../Components/index';

function EditProduct() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.specificProduct);

  useEffect(() => {
    dispatch(getProductById(id));

  }, [id])

  return product ? (
    <div className='py-8'>
      <Container>
        <PostForm product={product} />
      </Container>

    </div>

  ) : null
}

export default EditProduct