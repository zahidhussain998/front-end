// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Star, Minus, Plus, Heart, Share2, ChevronDown } from 'lucide-react';
import useFetch from "../../Hooks/useFetch";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '@/store/cartReducer';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // To track the selected color
  const [isLiked, setIsLiked] = useState(false);

    const { id } = useParams();

  const { data, error } = useFetch(`/products/${id}?populate=*`);

  const handleShare = async () => {
    const productUrl = `${window.location.origin}/product/${id}`;
    try {
      await navigator.clipboard.writeText(productUrl);
      alert('Product link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };


  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };


 

    const handleLike = () => {
      setIsLiked(!isLiked);
    }
  
  
  const product = data;
  if (!product) {
    return <div>Loading...</div>;
  }
  
  const colars = product.colars || []; // Fetch the colors array

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setSubtotal(quantity * product.price)
  }, [quantity, product.price])

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const imageUrl = product.image1 && product.image1[0]?.formats?.medium?.url
    ? `${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.large.url}`
    : null;



    const sizes = Array.isArray(product.sizes)
    ? product.sizes.map(size => size.title || size.name) // Adjust based on your data
    : Object.values(product.sizes || {}).map(size => size.title || size.name);
    

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const disptch = useDispatch()


  const handleAddToCart = () => {
    disptch(add({
      id: product.id,
      title: product.title || product.name,
      description: product.description,
      img: imageUrl,
      price: product.price,
      quantity,
      size: selectedSize, // Include selected size
      color: selectedColor, // Include selected color
    }));
  };


  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row  gap-8">
        {/* Left side - Images */}
        <div className="md:w-1/2 sm:w-1/1">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={product.title}
              className="cursor-crosshair w-[95rem]  object-cover mb-6"
            />
          )}
             

             <div>
            
                
             </div>
          <div className=''>
            <img
              src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image?.formats?.medium?.url}`}
              alt={product.title}
              className="w-full aspect-[3/4] object-cover mb-6"
            />
          
          </div>
          <div className="mt-4 flex gap-2">
              <img
                src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image?.formats?.medium?.url}`}
                alt={product.title}
                className="cursor-crosshair w-16 h-16 object-cover border"
              />

{imageUrl && (
            <img
              src={imageUrl}
              alt={product.title}
              className="cursor-crosshair w-16 h-16 object-cover mb-6"
            />
          )}

            
          </div>
          
        </div>

        {/* Right side - Product details */}
        <div className="md:w-1/2 ">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400" fill="currentColor" size={20} />
            ))}
            <span className="ml-2 text-sm">4.1 review</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 font-zahid ">{product.title}</h1>
          <p className="mb-2 font-zahid py-3 ">{product.description}</p>
          <p className="mb-2 font-zahid ">{product.discription1}</p>
          <p className="text-2xl font-bold mb-4 font-zahid tracking-wider">{`Rs.${product.price}`}</p>
       {/* Color Swatches */}
       <div className="mb-4 py-1">
            <h3 className="font-bold mb-2 ">Colors:</h3>
            <div className="flex gap-2">
              {colars.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                    selectedColor === color ? "px-3 py-2 border-black" : " border-gray-50"
                  }`}
      style={{ backgroundColor: color.colar }} // Use the `colar` property for color
                ></div>
              ))}
            </div>
          </div>

   <div className='mb-2 font-extrabold' >
   <h3 className="font-bold mb-2">Sizes:</h3>
   <div className='flex gap-1'>
   {sizes.map((size, index) => (
  <button
    key={index}
    onClick={() => handleSizeSelect(size)}
    className={`px-4 py-2 border rounded-full font-zahid  mb-6 gap-3 ${
      selectedSize === size ? "bg-black text-white" : "bg-white text-black"
    }`}
  >
    {typeof size === 'string' ? size : JSON.stringify(size)} {/* Debug if necessary */}
  </button>
))}
   </div>
   </div>


  



          <div className="border-t">
            <div className="flex  gap-4 py-5">
              <span className="font-zahid">Subtotal:</span>
              <span className="font-zahid">Rs {subtotal}</span>
            </div>

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
            <button className="bg-black text-white px-6 py-2 flex-grow 
             border border-black 
         hover:bg-white hover:text-black hover:border-black 
         transition duration-300
            " onClick={handleAddToCart}>
              {/* TODO: implement the strapi */}
              ADD TO CART

            </button>
            <button
      className={`border p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
      onClick={handleLike}
    >
      <Heart size={20} />
    </button>
     <button
     className='border p-2 rounded-full'
      onClick={handleShare}
     >
      <Share2 size={20} />

     </button>

          </div>



          <div className="border-t pt-4  font-extrabold ">
      {/* About The Fragrance Section */}
      <details className="mb-2">
        <summary className="flex justify-between items-center cursor-pointer">
          <span className="font-bold">About The product</span>
          <ChevronDown size={20} />
        </summary>
        <p className="mt-2 text-sm">
        <span className='font-bold'>{product.productd}<br/></span>

        </p>
       
      </details>

      {/* Product Details Section */}
    

      {/* Disclaimer Section */}
      <details className="mb-2">
        <summary className="flex justify-between items-center cursor-pointer">
          <span className="font-bold">Disclaimer</span>
          <ChevronDown size={20} />
        </summary>
        <p className="mt-2 text-sm">
          - Never blow out the flame; always use the lid or a snuffer.<br />
          - Never move a lit candle.<br />
          - Burn the candle for a max of 1-2 hours at one time.<br />
          - Never leave a burning candle unattended.<br />
          - Avoid burning candles with 1 cm or less wax to prevent overheating the jar.<br />
          <span className="font-bold">Note:</span> Glass Jar candles disperse three times more fragrance, offering a more potent scent experience in contrast to pillar candles. Pillar candles provide an extended burn time with a milder fragrance compared to glass jar candles.<br />
          <span className="font-bold">Disclaimer:</span> These candles are hand-painted so they may vary in colour.
        </p>
      </details>

      {/* How to Use Section */}
      <details className="mb-2">
        <summary className="flex justify-between items-center cursor-pointer">
          <span className="font-bold">How to Use</span>
          <ChevronDown size={20} />
        </summary>
        <p className="mt-2 text-sm">
          - Remove all plastic wrapping before lighting the candle.<br />
          - Keep the candle away from moving air.<br />
          - Let the candle burn until the wax pool reaches the edges of the container.<br />
          - Use the lid to extinguish the flame & remove it after 1 minute.<br />
          - Carefully trim the wick to 0.5cm when relighting.<br />
          - Discontinue using when 1/4&quot; of wax is left.
        </p>
      </details>

      {/* Safety Instructions Section */}
      <details>
        <summary className="flex justify-between items-center cursor-pointer">
          <span className="font-bold">Safety Instructions</span>
          <ChevronDown size={20} />
        </summary>
        <p className="mt-2 text-sm">
          - Keep away from children & pets.<br />
          - Cover the top with the lid to protect it from dust.<br />
          - Extinguish the candle & clean the jar before relighting.<br />
          - Burn candles on a heat-resistant surface, away from drafts, and never leave them unattended.<br />
          - Wipe the glass gently with a damp cloth to remove dust and fingerprints.
        </p>
        
      </details>

      {/* Image Section */}
     
     
    </div>
    </div>
      </div>
    </div>
  );
};

export default ProductDetail;