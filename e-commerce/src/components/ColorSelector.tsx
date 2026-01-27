import { useState } from "react";

type ColorOption = {
  name: string;
  value: string;
};

type ColorSelectorProps = {
  colors: ColorOption[];
  onColorSelect?: (color: ColorOption) => void;
};

const ColorSelector = ({ colors, onColorSelect }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colors[0]);

  const handleSelect = (color: ColorOption) => {
    setSelectedColor(color);
    onColorSelect?.(color);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-gray-900">Color</h3>
      <div className="flex items-center gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleSelect(color)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              selectedColor.value === color.value
                ? "border-blue-600 ring-2 ring-blue-600 ring-offset-2"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
