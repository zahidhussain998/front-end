
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import { ParallaxText } from '../utils/ParallaxText'
import { SocialIcon } from 'react-social-icons'


function Footer() {
  return (
    <div className='mt-80'>
      <footer className="bg-black">
        <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
          <div className="max-w-sm">
            <div className="mb-6 flex h-12 items-center space-x-2">
              <span className="text-2xl font-bold text-white">D4 designer  <span className="text-white">Aroma Candle</span>.</span>
            </div>
            <div className="text-white">illuminate your world with D4 Designer Aroma Candle Where Luxury Meets Comfort</div>
          </div>

          <div className="">
            <div className="mt-4 mb-2 font-medium xl:mb-4 text-white">CATEGORY</div>
            <nav aria-label="Footer Navigation" className="text-gray-500">
            <div className="text-gray-500 space-y-5">
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out space-y-3"
              >
Lavender Home Candle              </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
Stress Therapy Home Candle            </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
Bakhoor Home Candle              </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
jasmine Home Candle          </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
Stress Therapy Deluxe Candle
              </Link>
            </div>
            </nav>
          </div>
          <div className="">
            <div className="mt-4 mb-2 font-medium xl:mb-4 text-white">SUBCATEGORY</div>
            <nav aria-label="Footer Navigation" className="text-gray-500">
            <div className="text-gray-500 space-y-5">
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out space-y-3"
              >
Deluxe Candles
              </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
Aroma Candle              </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
Bloomy Mulberries Deluxe Candle
              </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
Rain Deluxe Candle              </Link>
              <br />
              <Link
                to="/products/1"
                className="text-white hover:text-white hover:underline transition duration-200 ease-in-out"
              >
Stress Therapy Deluxe Candle
              </Link>
            </div>
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
        <hr className="h-px my-8 bg-white border-0 dark:bg-white"/>
        <div className="bg-black">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-gray-500 sm:flex-row sm:justify-between sm:text-left">
            <div className="flex text-white">
              
              © 2022 Aroma Candle
              
            <div className="ml-3">
              <a className="" href="#">Privacy Policy</a>
              <span>|</span>
              <a className="" href="#">Terms of Service</a>


            </div>
               </div>

               <div className='space-x-3'>
                <SocialIcon url='https://youtube.com/@d4designersaromacandle?si=CqcjiaRnu2dQJHH1'style={{ height: 40, width: 40 }} bgColor='black' fgColor='white'/>
                <SocialIcon url=' https://www.facebook.com/share/17rtjg9ULq/?mibextid=LQQJ4d' style={{ height: 40, width: 40 }} bgColor='black' fgColor='white'/>
                <SocialIcon url='https://www.instagram.com/designers_aromacandle?igsh=aWx2a2ExanpsMndj&utm_source=qr' style={{ height: 40, width: 40 }}  bgColor='black' fgColor='white'/>
                <SocialIcon url='https://www.tiktok.com/@aroma_candle2024?_t=8rT5HYrfhqx&_r=1' style={{ height: 40, width: 40 }}  bgColor='black' fgColor='white'/>
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










