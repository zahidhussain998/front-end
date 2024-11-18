// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../container/Container';
import useFetch from '../../Hooks/useFetch';
import TransitionLink from '../TransitionLink';
import { fadeIn } from '../utils/variants';
import ParallaxText from '../utils/ParallaxText';
import { useDispatch } from 'react-redux';
import { add } from '@/store/cartReducer';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function CustomProduct({ type = 'featured' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1); // default for mobile
  const [quantity, setQuantity] = useState(0)
  const { data, loding, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);



  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const dispatch = useDispatch()

  


 



  const handle = (product) => {
    dispatch(add({
      id: product.id,
      title: product.name || product.title,
      price: product.price,
      img: `${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.large.url}`,
      description: product.description,
      quantity: quantity > 0 ? quantity : 1,
    }));
  };



  // Detect screen size and adjust itemsPerPage accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(5); // Show 5 products for larger screens
      } else {
        setItemsPerPage(1); // Show 1 product for smaller screens
      }
    };

    handleResize(); // Set initial items per page based on window size
    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
  }, []);


  return (
    <Container>
      <div className="container mx-auto px-4 py-14 overflow-hidden">
        <Container>
          <article className="grid grid-cols-[1fr_auto_1fr] place-items-center mb-5">
            <span className="border-y w-full border-gray-300 mr-12"></span>
            <h1 className="text-2xl w-fit font-zahid font-bold">
              {type.toUpperCase()}
            </h1>
            <span className="border-y w-full border-gray-300 ml-12"></span>
          </article>
        </Container>

        <motion.div
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="relative">

          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`
            }}
          >




            {error ? (
              "something went wrong"
            ) : loding ? (
              "LOADING..."
            ) : (
              data.map((product, index) => (
                // eslint-disable-next-line react/jsx-key
                <div key={index} className={`w-full ${itemsPerPage === 5 ? 'sm:w-1/2 md:w-1/3 lg:w-1/5' : ''} flex-shrink-0 px-2 overflow-hidden`}
                >
                  <div className="flex flex-col items-center"

                  >


                    <TransitionLink
                      key={product.documentId}
                      to={`/product/${product.documentId}`}
                      label={
                        <div className="relative group">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2"
                          >

                            <img
                              loading="lazy"
                              src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.large.url}`}
                              alt={product.title}
                              className="w-full aspect-[3/4] object-cover mb-3 hover:underline"
                            />


                          </motion.div>
                        </div>
                      }
                    />
                    <h3 className="text-sm font-semibold text-center mb-2 font-zahid">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-zahid">
                      Rs. {product.price.toFixed(2)}
                    </p>

                    <motion.div
                      
                      className="bg-black text-white py-3 px-8 sm:px-10 md:px-12 lg:px-16 mt-3 border border-black 
         hover:bg-white hover:text-black hover:border-black 
         transition duration-300 text-center">
                      <button className='whitespace-nowrap'

                        onClick={() => handle(product)}>Add To Cart</button>
                    </motion.div>
                  </div>
                </div>
              ))
            )}
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
      </div>
      <>
        {/* <section>
      <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
      <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
    </section> */}
      </>
    </Container>
  );
}

export default CustomProduct;