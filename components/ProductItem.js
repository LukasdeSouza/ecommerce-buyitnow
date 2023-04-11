import Link from 'next/link'
import React from 'react'

const ProductItem = ({ product, addToCartHandler }) => {

  return (
    <div className='card'>
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className='rounded shadow' />
      </Link>

      <div className='flex flex-col items-center justify-center p-5 md-5 rounded-lg border border-gray-200 shadow-md'>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-lg'>{product.name}</h2>
        </Link>
        <p className='mb-2 text-xs'>{product.brand}</p>
        <p className='text-sm'>R${product.price}</p>
        <button
          className='primary-button mt-2' type='button' onClick={() => addToCartHandler(product)}>
          Add ao Carrinho
        </button>
      </div>
    </div>
  )
}

export default ProductItem