import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Success = () => {
  const [session, setSession] = useState(null);
  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`/api/sessions/${sessionId}`);
        setSession(response.data);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  const amountPaid = session.amount_total ? (session.amount_total / 100).toFixed(2) : 0;
  const currency = session.currency ? session.currency.toUpperCase() : 'USD';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <motion.h1
          className="text-3xl font-bold text-green-600 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Payment Successful!
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg mb-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Thank you for your purchase.
        </motion.p>
        <motion.div
          className="text-gray-600 text-md"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="mb-1">Order ID: <span className="font-medium">{session.id}</span></p>
          <p className="mb-1">Amount Paid: <span className="font-medium">{amountPaid} {currency}</span></p>
        </motion.div>
        <motion.a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Continue Shopping
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Success;
