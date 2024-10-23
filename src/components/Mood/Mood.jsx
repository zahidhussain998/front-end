/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState }  from 'react'


import useFetch from '../../Hooks/useFetch'
import TransitionLink from '../TransitionLink';



  
function Mood({ type = 'bestselling' }) {
     // eslint-disable-next-line no-unused-vars
     const [currentIndex, setCurrentIndex] = useState()
     // eslint-disable-next-line no-unused-vars
     const [itemsPerPage, setitemsPerPage] = useState(6)


     const {data} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)

    const products = data;

  return (
    <div className='mx-auto px-10 py-10'>
    <div className="container mx-auto px-4 py-14">
    <article className="grid grid-cols-[1fr_auto_1fr] place-items-center mb-5">
       <span className="border-y w-full border-black mr-10"></span>
       <h1 className="text-2xl w-fit font-zahid font-semibold">MOOD & WELLNESS SERIES</h1>
       <span className="border-y w-full border-black ml-10"></span>

     </article>
     <div className='flex justify-center items-center'>
     <span className='text-center'>
     Unleash the therapeutic prowess of our Aromatherapy Mood and Wellness Series,<br/>
your gateway to better well-being

     </span>

     </div>
        

        {/* main product */}
        
</div>
<div className="overflow-hidden relative">
        {/* Carousel Content */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {products.map((product, index) => (
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
      src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.large.url}`}
      alt={product.title}
      className="w-full aspect-[3/4] object-cover mb-6"
    />
  }
/>
                <h3 className="text-sm font-semibold text-center mb-2">{product.name || product.title}</h3>
                <p className="text-gray-600 text-sm">Rs{product.price}</p>
              </div>
            </div>
          ))}
        </div>

               </div>
        
        
        
    </div>
  )
}

export default Mood


