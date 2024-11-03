/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
import SearchBar from "../SearchBar";

// eslint-disable-next-line react/prop-types
const DropdownMenu = ({ label, items }) => {
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
            className="absolute z-10 bg-white shadow-lg rounded-md py-2 mt-2 w-48"
          >
            {items.map((item) => (
              <Link
                key={item.label}
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

const StickyHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="relative">
      {/* Top Bar */}
      <div className="text-white text-sm py-1 hidden md:flex justify-center bg-gray-900">
        <span>Free shipping on orders over $50!</span>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-12 w-full z-50">
        <div className="container mx-auto px-5 py-5 max-w-7xl backdrop-blur-md bg-white/30 shadow-sm">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: -10 }}
              className="flex items-center"
            >
              <img
                className="w-32 h-auto"
                src="new1.png"
                alt="Logo"
              />
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex justify-center flex-grow space-x-4 lg:space-x-8 text-gray-700">
              <DropdownMenu
                label="Shop"
                items={[
                  { label: "Shop All", path: "/shop" },
                  { label: "New Arrivals", path: "/shop/new-arrivals" },
                  { label: "Best Sellers", path: "/shop/best-sellers" },
                ]}
              />
              <DropdownMenu
                label="CANDLES"
                items={[
                  { label: "Shop All", path: "/products/1" },
                  { label: "New Arrivals", path: "/shop/new-arrivals" },
                  { label: "Best Sellers", path: "/shop/best-sellers" },
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
              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full"
              > */}
                <SearchBar/>
              {/* </motion.button> */}

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
            <nav className="hidden md:flex justify-center flex-grow space-x-4 lg:space-x-8 text-gray-700">
              <DropdownMenu
                label="Shop"
                items={[
                  { label: "Shop All", path: "/shop" },
                  { label: "New Arrivals", path: "/shop/new-arrivals" },
                  { label: "Best Sellers", path: "/shop/best-sellers" },
                ]}
              />
              <DropdownMenu
                label="CANDLES"
                items={[
                  { label: "Shop All", path: "/products/1" },
                  { label: "New Arrivals", path: "/shop/new-arrivals" },
                  { label: "Best Sellers", path: "/shop/best-sellers" },
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

            </div>
          </div>
        )}
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default StickyHeader;