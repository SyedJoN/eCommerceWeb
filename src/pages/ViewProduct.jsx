import React from 'react'
import { ViewProduct as ViewProductComponent } from '../Components'
import { Container } from '../Components/index'

function ViewProduct() {
  return (
    <div className='border border-gray-300'>
      <Container>
      <ViewProductComponent /> 
        </Container> </div>
  )
}

export default ViewProduct