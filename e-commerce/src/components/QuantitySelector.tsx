import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

type QuantitySelectorProps = {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onQuantityChange?: (quantity: number) => void;
};

const QuantitySelector = ({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onQuantityChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-sm w-fit">
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="px-4 py-2 border-r border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <FaMinus className="text-gray-600 text-sm" />
      </button>
      <span className="px-6 py-2 font-medium text-gray-900 min-w-[60px] text-center">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="px-4 py-2 border-l border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <FaPlus className="text-gray-600 text-sm" />
      </button>
    </div>
  );
};

export default QuantitySelector;
