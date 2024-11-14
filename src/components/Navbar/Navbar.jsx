// Navbar.js

import React, { useState } from "react";
import { ShoppingBag, X } from 'lucide-react';
import Cart from "../Cart/Cart";

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

const DropdownMenu = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


 

  return (
    <div
      className="relative group "
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
            className="absolute z-10 bg-white rounded-md w-64 mt-3"
          >
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="block p-2 hover:bg-gray-100 font-zahid "
              >
                {item.label}
              </Link>
            ))}
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
      <div className="mx-auto px-5 py-3  w-full top-5 backdrop-blur-md bg-white/30 shadow-sm z-50 rounded-xl font-zahid">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: -10 }}
            className="flex items-center"
          >
            <img className="w-32 h-auto" src="new1.png" alt="Logo" />
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 text-gray-700">
            <TransitionLink
              to="/"
              label="SHOP"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
            />
            <DropdownMenu
              label="CANDLES"
              items={[
                { label: "Shop All", path: "/products/1" },
                { label: "New Arrivals", path: "/products/1" },
                { label: "Best Sellers", path: "/products/1" },
              ]}
            />
            <DropdownMenu
              label="SCENTICKS"
              items={[
                { label: "FRAGRANCES", path: "/products/1" },
                { label: "SCENTICKS", path: "/products/1" },
                { label: "SCENDED", path: "/products/1" },
              ]}
            />
            <TransitionLink
              to="/products/1"
              label="FRAGRANCES"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base"
            />
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <SearchBar className="" />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
<ShoppingBag />
<span className="absolute top-5 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {products.length}
                </span>
            
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="space-x-5 bg-slate-900 rounded-full lg:px-2 lg:py-2 px-1 py-1 text-white hidden lg:block p-2 "
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
