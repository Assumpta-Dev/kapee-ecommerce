import { useEffect, useState } from "react";

type PriceBadgeProps = {
  price: number;
};

const PriceBadge = ({ price }: PriceBadgeProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // trigger subtle float animation
    const interval = setInterval(() => setAnimate((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed left-4 bottom-4 z-50 w-20 h-20 rounded-full bg-[#b0fc38] shadow-lg flex items-center justify-center text-white text-4xl font-bold
      transition-all duration-1000 ease-in-out cursor-pointer
      ${animate ? "translate-y-[-5px]" : "translate-y-[5px]"} 
      `}
    >
      ${price}
    </div>
  );
};

export default PriceBadge;
