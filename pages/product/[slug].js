import Layout from '@/components/Layout'
import Product from '@/models/Product';
import { Store } from '@/utils/Store';
import db from '@/utils/db';
import axios from 'axios';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { Router, useRouter } from 'next/router'
import React, { useContext } from 'react'

const ProductScreen = (props) => {
  const { state, dispatch } = useContext(Store)

  const { product } = props

  const router = useRouter()

  if (!product) {
    return <Layout title={'Produto Não Encontrado |'}>
      <div className='flex flex-col text-center justify-center'>
        <h2 className='font-semibold'>Produto Não Encontrado</h2>
        <button className='' onClick={() => router.push('/')}>Voltar</button>
      </div>
    </Layout>
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Desculpe, o produto está sem estoque');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className='py-2'>
        <Link href={'/'}>Voltar</Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout='responsive' />
        </div>
        <div>
          <ul>
            <li>
              <h1 className='text-lg font-bold'>{product.name}</h1>
            </li>
            <li className='text-sm font-semibold mt-8' >Categoria: {product.category}</li>
            <li className='text-sm'>Marca: {product.brand}</li>
            <li className='text-sm'>{product.rating} de {product.numReviews} reviews</li>
            <li className='text-sm font-semibold'>Descrição:</li>
            <li className='text-sm font-light'>{product.description}</li>
          </ul>
        </div>
        <div>
          <div className='p-5 md-5 rounded-lg border border-gray-200 shadow-md'>
            <div className='mb-2 flex justify-between'>
              <div>Valor</div>
              <div>R${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>Status:</div>
              <div>{product.countInStock > 0 ? 'Em Estoque' : "Indisponível"}</div>
            </div>
            <button
              className='w-full rounded bg-amber-300 py-2 px-4 shadow outline-none
             hover:bg-amber-400  active:bg-amber-500'
              onClick={addToCartHandler}>
              Add ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null
    }
  }
}

export default ProductScreen