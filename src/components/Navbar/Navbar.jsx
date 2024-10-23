// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import TransitionLink from "../TransitionLink";
import { motion } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="relative">
      {/* Top Bar */}
      <div className="text-white text-sm py-2 hidden md:flex justify-center bg-gray-900">
        <span>Free shipping on orders over $50!</span>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: -10 }}
              className="flex items-center py-1"
            >
              <Link to="/" className="text-gray-700 font-bold text-xl">
                <img className="h-16 md:h-24 w-auto" src="logo.png" alt="" />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex justify-center flex-grow space-x-4 lg:space-x-8 py-4 text-gray-700">
              {[
                { label: "SHOP", path: "/" },
                { label: "CANDLES", path: "/" },
                { label: "SCENTICKS", path: "/" },
                { label: "ROOM & LINEN MISTS", path: "/" },
                { label: "FRAGRANCES", path: "/" },
                { label: "PILLAR CANDLES", path: "/products/1" },
                { label: "NEW & TRENDING", path: "/" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 10, y: -30 }}
                  animate={{ opacity: 10, y: 10 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TransitionLink
                    to={item.path}
                    label={item.label}
                    className="hover:text-gray-400 text-black font-zahid text-sm lg:text-base whitespace-nowrap"
                  >
                    {item.label}
                  </TransitionLink>
                </motion.div>
              ))}
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
              <motion.div whileHover={{ scale: 1.1 }} className="space-x-5 bg-slate-900 rounded-full py-3 px-7 text-white">
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

            {/* Mobile Menu Button */}


           
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-100 py-4">
            <div className="flex flex-col items-center space-y-4">
              <a href="/" className="hover:text-gray-900">
                SHOP
              </a>
              <a href="#" className="hover:text-gray-900">
                SCENTED CANDLES
              </a>
              <a href="#" className="hover:text-gray-900">
                SCENTICKS
              </a>
              <a href="#" className="hover:text-gray-900">
                ROOM & LINEN MISTS
              </a>
              <a href="#" className="hover:text-gray-900">
                FRAGRANCES
              </a>
              <a href="#" className="hover:text-gray-900">
                PILLAR CANDLES
              </a>
              <a href="#" className="hover:text-gray-900">
                NEW & TRENDING
              </a>
            </div>
          </div>
        )}
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
