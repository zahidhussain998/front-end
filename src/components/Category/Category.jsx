// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../container/Container';
import useFetch from '../../Hooks/useFetch'
import TransitionLink from '../TransitionLink';
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/variants';


// eslint-disable-next-line react/prop-types
function CustomProductCarousel({ type = "Category" }) {



  const [currentIndex, setCurrentIndex] = useState(0);
  const [hover, setHover] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % data.length);
  };

  const { data, loding, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)

  const product = data;

  return (


    <div className='w-full max-w-7xl mx-auto px-4'>

      <div

        className="container mx-auto px-4 py-14">
        <article className="grid grid-cols-[1fr_auto_1fr] gap-4 place-items-center mb-5">
          <span className="border-y w-full border-black "></span>
          <h1 className="text-2xl w-fit font-zahid font-bold">SHOP BY CATEGORY</h1>
          <span className="border-y w-full border-black"></span>
        </article>
        <motion.div
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="relative">
          <div className="flex overflow-x-hidden">
            {error ? "something went wrong" : loding ? "LODING..." : product.map((product, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex-shrink-0 px-2 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                <div className="flex flex-col items-center">

                  <TransitionLink
                    key={product.documentId}
                    to={`/products/1`}
                    label={
                      <div>
                        <motion.div
                          // whileHover={{ scale: 1.1 }}
                          // whileTap={{ scale: 0.9 }}
                          // className="p-2"
                          onMouseOver={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                          >


                          <img
                            src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1?.[0]?.formats?.large?.url || '/path/to/placeholder.jpg'}`}
                            alt={product.title}
                            className={`w-full aspect-[3/4] object-cover mb-3 hover:underline` }
                          />


                          {/* <img
                            src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image.formats.large.url}`}
                            alt={product.title}
                            className={`absolute top-0 left-0 w-full aspect-[3/4] object-cover transition-opacity duration-300 ${
                              hover ? 'opacity-100' : 'opacity-0'}`}
                          /> */}
                        </motion.div>


                      </div>
                    }
                  />
                  <h3 className="text-sm font-semibold text-center mb-2 font-zahid">{product.name || product.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
        <div className="flex justify-center mt-4">

        </div>
      </div>
    </div>


  )
}

export default CustomProductCarousel;