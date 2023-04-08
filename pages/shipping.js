import CheckoutWizard from '@/components/CheckoutWizard'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ShippingScreen = () => {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress } = cart

  const router = useRouter()

  const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm()

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country }
    })
    Cookies.set('cart', JSON.stringify({
      ...cart,
      shippingAddress: {
        fullName,
        address,
        city,
        postalCode,
        country,
      }
    }))
    router.push('/payment')
  }

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])

  return (
    <Layout title={'Endereço Envio |'}>
      <CheckoutWizard activeStep={1} />
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl font-semibold'>Endereço de Envio</h1>
        <div className='mb-4'>
          <label htmlFor="fullName">Nome Completo</label>
          <input className='w-full' id='fullName' autoFocus
            {...register('fullName', { required: 'Por favor digite seu nome completo!' })}
          />
          {errors.fullName && (
            <div className='text-red-500'>{errors.fullName.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="address">Endereço</label>
          <input className='w-full' id='address' autoFocus
            {...register('address',
              {
                required: 'Por favor digite seu endereço',
                minLength: { value: 3, message: 'O endereço deve ter mais de 2 caracteres!' }
              })}
          />
          {errors.address && (
            <div className='text-red-500'>{errors.address.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="city">Cidade</label>
          <input className='w-full' id='city' autoFocus
            {...register('city',
              { required: 'Por favor digite sua Cidade' })}
          />
          {errors.city && (
            <div className='text-red-500'>{errors.city.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="postalCode">CEP</label>
          <input className='w-full' id='postalCode' autoFocus
            {...register('postalCode',
              {
                required: 'Por favor digite seu CEP',
                minLength: { value: 8, message: "Digite o CEP corretamente" }
              })}
          />
          {errors.postalCode && (
            <div className='text-red-500'>{errors.postalCode.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="country">País</label>
          <input className='w-full' id='country' autoFocus
            {...register('country',
              {
                required: 'Por favor digite seu País',
              })}
          />
          {errors.country && (
            <div className='text-red-500'>{errors.country.message}</div>
          )}
        </div>
        <div className='mb-4 flex justify-between'>
          <button className='primary-button'>Próximo</button>
        </div>
      </form>
    </Layout>
  )
}

ShippingScreen.auth = true

export default ShippingScreen