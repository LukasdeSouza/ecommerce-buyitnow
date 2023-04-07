import CheckoutWizard from '@/components/CheckoutWizard'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PaymentScreen = () => {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress, paymentMethod } = cart

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const router = useRouter()

  const submitHandler = (e) => {
    e.preventDefault()
    if (!selectedPaymentMethod) {
      return toast.error('Forma de Pagamento é obrigatória')
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: { selectedPaymentMethod } })
    Cookies.set('cart',
      JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod })
    )
    router.push('/placeorder')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || '')
  }, [paymentMethod, router, shippingAddress.address])

  return (
    <Layout title={'Forma de Pagamento'}>
      <CheckoutWizard activeStep={2} />
      <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
        <h1 className='mb-4 text-xl'>Forma de Pagamento</h1>
        {
          ['PayPal', 'Strip', 'CashonDelivery', 'Mercado Pago'].map((payment) => (
            <div clasName='mb-4' key={payment}>
              <input name='paymentMethod'
                className='p-2 outline-none focus:ring-0'
                id={payment}
                type='radio'
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label className='p-2' htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
        <div className='mb-4 mt-4 flex justify-between'>
          <button className='default-button'
            type='button'
            onClick={() => router.push('/shipping')}>
            Voltar
          </button>
          <button className='primary-button'>Próximo</button>
        </div>
      </form>
    </Layout>
  )
}

export default PaymentScreen