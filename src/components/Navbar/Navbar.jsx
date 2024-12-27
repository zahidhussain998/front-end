// Navbar.js

import React, { useState } from "react";
import { X } from 'lucide-react';
import Cart from "../Cart/Cart";
import { ShoppingCart } from 'lucide-react';


import TransitionLink from "../TransitionLink";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import SearchBar from "../SearchBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";





const ImagesMenu = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative flex justify-center max-w-screen-7xl overflow-visible"
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      <TransitionLink
        to="/products/1"
        label={label}
        className="text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base whitespace-nowrap"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-white z-50 rounded-md mt-8 p-8 shadow-slate-600 w-[80vw] ml-auto mr-auto flex flex-wrap gap-4 justify-center items-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center group w-full"
                >
                  <Link to="/products/1">

                <div>

                  <p className="text-lg mb-2  font-zahid font-semibold text-left mt-2 group-hover:text-gray-600">
                    {item.label}
                  </p>
                </div>
                  
                  </Link>

                  <Link
                    to="/products/1"
                    className="mb-4 transform transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-[100%] h-[100%] object-cover shadow-md"
                    />
                  </Link>
                  <Link
                  
                  to="/products/1"
                  >
                  
                  <ul className="text-left text-gray-600 text-sm mr-16 mt-2 hover:underline ">
                    {item.texts?.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                  </Link>
                  <ul className="text-center text-gray-600 text-xs space-y-1 mt-2 ">
                    {item.subItems?.map((subItem) => (
                      <li key={subItem}>{subItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};




const DropdownMenu = ({ label, items, hasImages = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      <TransitionLink
        to="/"
        label={label}
        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base whitespace-nowrap"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-10 bg-white rounded-md mt-5 p-8 shadow-lg ${hasImages ? 'w-96' : 'w-64'}`}
          >
            {hasImages ? (
              <div className="flex gap-4 max-w-7xl">
                {items.map((item) => (
                  <div 
                    key={item.label} 
                    className="flex flex-col items-center group"
                  >
                    <Link 
                      to={item.path} 
                      className="mb-2 transform transition-transform duration-300 hover:scale-105"
                    >
                      <img 
                        src={item.img} 
                        alt={item.label} 
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </Link>
                    <p className="text-sm text-center mt-2 group-hover:text-gray-600">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col ">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="block p-1 hover:bg-gray-100 text-sm  "
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const Navbar = ({onClose,}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
   
  const slideIn = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 250,
        damping: 60
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 50
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 300 },
    exit: { opacity: 0 }
  };

  const products = useSelector((state) => state.cart.products);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="text-white text-sm py-1 hidden md:flex justify-center bg-gray-900">
        <span className="font-zahid">Free shipping on orders over $50!</span>
        
      </div>
     
      {/* Main Navbar */}
      <div className="mx-auto px-5 py-3  w-full top-5 backdrop-blur-md bg-white/30 shadow-sm z-50 rounded-xl">
      <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: -10 }}
            className="flex items-center"
          >
            <img className="w-32 h-auto" src="/new1.png" alt="Logo" />
          </motion.div>

          {/* Logo */}

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 text-gray-700">
            <TransitionLink
              to="/"
              label="SHOP"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
            />
   



<DropdownMenu
              label="FRAGRANCES"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
              items={[
                { label: "Woody", path: "/products/1" },
                { label: "Fresh", path: "/products/1" },
                { label: "Earthy", path: "/products/1" },
                { label: "Fruity", path: "/products/1" },
                { label: "Floral", path: "/products/1",  },
                
              ]}
            />

<ImagesMenu
  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
  label="SCENTED CANDLES"
  items={[
    { 
      label: "Jasmine Home Candle", 
      path: "/collections/summer", 
      img: "/new.jpeg",
      texts: [
        "Lavender Home Candle",
        "Stress Therapy Home Candle",
        "Bakhoor Home Candle",
        "Jasmine Home Candle",
         " VIEW ALL"
      ]
    },
    { 
      label: "Deluxe Candles", 
      path: "/collections/winter", 
      img: "/newnew.jpeg",
      texts: ["Bloomy Mulberries Deluxe Candle", "Rain Deluxe Candle", "Stress Therapy Deluxe Candle",  " VIEW ALL"]
    },
    { 
      label: "Ocean Breeze", 
      path: "/collections/winter", 
      img: "/new2.jpeg",
      texts: [
        "Stress Therapy Deluxe Candle",
        "Bakhoor Deluxe Candle",
        "VIEW ALL"
      ]
    },
    { 
      label: "Lavender Chamomile", 
      path: "/collections/winter", 
      img: "/Leonardo_Phoenix_Create_an_image_of_the_D4_designer_aroma_cand_3.jpg",
      texts: [
      "Motia Shot Glass Candle",
    " Daffodil Shot Glass Candle",
    " Jasmine Shot Glass Candle",
    " Sparkling Blossoms Shot Glass Candle",
    " VIEW ALL"
      ]
    },
    { 
      label: "Rain Deluxe", 
      path: "/collections/winter", 
      img: "/Leonardo_Phoenix_Create_an_image_of_the_Rain_Deluxe_Candle_set_1.jpg",
      texts: [
        "Motia Shot Glass Candle",
        " Daffodil Shot Glass Candle",
        "Jasmine Shot Glass Candle",
        "Sparkling Blossoms Shot Glass Candle",
         " VIEW ALL"
      ]
    },
  ]}
/>
<ImagesMenu
  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
  label="NEW & TREANDING"
  items={[
    { 
      label: "Mulberries", 
      path: "/collections/summer", 
      img: "/233.jpg",
      texts: [
        "Rain 3 Wick Luxury Candle",
        " Rain Deluxe Candle",
        "Rain Home Candle",
       
      ]
    },


    // Rain Deluxe Candle
    // Stress Therapy Deluxe Candle
    // Bakhoor Deluxe Candle
    // VIEW ALL
    // 3 Wick Luxury Candles
    // Hunza Candle
    // Bakhoor 3 Wick Luxury Candle
    // Jasmine 3 Wick Luxury Candle
    // Bloomy Mulberries 3 Wick Luxury Candle
    // Lavender 3 Wick Luxury Candle
    // VIEW ALL
    // Shot Glass Candles
    // Hunza Candle
    // Motia Shot Glass Candle
    // Daffodil Shot Glass Candle
    // Jasmine Shot Glass Candle
    // Sparkling Blossoms Shot Glass Candle
    // VIEW ALL
    { 
      label: "Blue Horizon", 
      path: "/collections/summer", 
      img: "/new.jpeg",
      texts: [
        "Blue Horizon Deluxe Candle",
        "Blue Horizon Room & Linen Mist",
        "Blue Horizon Scenticks",
       
      ]
    },
    { 
      label: "Ruby Embers", 
      path: "/collections/summer", 
      img: "/new.jpeg",
      texts: [
        "Ruby Embers Home Candle",
        "Ruby Embers Deluxe Candle",
        "Ruby Embers Room & Linen Mist",
       
      ]
    },
      
    { 
      label: " Lavender Chamomile", 
      path: "/collections/summer", 
      img: "/new.jpeg",
      texts: [
        "Lavender Chamomile Home Candle",
        "Lavender Chamomile Scenticks",
       
      ]
    },
      
    { 
      label: "Agarwood", 
      path: "/collections/summer", 
      img: "/new.jpeg",
      texts: [
        "Agarwood Deluxe Candle",
        "Alpine Frost Scenticks",
       
      ]
    },
      
              ]}
            />
          
            <DropdownMenu
              label="PILLAR CANDLES"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
              items={[
                { label: "2.4x3 Pillar Candles", path: "/products/1" },
                { label: "2.4x4 Pillar Candles", path: "/products/1" },
                { label: "2.4x5 Pillar Candles", path: "/products/1" },
                { label: "3x3 Pillar Candles", path: "/products/1" },
                { label: "3x6 Pillar Candles", path: "/products/1",  },
                
              ]}
            />

            


          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
           

            <SearchBar className="" />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 dark:hover:bg-neutral-800 rounded-full relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
    <ShoppingCart />
    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {products.length}
                </span>
            
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="space-x-5 border-2 border-black hover:bg-slate-950 hover:text-white rounded-full py-1 px-3 text-black hidden lg:block p-2 font-zahid"
            >
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideIn}
              className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 shadow-xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-bold">Menu</h2>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col items-start space-y-4 p-4">
                  <DropdownMenu
                    label="Shop" 
                  />
                  <DropdownMenu
                    label="CANDLES"
                    items={[
                      { label: "Shop All", path: "/products/1" },
                      { label: "New Arrivals", path: "/products/1" },
                      { label: "Best Sellers", path: "/products/1" },
                    ]}
                  />
                  <TransitionLink
                    label="SCENTICKS"
                    items={[
                      { label: "Shop All", path: "/shop" },
                      { label: "New Arrivals", path: "/products/1" },
                      { label: "Best Sellers", path: "/products/1" },
                    ]}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
                  />
                  <TransitionLink
                    to="/products/1"
                    label="FRAGRANCES"
                    items={[
                      { label: "Shop All", path: "/shop" },
                      { label: "New Arrivals", path: "/products/1" },
                      { label: "Best Sellers", path: "/products/1" },
                    ]}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
