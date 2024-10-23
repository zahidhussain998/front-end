// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  { name: 'Bakhoor Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Jasmine Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Flower Bouquet Scenticks', price: 'Rs.3,900.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Daffodil Room & Linen Mist', price: 'Rs.1,800.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
  { name: 'Sparkling Blossoms Home Candle', price: 'Rs.2,500.00', image: 'https://hunzacandle.com/cdn/shop/files/Home-Candle-White-Stress-Therapy_570x.png?v=1716815656' },
];

function CustomProductCarouse() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1); // default for mobile

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="container mx-auto px-4 py-14 overflow-hidden">
      <article className="grid grid-cols-[1fr_auto_1fr] place-items-center mb-5">
       <span className="border-y w-full border-black"></span>
       <h1 className="text-2xl w-fit font-zahid font-bold">BEST SELLERS</h1>
       <span className="border-y w-full border-black"></span>
     </article>
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
              className={`w-full ${itemsPerPage === 5 ? 'sm:w-1/2 md:w-1/3 lg:w-1/5' : ''} flex-shrink-0 px-2 overflow-hidden`}
            >
              <div className="flex flex-col items-center">
                <Link to="/product/:id">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover mb-6"
                />
                
                </Link>
                <h3 className="text-sm font-semibold text-center mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev and Next Buttons */}
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
    </div>
  );
}

export default CustomProductCarouse;
