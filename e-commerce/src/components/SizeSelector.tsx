import { useState } from "react";

type SizeSelectorProps = {
  sizes: string[];
  onSizeSelect?: (size: string) => void;
};

const SizeSelector = ({ sizes, onSizeSelect }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);

  const handleSelect = (size: string) => {
    setSelectedSize(size);
    onSizeSelect?.(size);
  };

  const handleClear = () => {
    setSelectedSize("");
    onSizeSelect?.("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Size</h3>
        <button
          onClick={handleClear}
          className="text-sm text-gray-600 hover:text-blue-600 underline"
        >
          Clear
        </button>
      </div>
      <div className="flex items-center gap-3">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => handleSelect(size)}
            className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
              selectedSize === size
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            aria-label={`Select size ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
