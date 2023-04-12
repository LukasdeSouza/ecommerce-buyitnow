import Layout from '@/components/Layout'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getError } from '@/utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'

const RegisterScreen = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query

  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, formState: { errors }, getValues } = useForm()

  const submitHandler = async ({ name, email, password }) => {
    setLoading(true)
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password
      })
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      if (result.error) {
        toast.error(result.error);
      }
    }
    catch (error) {
      toast.error(getError(error))
    }
    setLoading(false)
  }

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  return (
    <Layout title={'Criar Conta |'}>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Criar Conta</h1>
        <div className='mb-4'>
          <label htmlFor="name">Nome</label>
          <input type="text"
            {...register('name', {
              required: 'Digite seu Nome',
            })}
            className='w-full'
            id='name'
            autoFocus
          ></input>
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="email">Email</label>
          <input type="email"
            {...register('email', {
              required: 'Digite seu email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Por favor digite um email válido',
              },
            })}
            className='w-full'
            id='email'
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="password">Senha</label>
          <input type="password"
            {...register('password', {
              required: 'Digite sua senha',
              minLength: { value: 6, message: 'Senha deve ser maior do que 5 caractéres' },
            })}
            className='w-full'
            id='password'
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input type="password"
            {...register('confirmPassword', {
              required: 'Confirme sua senha',
              validate: (value) => value === getValues('password'),
              minLength: { value: 6, message: 'Senha deve ser maior do que 5 caractéres' },
            })}
            className='w-full'
            id='confirmPassword'
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">A senha não confere</div>
            )}
        </div>
        <div className='mb-4'>
          <button className='primary-button' disabled={loading}>
            {loading ? 'Carregando...' : 'Cadastrar'}
          </button>
        </div>
        <div className='mb-4'>
          Já possui conta? &nbsp;
          <Link className='font-semibold' href='/login'>Acessar</Link>
        </div>
      </form>
    </Layout>
  )
}

export default RegisterScreen