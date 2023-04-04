import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + 'ButItNow' : "ButItNow"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
            <Link className='text-lg font-bold' href="/">
              butItnow
            </Link>
            <div>
              <Link className='p-2' href="/cart">
                Carrinho
              </Link>
              <Link className='p-2' href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>
          {children}
        </main>
        <footer className='flex h-10 justify-center items-center shadow-inner'>
          <p className='text-sm font-light'>Copyright &copy; 2023 LS Software </p>
        </footer>
      </div>
    </>
  )
}

export default Layout