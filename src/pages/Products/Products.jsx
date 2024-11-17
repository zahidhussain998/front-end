/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, memo } from "react";
import { Slider } from "@/components/ui/slider";
import List from "../../components/List/List";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import useFetch from "../../Hooks/useFetch";
import TransitionLink from "../../components/TransitionLink";
import Container from '../../components/container/Container';

function Products() {
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minPrice, setMinPrice] = useState(0);
  const [showicon, setShowicon] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sort, setSort] = useState('asc');

  const handleChange = (e) => {
    const value = Number(e.target.value); // Convert value to a number
    const isChecked = e.target.checked;
    setSelected(
      isChecked
        ? [...selected, value]
        : selected.filter((item) => item !== value)
    );
  };

  const { id } = useParams();
  const catId = parseInt(id);
  const { data } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-8 font-zahid">
        {/* Mobile Filter Button */}
        <button
          className="md:hidden absolute mr-8 left-4 z-50 bg-white p-2 rounded-full shadow-lg"
          onClick={() => setShowicon(true)}
        >
          <Filter size={24} />
        </button>

        {/* Mobile Filter Sidebar */}
        {showicon && (
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <button onClick={() => setShowicon(false)} className="mb-4 pt-9">
                <X size={24} />
              </button>
              <h2 className="font-bold mb-2">Filters</h2>
              <div className="space-y-4">
                <h2 className="font-bold text-lg">ALL CATEGORIES</h2>
                {data && data.length > 0 ? (
                  <ul className="space-y-2">
                    {data.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 hover:tracking-wide">
                        <span>{item.title || item.name}</span>
                        <input
                          type="checkbox"
                          id={item.id}
                          value={item.id}
                          onChange={handleChange}
                        >

                        </input>
                      </li>
                    ))}
                    <div className="space-y-4">
                      <h2 className="font-bold text-lg">PRICE</h2>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="asc"
                          value="asc"
                          onChange={(e) => setSort("asc")}
                        />
                        <label htmlFor="asc">Price (Lowest first)</label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id="desc"
                          value="desc"
                          onChange={(e) => setSort("desc")}
                        />
                        <label htmlFor="desc">Price (Highest first)</label>
                      </div>
                    </div>
                  </ul>
                ) : (
                  <p>No categories found.</p>
                )}
              </div>
              {/* <div className="space-y-4">
                <h2 className="font-bold text-lg">AVAILABILITY</h2>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="inStock" />
                  <label htmlFor="inStock">In Stock(3)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="outOfStock" />
                  <label htmlFor="outOfStock">Out Of Stock(0)</label>
                </div>
              </div> */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg">PRICE</h2>
                <input
                  type="range"
                  min="100"
                  max="4500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    min="100"
                    max={maxPrice}
                    className="border p-2 w-24"
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={maxPrice}
                    min={minPrice}
                    max="4500"
                    className="border p-2 w-24"
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
                <button className="bg-black text-white w-full py-2">
                  APPLY
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Filters */}
        <div className="hidden md:block w-full md:w-1/4 space-y-6 sticky top-0 self-start">
          <div className="text-sm breadcrumbs">
            <ul className="flex space-x-4">
              <li><Link to="/">Home</Link></li>
              {catId && <li>Category Name</li>}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-lg font-zahid">ALL CATEGORIES</h2>
            {data && data.length > 0 ? (
              <ul className="space-y-2">
                {data.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 hover:tracking-wide">
                    <input
                      type="checkbox"
                      id={item.id}
                      value={item.id}
                      onChange={handleChange}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <button onClick={handleChange}>{item.title || item.name}</button>
                  </li>
                ))}
                <div className="space-y-4">
                  <h2 className="font-bold text-lg">PRICE</h2>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      min="0"
                      max={maxPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="border p-2 w-24"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      value={maxPrice}
                      min={minPrice}
                      max="4500"
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="border p-2 w-24"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4500"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full appearance-none h-2 bg-black rounded-lg cursor-pointer accent-black"
                    style={{
                      // Additional custom styles for browsers not fully supported by Tailwind
                      accentColor: 'black',
                    }}                  />
                  <span>Selected Range: Rs {minPrice} - Rs {maxPrice}</span>
                  <button
                    className="bg-black text-white w-full py-2 mt-4"
                  >
                    APPLY
                  </button>
                </div>

              </ul>
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </div>

        {/* Products List */}
        <div className="w-full">
          <List catId={catId} selected={selected} minPrice={minPrice} maxPrice={maxPrice} sort={sort} />
        </div>
      </div>
    </Container>
  );
}

export default memo(Products);
