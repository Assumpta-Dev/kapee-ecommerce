import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useApi';

const CategoryController: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useCategories();

  const handleCategoryClick = (category: any) => {
    const categoryName = category.name || category.tag;
    navigate(`/categories?category=${encodeURIComponent(categoryName)}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-center gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-gray-200 animate-pulse mb-3"></div>
              <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-16 text-center">
        <p className="text-red-500">Error loading categories</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between gap-6 min-w-max">
        {categories.map((cat: any) => (
          <div 
            key={cat.id || cat._id} 
            className="relative group flex flex-col items-center cursor-pointer"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat.priceTag && (
              <div className="absolute -top-4 -left-2 z-20 bg-[#69a22d] text-white font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <span className="text-xs -mt-1 opacity-80">$</span>
                <span className="text-lg leading-none">39</span>
                <div className="w-2 h-2 rounded-full bg-white ml-1"></div>
              </div>
            )}
            <div className="w-28 h-28 rounded-full bg-white shadow-sm border border-gray-100 overflow-hidden mb-3 hover:shadow-md transition-shadow">
              <img 
                src={cat.image || cat.img} 
                alt={cat.name || cat.tag} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#1e73be] transition-colors">
              {cat.name || cat.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryController;