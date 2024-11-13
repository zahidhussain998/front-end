/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState }  from 'react'

import {motion} from 'framer-motion'
import useFetch from '../../Hooks/useFetch'
import TransitionLink from '../TransitionLink';
import { fadeIn } from '../utils/variants';



  
function Mood({ type = 'Models' }) {
     // eslint-disable-next-line no-unused-vars
     const [currentIndex, setCurrentIndex] = useState()
     // eslint-disable-next-line no-unused-vars
     const [itemsPerPage, setitemsPerPage] = useState(6)


     const {data, loading, error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)

    const products = data;

  return (
    <motion.div
 
    
    className='mx-auto px-10 py-10'>
    <div className="container mx-auto px-4 py-14">
    <article className="grid grid-cols-[1fr_auto_1fr] place-items-center mb-5">
       <span className="border-y w-full border-black mr-10"></span>
       <h1 className="text-2xl w-fit font-zahid font-semibold">MOOD & WELLNESS SERIES</h1>
       <span className="border-y w-full border-black ml-10"></span>

     </article>
     <div className='flex justify-center items-center'>
     <span className='text-center font-zahid'>
     Unleash the therapeutic prowess of our Aromatherapy Mood and Wellness Series,<br/>
your gateway to better well-being

     </span>

     </div>
        

        {/* main product */}
        
</div>
<motion.div  
                 variants={fadeIn('right', 0.2)}
                 initial="hidden"
                 whileInView={"show"}
                 viewport={{ once: false, amount : 0.2 }}

className="overflow-hidden relative ">
        {/* Carousel Content */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {error ? "product's not found" : loading ? "loding..." :  products.map((product, index) => (
            <div
              key={index}
              className={`w-full ${itemsPerPage === 6 ? 'sm:w-1/2 md:w-1/3 lg:w-1/5' : ''} flex-shrink-0 px-2 overflow-hidden`}
            >
              <div className="flex flex-col items-center">
              <TransitionLink 
  key={product.documentId}
  to={`/product/${product.documentId}`} 
  label={
    <img
    src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1?.[0]?.formats?.large?.url || '/path/to/placeholder.jpg'}`}
    alt={product.title}
      className="w-full aspect-[3/4] object-cover mb-3"
    />
  }
/>
         
                <h3 className="text-sm font-semibold text-center mb-2 font-zahid">{product.name || product.title}</h3>
                <p className="text-gray-600 text-sm font-zahid">Rs. {product.price}</p>
              </div>
            </div>
          ))}
        </div>

               </motion.div>
        
        
        
    </motion.div>
  )
}

export default Mood


