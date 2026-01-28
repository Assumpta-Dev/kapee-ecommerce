import React from 'react';

interface Category {
  name: string;
  count: number;
}

interface CategorySectionProps {
  title: string;
  categories: Category[];
  image: string;
  imageText?: string;
  titleColor?: string;
}

const CategoryModel: React.FC<CategorySectionProps> = ({
  title,
  categories,
  image,
  imageText,
  titleColor = 'text-[#1e73be]',
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
      {/* Sidebar Categories */}
      <div className="bg-white p-6 h-fit">
        <h3 className={`text-xl font-bold mb-6 ${titleColor}`}>{title}</h3>
        <ul className="space-y-3">
          {categories.map((cat, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-gray-700 hover:text-[#1e73be] transition-colors flex items-center justify-between"
              >
                <span>{cat.name}</span>
                {cat.count > 0 && <span className="text-sm text-gray-400">({cat.count})</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Banner Image */}
      <div className="lg:col-span-3 relative overflow-hidden bg-gray-100 rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {imageText && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-2">{imageText}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryModel;