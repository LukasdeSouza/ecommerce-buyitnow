import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

const LoginScreen = () => {
  return (
    <Layout>
      <form className='mx-auto max-w-screen-md'>
        <h1 className='mb-4 text-xl'>Login</h1>
        <div className='mb-4'>
          <label htmlFor="email">Email</label>
          <input type="email" className='w-full' id='email' autoFocus required />
        </div>
        <div className='mb-4'>
          <label htmlFor="password">Senha</label>
          <input type="password" className='w-full' id='password' autoFocus required />
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