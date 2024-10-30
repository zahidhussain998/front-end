/* eslint-disable react/prop-types */
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import TransitionLink from "../TransitionLink";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const DropdownMenu = ({lable, items}) => {
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
        label={lable}
        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base whitespace-nowrap"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 bg-white shadow-lg rounded-md py-2 mt-2 w-48"
          >
            {items.map((item) => (
              <Link 
                key={item}
                to={item.path}
                className="block px-4 py-2 hover:bg-gray-100"
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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="relative">
      {/* Top Bar */}
      <div className="text-white text-sm py-1 md:flex justify-center  bg-gray-900">
        <span>Free shipping on orders over $50!</span>
      </div>

      {/* Main Navbar */}
      <div className="fixed top-0 w-full z-50 mt-2">
        <div className="container mx-auto px-5 py-5 max-w-7xl backdrop-blur-md bg-white/30 shadow-sm rounded-2xl 	">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: -10 }}
              className="flex items-center"
            >
              <img 
                className="h-20 w-auto object-contain " 
                src="new1.png" 
                alt="Logo" 
              />
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex justify-center flex-grow space-x-4 lg:space-x-8 text-gray-700">
              <DropdownMenu
                lable="Shop"
                items={[
                  { label: "Shop All", href: "/shop" },
                  { label: "New Arrivals", href: "/shop/new-arrivals" },
                  { label: "Best Sellers", href: "/shop/best-sellers" },
                ]}
              />
              <DropdownMenu
                lable="CANDLES"
                items={[
                  { label: "Shop All", href: "/shop" },
                  { label: "New Arrivals", href: "/shop/new-arrivals" },
                  { label: "Best Sellers", href: "/shop/best-sellers" },
                ]}
              />
              <TransitionLink
                to="/products/1"
                label="SCENTICKS"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base whitespace-nowrap"
              />
              <TransitionLink
                to="/products/1"
                label="ROOM & LINEN MISTS"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base whitespace-nowrap"
              />
              <TransitionLink
                to="/products/1"
                label="FRAGRANCES"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-zahid text-sm lg:text-base whitespace-nowrap"
              />
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4 text-gray-700">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <SearchIcon />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={toggleCart}
              >
                <ShoppingCartOutlinedIcon />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="space-x-5 bg-slate-900 rounded-full py-2 px-5 text-white"
              >
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </motion.div>

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
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/80 backdrop-blur-md py-4">
            <div className="flex flex-col items-center space-y-4">
              <a href="/" className="hover:text-gray-900">SHOP</a>
              <a href="#" className="hover:text-gray-900">SCENTED CANDLES</a>
              <a href="#" className="hover:text-gray-900">SCENTICKS</a>
              <a href="#" className="hover:text-gray-900">ROOM & LINEN MISTS</a>
              <a href="#" className="hover:text-gray-900">FRAGRANCES</a>
              <a href="#" className="hover:text-gray-900">PILLAR CANDLES</a>
              <a href="#" className="hover:text-gray-900">NEW & TRENDING</a>
            </div>
          </div>
        )}
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
























