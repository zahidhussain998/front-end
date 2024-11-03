// eslint-disable-next-line no-unused-vars
import React, {  useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../container/Container';
import useFetch from '../../Hooks/useFetch';
import TransitionLink from '../TransitionLink';

// eslint-disable-next-line react/prop-types
function CustomProduct({ type = 'bestselling' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { data, loding, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for each product card
  const productVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 py-14"
      >
        <Container>
          <article className="grid grid-cols-[1fr_auto_1fr] place-items-center mb-5">
            <span className="border-y w-full border-gray-300 mr-12"></span>
            <h1 className="text-2xl w-fit font-zahid font-bold">
              {type.toUpperCase()}
            </h1>
            <span className="border-y w-full border-gray-300 ml-12"></span>
          </article>
        </Container>

        <div className="relative">
          <div className="flex overflow-x-hidden">
            {error ? (
              "something went wrong"
            ) : loding ? (
              "LOADING..."
            ) : (
              data.map((product, index) => (
                <motion.div
                  key={index}
                  variants={productVariants}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex-shrink-0 px-2 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  <div className="flex flex-col items-center">
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
                              className="w-full aspect-[3/4] object-cover mb-6"
                            />
                          </motion.div>
                        </div>
                      }
                    />
                    <h3 className="text-sm font-semibold text-center mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Rs. {product.price.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
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
        </div>
      </motion.div>
    </Container>
  );
}

export default CustomProduct;