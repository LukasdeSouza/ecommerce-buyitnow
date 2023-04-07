import Layout from '@/components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Unauthorized = () => {
  const router = useRouter()
  const { message } = router.query


  return (
    <Layout title={'Acesso Não Autorizado'}>
      <div className='text-center'>
        <h1 className='text-xl'>Acesso Não Autorizado</h1>
        {message &&
          <div className='mb-4 text-red-500'>
            <Link href='/login'>
              {message === 'login required' ? 'Efetue Login para acessar esta página' : message}
            </Link>
          </div>
        }
      </div>
    </Layout>
  )
}

export default Unauthorized