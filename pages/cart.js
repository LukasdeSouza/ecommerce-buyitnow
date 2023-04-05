import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import Image from 'next/image'
import Link from 'next/link'
import { XCircleIcon } from '@heroicons/react/outline'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'


const CartScreen = () => {
  const { state, dispatch } = useContext(Store)
  const { cart: { cartItems } } = state

  const router = useRouter()

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty)
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }

  return (
    <Layout title={'Carrinho'}>
      {cartItems.length === 0 ? (
        <div className='text-center'>
          Carrinho vazio.
          <br />
          <Link className='font-bold' href={'/'}> Ir as Compras</Link>
        </div>
      ) : (
        <div className='grid md:grod-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>Item</th>
                  <th className='p-5 text-right'>Quantidade</th>
                  <th className='p-5 text-rigth'>Preço</th>
                  <th className='p-5'>Ação</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className='border-b'>
                    <td>
                      <Link className='flex items-center' href={`products/${item.slug}`}>
                        <Image src={item.image}
                          alt={item.name}
                          width={50}
                          height={50} />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className='p-5 text-right'>
                      <select value={item.quantity}
                        onChange={(e) => updateCartHandler(item, e.target.value)}>
                        {[...Array(item.countInStock).keys()].map(i => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='p-5 text-center'>R${item.price}</td>
                    <td className='p-5 text-center'>
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className='h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='p-5 md-5 flex flex-col items-center rounded-lg border border-gray-200 shadow-md'>
            <ul>
              <li>
                <div className='pb-3'>
                  <b>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)})</b>
                  {' '}
                  : R$
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button className='rounded bg-amber-300 py-2 mt-2 px-3 shadow outline-none hover:bg-amber-400 active:bg-amber-500 font-semibold w-full'
                  onClick={() => router.push('login?redirect=/shipping')}
                >
                  Finalizar Compra
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })