import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import ProductItem from '@/components/ProductItem'
import db from '@/utils/db'
import Product from '@/models/Product'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Store } from '@/utils/Store'
import { useContext } from 'react'

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Desculpe, o produto está sem estoque');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Produto adicionado ao Carrinho!')
  };


  return (
    <div>
      <Layout title={'Home |'}>
        <Image src={'/../public/images/banner1.jpg'} width={1250} height={250} style={{ borderRadius: 12 }} />
        <h1 className='font-semibold text-2xl font-sans text-center'>Your Ecommerce Name</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-12'>
          {products.map((product) => (
            <ProductItem product={product} key={product.slug}
              addToCartHandler={addToCartHandler} />
          ))}
        </div>
      </Layout>
    </div>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}