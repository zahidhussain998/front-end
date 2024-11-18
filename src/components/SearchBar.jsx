// SearchBar.js
import React, { useState, useRef } from 'react';
import { Search as SearchIcon, X as CloseIcon, Search, X } from 'lucide-react';
import useFetch from '../Hooks/useFetch';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area"

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const searchUrl = searchQuery ? `/products?populate=*&filters[title][$containsi]=${searchQuery}` : null;
  const { data: searchResults, loading: isLoading } = useFetch(searchUrl);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  };

  return (
    <div>
      {/* Search Icon Button */}
      <button onClick={toggleSearch} className="p-2 rounded-sm">
      <Search />

      </button>

      {/* Full-Screen Overlay Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4 border-y w-full border-black "
          >
            <div className="relative w-full max-w-[100rem]">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full border-none px-4 py-2"
                  ref={searchInputRef}
                  autoFocus
                />
                <hr />
                <button onClick={toggleSearch} className="p-2">
                <X />

                </button>
              </div>

              {/* Search Results */}

              {searchQuery && (
                <div className="absolute top-full mt-2 bg-white shadow-md rounded-md overflow-y-auto max-h-96 w-full z-20">
                  {isLoading ? (
                    <div className="p-4 text-gray-500">Loading...</div>
                  ) : searchResults?.length > 0 ? (
                    <ul>
                      {searchResults.map((product) => (
                        <ScrollArea key={product.id} className="p-4 border-b last:border-none">
                          <div className='flex'>

                          <Link to={`/product/${product.documentId}`} className="flex gap-4">
                            <img
                              src={`${import.meta.env.VITE_APP_UPLOAD_URL}${product.image1[0].formats.large.url}`}
                              alt={product.title}
                              className="w-16 h-16 object-cover"
                            />
                          </Link>
                          <div className='ml-4'>
                            <span className="text-black hover:underline font-zahid ">{product.title || product.name}</span>
                            <span className='flex '>Rs {product.price}</span>

                          </div>
                          </div>
                            {/* <span className="text-black hover:underline font-zahid ml-16">{product.discription}</span> */}
                        </ScrollArea>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No products found</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
