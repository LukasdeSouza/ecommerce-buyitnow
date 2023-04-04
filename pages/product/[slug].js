import Layout from '@/components/Layout'
import data from '@/utils/data';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const ProductScreen = () => {
  const { query } = useRouter();
  const { slug } = query
  const product = data.products.find(x => x.slug === slug)

  if (!product) {
    return <Layout>
      <h2>Produto Não Encontrado</h2>
    </Layout>
  }

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
          <div className='p-5 md-5 w-60 rounded-lg border border-gray-200 shadow-md'>
            <div className='mb-2 flex justify-between'>
              <div>Valor</div>
              <div>R${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>Status:</div>
              <div>{product.countInStock > 0 ? 'Em Estoque' : "Indisponível"}</div>
            </div>
            <button className='w-full rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400  active:bg-amber-500'>
              Add ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductScreen