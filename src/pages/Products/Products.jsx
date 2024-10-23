/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect , memo} from "react";
import { Slider } from "@/components/ui/slider";
import List from "../../components/List/List";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import useFetch from "../../Hooks/useFetch";
import TransitionLink from "../../components/TransitionLink";
import { Checkbox } from "@/components/ui/checkbox"


function Products() {
  const [maxPrice, setMaxPrice] = useState(4500);
  const [showicon, setShowicon] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sort, setSort] = useState(null);

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
  console.log("Parsed catId:", catId);

  const { data } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4 md:p-8 gap-8">
        {/* Mobile Filter Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg"
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
              {/* Categories Filter */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg">ALL CATEGORIES</h2>
                {data.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between"
                  >
                    <TransitionLink to={`${category.id}`}>
                      <span>{category.title || category.name}</span>
                    </TransitionLink>
                    {category.expanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                ))}
              </div>
              {/* Availability Filter */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg">AVAILABILITY</h2>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="inStock" />
                  <label htmlFor="inStock">In Stock(3)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="outOfStock" />
                  <label htmlFor="outOfStock">Out Of Stock(0)</label>
                </div>
              </div>
              {/* Price Filter */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg">PRICE</h2>
                <input type="progress" className=""
                  defaultValue={[0, maxPrice]}
                  max={4500}
                  step={1}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span>{maxPrice}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={`Rs 0`}
                    className="border p-2 w-24"
                    onChange={(e) => setSort("asc")}
                  />
                  <span>to</span>
                  <input
                    type="text"
                    value={`Rs ${maxPrice}`}
                    className="border p-2 w-24 "
                    onChange={(e) => setSort("asc")}
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
        <div className="hidden md:block w-full md:w-1/4 space-y-6">
          <div className="text-sm breadcrumbs">
            <ul className="flex space-x-4">
              <li className="font-zahid">
                <Link to="/">Home</Link>
              </li>
              {catId && <li className="font-zahid">Category Name</li>}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-lg">ALL CATEGORIES</h2>
            {data && data.length > 0 ? (
              <ul className="space-y-2">
                {data.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center  font-zahid gap-3 tracking-tight hover:tracking-wide"
                  >
                    <input
                      type="checkbox"
                      id={item.id}
                      value={item.id}
                      onChange={handleChange}
                    />
                  
                      <button  onClick={handleChange}>{item.title || item.name}</button>
                  </li>
                ))}
                <div className="space-y-4">
                  <h2 className="font-bold text-lg">PRICE</h2>
                  <input
              type="range"
              min={0}
              max={4500}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={`Rs 0`}
                      className="border p-2 w-24"
                      onChange={(e) => setSort("asc")}
                    />
                    <span>to</span>
                    <input
                      type="text"
                      value={`Rs ${maxPrice}`}
                      className="border p-2 w-24"
                      onChange={(e) => setSort("asc")}
                    />
                  </div>
                  <button className="bg-black text-white w-full py-2">
                    APPLY
                  </button>
                </div>
              </ul>
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </div>

        <div className="w-full mt-12">
          <List catId={catId} selected={selected} maxPrice={maxPrice} sort={sort}/>
        </div>
      </div>
    </div>
  );
}

export default memo(Products);
