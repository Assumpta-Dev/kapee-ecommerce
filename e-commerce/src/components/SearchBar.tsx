import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSearch, FaClock, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useBackendSearch } from '../hooks/useBackendSearch';
import { useCategories } from '../hooks/useApi';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { searchResults, searchHistory, saveToHistory } = useBackendSearch(debouncedSearchTerm);
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      saveToHistory(term);
      // Check if it's a category
      const category = categories.find((cat: any) => 
        (cat.name || cat.tag)?.toLowerCase() === term.toLowerCase()
      );
      
      if (category) {
        navigate(`/categories?category=${encodeURIComponent(category.name || category.tag)}`);
      } else {
        navigate(`/shop?search=${encodeURIComponent(term)}`);
      }
      setShowSearchDropdown(false);
      setSearchTerm('');
    }
  };

  const handleCategoryClick = (category: any) => {
    const categoryName = category.name || category.tag;
    navigate(`/categories?category=${encodeURIComponent(categoryName)}`);
    setShowCategoriesDropdown(false);
  };

  const handleResultClick = (result: any) => {
    if (result.type === 'category') {
      navigate(`/categories?category=${encodeURIComponent(result.name)}`);
    } else {
      navigate(`/product/${result.id}`);
    }
    setShowSearchDropdown(false);
    setSearchTerm('');
  };

  return (
    <div className="relative flex w-lg p-2 rounded-4xl bg-white shadow-xl justify-between text-gray-500 text-sm">
      <div className="w-full flex flex-4 items-center gap-2">
        {/* Search Input */}
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSearchDropdown(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
          placeholder="Search for products, categories, brands...."
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        />

        {/* Categories Dropdown */}
        <div className="relative">
          <p 
            className="flex flex-2 items-center justify-between px-4 border-l border-r border-gray-300 min-h-[30px] cursor-pointer hover:bg-gray-50"
            onMouseEnter={() => setShowCategoriesDropdown(true)}
            onMouseLeave={() => setShowCategoriesDropdown(false)}
          >
            All Categories <FaChevronDown />
          </p>

          {/* Categories Dropdown Menu */}
          {showCategoriesDropdown && !categoriesLoading && (
            <div 
              className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              onMouseEnter={() => setShowCategoriesDropdown(true)}
              onMouseLeave={() => setShowCategoriesDropdown(false)}
            >
              {categories.map((category: any) => (
                <div
                  key={category.id || category._id}
                  onClick={() => handleCategoryClick(category)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <img 
                    src={category.image || category.img} 
                    alt={category.name || category.tag}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700 hover:text-blue-600">{category.name || category.tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button 
          onClick={() => handleSearch(searchTerm)}
          className="flex p-2 hover:bg-blue-50 rounded"
        >
          <FaSearch className="w-4 h-4 text-blue-500" />
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showSearchDropdown && (searchTerm || searchHistory.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          
          {/* Search History */}
          {searchHistory.length > 0 && !searchTerm && (
            <div className="p-2 border-b border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2 px-2">Recent Searches</h4>
              {searchHistory.map((term, index) => (
                <div
                  key={index}
                  onClick={() => handleSearch(term)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                >
                  <FaClock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-700">{term}</span>
                </div>
              ))}
            </div>
          )}

          {/* Search Results */}
          {searchTerm && searchResults.length > 0 && (
            <div className="p-2">
              <h4 className="text-xs font-semibold text-gray-500 mb-2 px-2">Search Results</h4>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                >
                  {result.img && (
                    <img 
                      src={result.img} 
                      alt={result.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {/*<FaTag className={`w-3 h-3 ${result.type === 'category' ? 'text-blue-500' : 'text-green-500'}`} />*/}
                      <span className="text-gray-700">{result.name}</span>
                    </div>
                    {result.tag && (
                      <p className="text-xs text-gray-500">{result.tag}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 capitalize">{result.type}</span>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchTerm && searchResults.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {(showSearchDropdown || showCategoriesDropdown) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSearchDropdown(false);
            setShowCategoriesDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;