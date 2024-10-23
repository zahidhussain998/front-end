/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Link } from "react-router-dom";

import useFetch from "../../Hooks/useFetch";
import TransitionLink from "../TransitionLink";


function List({selected, catId, maxPrice}) {
  const [viewMode, setViewMode] = useState("grid-4");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState("best-selling");
  console.log('List component received catId:', catId);

  
    const { data, error, loding } = useFetch(
      `/products?populate=*&[filter][categories][id][$eq]=${catId}${selected.map(item => `&[filters][sub_categories][id][$eq]=${item}`)}&[filter][price][$lte]=${maxPrice}`
    );
  
    console.log('List component received data:', data);
  
    if (error) {
      console.error(`Error fetching data: ${error}`);
    } else {
      console.log(`Data: ${data}`);
    }

  
    // ...
  
  const getGridClass = () => {
    switch (viewMode) {
      case "grid-2":
        return "grid-cols-1 sm:grid-cols-2";
      case "grid-5":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
      case "grid-3":
        return "grid-cols-3 sm:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <>
    
    

    <div className="container mx-auto px-4 relative">
      <h1 className="text-3xl font-bold text-center mb-2">Stress Therapy</h1>
      <p className="text-center mb-8">
        Relax with calming lavender, which transforms into a soothing
        combination for a therapeutic experience.
      </p>

      {/* Mobile Filter Icon */}
     

      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <span className="text-sm">VIEW AS</span>NEW & TRENDING AV
          <button
            onClick={() => setViewMode("grid-2")}
            className={`p-2 ${viewMode === "grid-2" ? "bg-gray-200" : ""}`}
          >
            <LayoutList size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid-4")}
            className={`p-2 ${viewMode === "grid-4" ? "bg-gray-200" : ""}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid-5")}
            className={`p-2 ${viewMode === "grid-5" ? "bg-gray-200" : ""}`}
          >
            <LayoutGrid size={20} />
          </button>
        </div>
        <div className="flex items-center space-x-4 flex-wrap">
          <div className="flex items-center mb-2 sm:mb-0">
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
            <span className="text-sm mr-2">SORT BY</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-1"
            >
              <option value="best-selling">Best selling</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`grid ${getGridClass()} gap-6`}>
      {error ? "something went wrong" :loding ? "LODING..." : data.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
         <TransitionLink 
  key={item.documentId}
  to={`/product/${item.documentId}`} 
  label={
    <img
      src={`${import.meta.env.VITE_APP_UPLOAD_URL}${item.image1[0].formats.large.url}`}
      alt={item.title}
      className="w-full aspect-[3/4] object-cover mb-6"
    />
  }
/>
            <Link to={`/product/${item.id}`}>{item.title || item.name}</Link>
            <p className="font-bold">Rs{item.price}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}




export default List;
