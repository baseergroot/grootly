import React from 'react'
import Link from 'next/link'

const HomePage = () => {
  return (
    <>
    <div className='w-[90vw] bg-blue-200/10 mx-auto mt-10 lg:mt-20 md:mt-30 py-5 px-5 text-center rounded-2xl'>
      <h1 className='text-3xl text-white font-bold pb-10'>Grootly</h1>
      <p className='font-bold text-white'>Welcome to Grootly, a simple URL shortener.</p>
      <p className='text-white py-3'>Quickly shorten and customize your URLs with ease. Our tool allows you to create user-friendly, memorable links for sharing across the web, all in a simple and efficient interface.</p>
    </div>
    <div>
      <ul className='flex items-center gap-10 text-white w-[90vw] bg-blue-200/10 py-7 mt-5 lg:mt-10 rounded-2xl justify-center mx-auto'>
              <li><Link target='_blank' href="https://www.github.com/baseergroot/grootly"><i className="ri-github-fill text-3xl"></i></Link></li>
              <li><Link className='bg-blue-500 px-4 py-2 rounded-2xl font-semibold' href="/shorten">Get Started</Link></li>
            </ul>
    </div>
    {/* Footer */}
  <footer className='pt-10 mt-5 lg:mt-30'>
    <p className='text-gray-100 text-center'>&copy; 2025 Grootly. All rights reserved.</p>
  </footer>
    </>
  )
}

export default HomePage
