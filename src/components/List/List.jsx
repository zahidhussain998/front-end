/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { LayoutGrid, LayoutList, Share2, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import ViewListSharpIcon from '@mui/icons-material/ViewListSharp';
import ViewStreamSharpIcon from '@mui/icons-material/ViewStreamSharp';
import ViewColumnSharpIcon from '@mui/icons-material/ViewColumnSharp';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp';
import useFetch from "../../Hooks/useFetch";
import TransitionLink from "../TransitionLink";
import { useDispatch } from "react-redux";
import { add } from "@/store/cartReducer";

function List({ selected, catId, maxPrice, sort, minPrice }) {
  const [viewMode, setViewMode] = useState("grid-4");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState(sort || "asc");
  const [quantity, setQuantity] = useState(0)

 const dispatch = useDispatch()
 
 const buildFilterQuery = () => {
    const selectedCategories = selected.map(item => `&[filters][sub_categories][id][$eq]=${item}`).join("");
    return `/products?populate=*&[filter][categories][id][$eq]=${catId}${selectedCategories}&[filter][price][$lte]=${minPrice}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`;
  };

  const { data, error, loading } = useFetch(buildFilterQuery());

   const product = data

   const handleCart = (product) => {

    // Use optional chaining to safely access image URL or provide a default
    const imageUrl = product.image1?.[0]?.formats?.large?.url
        ? `${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.large.url}`
        : 'https://your-default-image-url.com/default-image.jpg'; // Replace with a valid default image URL

    dispatch(add({
        id: product.id,
        price:product.price,
        title: product.title || product.name,
        img: imageUrl,
        quantity: quantity > 0 ? quantity : 1,
    }));
};

  const getGridClass = () => {
    switch (viewMode) {
      case "grid-1":
        return "flex flex-col gap-4";
        case "grid-2":
          return "grid grid-cols-1 sm:grid-cols-2 gap-4";
      case "grid-5":
        return "grid-cols-1 lg:grid-cols-5";
      case "grid-3":
        return "grid-cols-3 sm:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    }
  };

  const renderProduct = (item) => {
    if (viewMode === "grid-1") {
      return (
        <div className="flex gap-8 p-4 hover:shadow-lg transition-shadow">
          {/* Image Container */}
          <div className="w-48 h-48 flex-shrink-0">
            <TransitionLink
              to={`/product/${item.documentId}`}
              label={
                <div>


                  <img
                    src={`${import.meta.env.VITE_APP_UPLOAD_URL}${item.image1[0]?.formats?.large?.url}`}
                    alt={item.title || "Product Image"}
                    className={`w-full h-full object-fit`}
                  />
                 
                </div>
              }
            />
          </div>
          <div className="flex flex-col flex-grow justify-between">
            <div>
              <Link to={`/product/${item.id}`} className="text-xl font-semibold mb-1 block font-zahid">
                {item.title || item.name}
              </Link>
              <p className="text-gray-600 font-zahid mb-4">{item.discription}</p>

              <div className="flex items-center gap-4">
                <span className="text-lg font-bold font-zahid">Rs {item.price}</span>
                <button onClick={() => handleCart(item)} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 font-zahid">
                  ADD TO CART
                </button>
              </div>
            </div>
            
              
              {/* <div className="flex gap-3">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Share2 size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ArrowUp size={20} />
                </button>
              </div> */}
          </div>
          
          {/* Content Container */}
        </div>
      );
    }

    // Default grid view
    return (
      <div className="flex flex-col items-center ">
        <TransitionLink
          key={item.documentId}
          to={`/product/${item.documentId}`}
          label={
            <>
            
            <img
              src={`${import.meta.env.VITE_APP_UPLOAD_URL}${item.image1[0]?.formats?.large?.url}`}
              alt={item.title || "Product Image"}
              className="w-full aspect-[3/4] object-cover mb-6"
            />
          
            </>
          }
        />
        <Link to={`/product/${item.id}`} className="font-semibold font-zahid text-nowrap">
          {item.title || item.name}
        </Link>
        {/* <p>{item.description}</p> */}
        <p className="font-bold font-zahid">Rs {item.price}</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 relative font-zahid">
      <h1 className="text-3xl font-bold text-center mb-2">Stress Therapy</h1>
      <p className="text-center mb-8 font-zahid">
        Relax with calming lavender, which transforms into a soothing combination for a therapeutic experience.
      </p>

      <div className="flex justify-between items-center mb-6 flex-wrap font-zahid">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <span className="text-sm font-zahid sm:flex justify-center items-center">VIEW AS</span>
          <button
            onClick={() => setViewMode("grid-1")}
            className={`p-2 ${viewMode === "grid-1" ? "bg-gray-200" : ""}`}
          >
            <ViewListSharpIcon size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid-2")}
            className={`sm:block  p-2 ${viewMode === "grid-2" ? "bg-gray-200" : ""}`}
          >
            <ViewStreamSharpIcon size={20} />
          </button>

          <button
            onClick={() => setViewMode("grid-3")}
            className={` hidden lg:block  p-2 ${viewMode === "grid-3" ? "bg-gray-200" : ""}`}
          >
            <ViewColumnSharpIcon size={30} />
          </button>
          <button
            onClick={() => setViewMode("grid-4")}
            className={`hidden lg:block p-2 ${viewMode === "grid-4" ? "bg-gray-200" : ""}`}
          >
            <WindowSharpIcon size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid-5")}
            className={`hidden lg:block p-2 ${viewMode === "grid-5" ? "bg-gray-200" : ""}`}
          >
            <ViewModuleSharpIcon size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-4 flex-wrap">
          <div className="flex items-center mb-2 sm:mb-0 sm:mt-2">
            <span className="text-sm mr-2">ITEMS PER PAGE</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border p-1"
            >
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={60}>60</option>
            </select>
          </div>

          <div className="flex items-center">
            <span className="text-sm font-zahid">SORT BY</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-1"
            >
              <option value="desc">Latest</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className={viewMode === "grid-1" ? "flex flex-col gap-4" : `grid ${getGridClass()} gap-6`}>
        {error ? (
          <p>Something went wrong</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div key={item.id}>
              {renderProduct(item)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default List;