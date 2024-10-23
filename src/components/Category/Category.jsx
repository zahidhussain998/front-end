 // eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../container/Container';
import useFetch from '../../Hooks/useFetch'
import TransitionLink from '../TransitionLink';



// eslint-disable-next-line react/prop-types
function CustomProductCarousel({ type = "featured" }) {



  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1)  % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 ) % data.length);
  };

  const {data,loding, error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)

    const product = data;

  return (

<Container>

    <div className="container mx-auto px-4 py-14">
    <article className="grid grid-cols-[1fr_auto_1fr] gap-4 place-items-center mb-5">
       <span className="border-y w-full border-black mr-10"></span>
       <h1 className="text-2xl w-fit font-zahid font-bold">SHOP BY CATEGORY</h1>
       <span className="border-y w-full border-black ml-10"></span>
     </article>
      <div className="relative">
        <div className="flex overflow-x-hidden">
          {error ? "something went wrong" :loding ? "LODING..." : product.map((product, index) => (
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
    <img
      src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.large.url}`}
      alt={product.title}
      className="w-full aspect-[3/4] object-cover mb-6"
    />
  }
/>
                <h3 className="text-sm font-semibold text-center mb-2">{product.name || product.title}</h3>
                <p className="text-gray-600 text-sm">{product.price}</p>
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
      </div>
      <div className="flex justify-center mt-4">

</div>
    </div>
</Container>
    
  )}

export default CustomProductCarousel;