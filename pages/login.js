import Layout from '@/components/Layout'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getError } from '@/utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const LoginScreen = () => {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query

  const { handleSubmit, register, formState: { errors } } = useForm()

  const submitHandler = async ({ email, password }) => {
    try {
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
  }

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  return (
    <Layout>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Login</h1>
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
            autoFocus
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
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <button className='rounded bg-amber-300 py-2 mt-2 px-3 shadow outline-none hover:bg-amber-400 active:bg-amber-500 font-semibold w-1/5'>
            Entrar
          </button>
        </div>
        <div className='mb-4'>
          Não possui conta? &nbsp;
          <Link className='font-semibold' href='register'>Criar Conta</Link>
        </div>
      </form>
    </Layout>
  )
}

export default LoginScreen