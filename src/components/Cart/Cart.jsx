/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { restCart, remove } from "@/store/cartReducer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import {loadStripe} from '@stripe/stripe-js';
import { makeReq } from "../../../makeReq";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Cart({isOpen, onClose}) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
 



  const total = () => {
    let intially = 0;

    products.forEach((item) => (intially += item.quantity * item.price));
    return intially.toFixed(2);
  };

  const stripePromise = loadStripe('pk_test_51QAC6P07G9XG7AOiLGyotQnF7YaLAGa0Re3sRK3mmoIunY7JOBbLFyT0PNuHvAlQiBm6dbO2U4ouDLSG73ejHEUP00p7osUFKM');

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      // Sending order data to backend
      const res = await makeReq.post("/orders", {
        data: {
          products,
        }
      });

      // Redirect to Stripe Checkout
      const sessionId = res.data.stripeSessionId;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error('Payment error:', err);
    }
  };


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

  return (
    <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />

        {/* Cart Panel */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideIn}
          className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-xl z-50"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Shopping Cart</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {products.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product, id) => (
                    <motion.div
                      key={id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex items-start space-x-4 border-b pb-4"
                    >
                      <img
                        className="w-20 h-20 object-cover rounded"
                        src={product.img}
                        alt={product.title}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-zahid font-bold text-sm">{product.title}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {product.dec?.substring(0, 50)}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            Rs {product.price}
                          </span>
                          <span className="text-sm">Qty: {product.quantity}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch(remove(product.id))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {products.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Subtotal:</span>
                  <span className="font-bold">Rs {total()}</span>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <Button
                    onClick={handlePayment}
                    className="w-full bg-black hover:bg-gray-800"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => dispatch(restCart())}
                  >
                    Clear Cart
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  );
}

export default Cart;