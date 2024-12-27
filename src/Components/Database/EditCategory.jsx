import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryById } from '../../store/productSlice';
import { Container, CategoryForm } from '../index';

function EditCategory() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(state => state.product.specificCategory);

  useEffect(() => {
    dispatch(getCategoryById(id));

  }, [id])

  return category ? (
    <div className='py-8'>
      <Container>
        <CategoryForm category={category} />
      </Container>

    </div>

  ) : null
}

export default EditCategory