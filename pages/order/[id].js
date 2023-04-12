import Layout from '@/components/Layout'
import { getError } from '@/utils/error';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS': return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload };
    default: state;
  }
}

const OrderScreen = () => {
  const { query } = useRouter()
  const orderId = query.id

  const [{ loading, error, order }, dispatch] = useReducer(reducer, { loading: true, order: {}, error: '' })

  const { shippingAddress, paymentMethod, orderItems, itemsPrice,
    taxPrice, shippingPrice, totalPrice, isPaid, paidAt,
    isDelivered, deliveredAt } = order

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder()
    }
  }, [order, orderId])

  return (
    <Layout title={`Pedido ${orderId}`}>
      <h1 className='text-xl'>Detalhes do Pedido</h1>
      <h1 className='mb-4 text-sm'><i>{orderId}</i></h1>
      {loading ?
        <div>Loading...</div> :
        error ?
          <div className='alert-error'>
            {error}
          </div> :
          <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>
              <div className='card p-5'>
                <h2 className='mb-2 text-lg font-semibold'> Endereço de Envio</h2>
                <div className='mb-4 text-sm'>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </div>
                {isDelivered ? (
                  <div className='alert-success'>
                    Entre em {deliveredAt}
                  </div>
                ) : (
                  <div className='alert-error'>
                    Não entregue não concluída
                  </div>
                )}
              </div>
              <div className='card p-5'>
                <h2 className='mb-2 text-lg font-semibold'>Forma de Pagamento</h2>
                <div className='mb-4 text-sm'>{paymentMethod}</div>
                {isPaid ? (
                  <div className='alert-success'>
                    Pago em {paidAt}
                  </div>
                ) : (
                  <div className='alert-error'>
                    Pagamento não concluído
                  </div>
                )}
              </div>
              <div className='card overflow-x-auto p-5'>
                <h2 className='mb-2 text-lg font-semibold'>Items Pedidos</h2>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='p-5 text-rigth'>Quantidade</th>
                      <th className='p-5 text-rigth'>Preço</th>
                      <th className='p-5 text-rigth'>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr className='border-b text-sm' key={item._id}>
                        <td>
                          <Link className="flex items-center" href={`/product/${item.slug}`}>
                            <Image className='rounded-md'
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className='p-5 text-right'>{item.quantity}</td>
                        <td className='p-5 text-right'>R${item.price}</td>
                        <td className='p-5 text-right'>R${item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className='card p-5'>
                <h2 className='mb-2 text-lg'> Resumo do Pedido</h2>
                <ul>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Itens</div>
                      <div>R${itemsPrice}</div>
                    </div>
                  </li>{" "}
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Imposto</div>
                      <div>R${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Envio</div>
                      <div>R${shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Total</div>
                      <div>R${totalPrice}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      }
    </Layout>
  )
}

OrderScreen.auth = true

export default OrderScreen