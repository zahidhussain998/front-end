// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Search as SearchIcon, X as CloseIcon } from 'lucide-react';
import useFetch from '../Hooks/useFetch';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Update the API endpoint dynamically based on the search query
  const searchUrl = searchQuery ? `/products?populate=*&filters[title][$containsi]=${searchQuery}` : null;

  const { data: searchResults, loading: isLoading } = useFetch(searchUrl);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        {isSearchOpen ? (
          <div className="flex items-center gap-2 animate-slideIn">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleInputChange}
              className="w-64"
              autoFocus
            />
            <button
              onClick={toggleSearch}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleSearch}
            className="p-2 hover:bg-gray-100 rounded-sm"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isSearchOpen && searchQuery && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg border max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-gray-500">Loading...</div>
          ) : searchResults?.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Link to={`/product/${product.documentId}`} className="text-blue-600 hover:underline">
                    {product.title || product.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
