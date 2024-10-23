// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Star, Minus, Plus, Heart, Share2, ChevronDown, Truck } from 'lucide-react';
import useFetch from "../../Hooks/useFetch";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '@/store/cartReducer';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { data, error } = useFetch(`/products/${id}?populate=*`);
  
  const product = data;
    console.log(product)
  if (!product) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const imageUrl = product.image1 && product.image1[0]?.formats?.medium?.url
    ? `${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.medium.url}`
    : null;


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const disptch = useDispatch()


    const handleAddToCart = () => {
      disptch(add({
        id: product.id,
        title: product.title || product.name,
        description: product.discription, // Note: 'description' is misspelled in your API response
        img: imageUrl,
        price: product.price,
        quantity,
      }));
    };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Images */}
        <div className="md:w-1/2">
          {imageUrl && (
            <img 
              src={imageUrl}
              alt={product.title}
              className="cursor-crosshair w-full aspect-[3/4] object-cover mb-6"
            />
          )}
          <div className="mt-4 flex gap-2">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={product.title}
                className="cursor-crosshair w-16 h-16 object-cover border"
              />
              
            )}
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="md:w-1/2">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400" fill="currentColor" size={20} />
            ))}
            <span className="ml-2 text-sm">1 review</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">Calming Lavender Meadow</p>
          <p className="mb-4">{product.discription}</p>
          <p className="text-2xl font-bold mb-4">{`Rs.${product.price}`}</p>

          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Make It A Gift?
            </label>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1">
                <Minus size={20} />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1">
                <Plus size={20} />
              </button>
            </div>
            <button className="bg-black text-white px-6 py-2 flex-grow" onClick={handleAddToCart}>
              {/* TODO: implement the strapi */}
              ADD TO CART
              
              </button>
            <button className="border p-2 rounded-full">
              <Heart size={20} />
            </button>
            <button className="border p-2 rounded-full">
              <Share2 size={20} />
            </button>
          </div>

          <div className="flex items-center text-sm mb-4">
            <Truck size={20} className="mr-2" />
            <span>Free Shipping</span>
          </div>

          <div className="border-t pt-4">
            <details className="mb-2">
              <summary className="flex justify-between items-center cursor-pointer">
                <span className="font-bold">About The Fragrance</span>
                <ChevronDown size={20} />
              </summary>
              <p className="mt-2 text-sm">
                {/* Add fragrance details here */}
              </p>
            </details>
            <details className="mb-2">
              <summary className="flex justify-between items-center cursor-pointer">
                <span className="font-bold">Product Details</span>
                <ChevronDown size={20} />
              </summary>
              <p className="mt-2 text-sm">
                {/* Add product details here */}
              </p>
            </details>
            <details>
              <summary className="flex justify-between items-center cursor-pointer">
                <span className="font-bold">Disclaimer</span>
                <ChevronDown size={20} />
              </summary>
              <p className="mt-2 text-sm">
                {/* Add disclaimer text here */}
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;