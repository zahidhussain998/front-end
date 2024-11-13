
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import { ParallaxText } from '../utils/ParallaxText'

function Footer() {
  return (
    <div>
        <footer className="bg-black">
  <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
    <div className="max-w-sm">
      <div className="mb-6 flex h-12 items-center space-x-2">
        <span className="text-2xl font-bold text-white">D4 designer  <span className="text-white">Aroma Candle</span>.</span>
      </div>
      <div className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad a officia ea expedita!</div>
    </div>
    
    <div className="">
<div className="mt-4 mb-2 font-medium xl:mb-4 text-white">Categories</div>
<div className="text-gray-500">
 <Link
 to="/products/1"
 className="text-white hover:text-gray-300 transition duration-200 ease-in-out"
 >
  Shop

 </Link>
 <br />
 <Link
 to="/products/1"
 className="text-white hover:text-gray-300 transition duration-200 ease-in-out"
 >
  candle

 </Link>
 <br/>
 <Link
 to="/products/1"
 className="text-white hover:text-gray-300 transition duration-200 ease-in-out"
 >
  CANDLES

 </Link>
 <br/>
 <Link
 to="/products/1"
 className="text-white hover:text-gray-300 transition duration-200 ease-in-out"
 >
  Shop

 </Link>
 <br/>
 <Link
 to="/products/1"
 className="text-white hover:text-gray-300 transition duration-200 ease-in-out"
 >
  Shop

 </Link>
</div>
</div> 
    <div className="">
      <div className="mt-4 mb-2 font-medium xl:mb-4 text-white">Links</div>
      <nav aria-label="Footer Navigation" className="text-gray-500">
        <ul className="space-y-3">
          <li><a className="hover:text-white hover:underline" href="#">Pricing</a></li>
          <li><a className="hover:text-white hover:underline" href="#">Demo</a></li>
          <li><a className="hover:text-white hover:underline" href="#">Press</a></li>
          <li><a className="hover:text-white hover:underline" href="#">Support Hub</a></li>
          <li><a className="hover:text-white hover:underline" href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
    <div className="">
      <div className="mt-4 mb-2 font-medium xl:mb-4 text-zinc-50">Subscribe to our Newsletter</div>
      <div className="flex flex-col">
        <div className="mb-4">
          <input type="email" className="focus:outline mb-2 block h-14 w-full rounded-xl bg-gray-200 px-4 sm:w-80 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Enter your email" />
          <button className="block rounded-xl bg-white px-6 py-3 font-medium text-black">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-black">
    <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-gray-500 sm:flex-row sm:justify-between sm:text-left">
      <div className="">© 2022 Aroma Candle | All Rights Reserved</div>
      <div className="">
        <a className="" href="#">Privacy Policy</a>
        <span>|</span>
        <a className="" href="#">Terms of Service</a>

        <div className='flex justify-center items-center h-30 w-40'>
  <img className='w-full h-full object-contain' src="pay.jpg" alt="image" />
</div>

      </div>
    </div>
    
  </div>
  {/* <p className="text-center text-5xl md:text-9xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">Aroma Candles</p> */}
  
  {/* <section>
      <ParallaxText baseVelocity={-100}>Framer Motion</ParallaxText>
      <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
    </section> */}
</footer>
    </div>
  )
}

export default Footer










