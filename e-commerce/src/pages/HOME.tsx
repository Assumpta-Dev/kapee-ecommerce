import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar, FaExchangeAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PriceBadge from "../components/PriceBadge";
import ProductCard from "../components/ProductCard";
import "../App.css";
import { categoryAPI } from "../api/apiCategoryNew";
import { productAPI } from "../api/apiProductNew";

const slides = [
  {
    img: "./1 (6).jpg",
    tag: "New Collections",
    title: "MEN'S FASHION",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: "./1 (30).jpg",
    tag: "Festive Feast",
    title: "Summer Sale is On its Way",
    desc: "Min. 50% Off",
  },
  {
    img: "./1 (7).jpg",
    tag: "New collections 2026",
    title: "WOMEN'S FASHION",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        categoryAPI.getAll(),
        productAPI.getAll()
      ]);
      
      setCategories(categoriesRes.data || []);
      setProducts(productsRes.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const imagesScrollRef = useRef<HTMLDivElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const menScrollRef = useRef<HTMLDivElement>(null);
  const femaleScrollRef = useRef<HTMLDivElement>(null);
  const featured2ScrollRef = useRef<HTMLDivElement>(null);
  const featured3ScrollRef = useRef<HTMLDivElement>(null);
  const featured4ScrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: any) => {
    const categoryName = category.name || category.tag;
    navigate(`/categories?category=${encodeURIComponent(categoryName)}`);
  };

  // Filter products by category for different sections
  const menProducts = products.filter(p => 
    (p.categoryId?.name || '').toLowerCase().includes('men') ||
    (p.name || '').toLowerCase().includes('men') ||
    (p.description || '').toLowerCase().includes('men')
  );
  
  const womenProducts = products.filter(p => 
    (p.categoryId?.name || '').toLowerCase().includes('women') ||
    (p.name || '').toLowerCase().includes('women') ||
    (p.description || '').toLowerCase().includes('women') ||
    (p.categoryId?.name || '').toLowerCase().includes('female')
  );

  // Main slider auto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Images section scroll functions
  const scrollImagesLeft = () => {
    if (imagesScrollRef.current) {
      imagesScrollRef.current.scrollBy({
        left: -imagesScrollRef.current.offsetWidth / 8,
        behavior: "smooth",
      });
    }
  };

  const scrollImagesRight = () => {
    if (imagesScrollRef.current) {
      imagesScrollRef.current.scrollBy({
        left: imagesScrollRef.current.offsetWidth / 8,
        behavior: "smooth",
      });
    }
  };

  // Featured products scroll functions
  const scrollFeaturedLeft = () => {
    if (featuredScrollRef.current) {
      featuredScrollRef.current.scrollBy({
        left: -featuredScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  const scrollFeaturedRight = () => {
    if (featuredScrollRef.current) {
      featuredScrollRef.current.scrollBy({
        left: featuredScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  // Men fashion scroll functions
  const scrollMenLeft = () => {
    if (menScrollRef.current) {
      menScrollRef.current.scrollBy({
        left: -menScrollRef.current.offsetWidth / 3,
        behavior: "smooth",
      });
    }
  };

  const scrollMenRight = () => {
    if (menScrollRef.current) {
      menScrollRef.current.scrollBy({
        left: menScrollRef.current.offsetWidth / 3,
        behavior: "smooth",
      });
    }
  };

  // Female fashion scroll functions
  const scrollFemaleLeft = () => {
    if (femaleScrollRef.current) {
      femaleScrollRef.current.scrollBy({
        left: -femaleScrollRef.current.offsetWidth / 3,
        behavior: "smooth",
      });
    }
  };

  const scrollFemaleRight = () => {
    if (femaleScrollRef.current) {
      femaleScrollRef.current.scrollBy({
        left: femaleScrollRef.current.offsetWidth / 3,
        behavior: "smooth",
      });
    }
  };

  // Featured 2 scroll functions
  const scrollFeatured2Left = () => {
    if (featured2ScrollRef.current) {
      featured2ScrollRef.current.scrollBy({
        left: -featured2ScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  const scrollFeatured2Right = () => {
    if (featured2ScrollRef.current) {
      featured2ScrollRef.current.scrollBy({
        left: featured2ScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  // Featured 3 scroll functions
  const scrollFeatured3Left = () => {
    if (featured3ScrollRef.current) {
      featured3ScrollRef.current.scrollBy({
        left: -featured3ScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  const scrollFeatured3Right = () => {
    if (featured3ScrollRef.current) {
      featured3ScrollRef.current.scrollBy({
        left: featured3ScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  // Featured 4 scroll functions
  const scrollFeatured4Left = () => {
    if (featured4ScrollRef.current) {
      featured4ScrollRef.current.scrollBy({
        left: -featured4ScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  const scrollFeatured4Right = () => {
    if (featured4ScrollRef.current) {
      featured4ScrollRef.current.scrollBy({
        left: featured4ScrollRef.current.offsetWidth / 4,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <PriceBadge price={39} />
      {/* Main Slider */}
      <div className="w-full h-screen relative overflow-hidden bg-gray-100">
        <img
          src={slides[current].img}
          alt={slides[current].title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div
          key={current}
          className="absolute top-1/2 left-2 md:left-16 transform -translate-y-1/2 text-white space-y-4 z-10 animate-slide-in-left"
        >
          <p className="text-sm uppercase text-blue-600">
            {slides[current].tag}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl max-w-md">{slides[current].desc}</p>
          <Button text="SHOP NOW" />
        </div>

        {/* Main slider buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 p-3 rounded-full shadow z-20 cursor-pointer"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 p-3 rounded-full shadow z-20 cursor-pointer"
        >
          <FaChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Horizontal Scrollable 8-column Flex */}
      <div className="relative mt-8">
        {/* Fixed scroll buttons, only show on hover */}
        <button
          onClick={scrollImagesLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollImagesRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronRight className="text-2xl" />
        </button>

        {/* Scroll container */}
        {/* Scroll container */}
        <div
          ref={imagesScrollRef}
          className="flex gap-4 overflow-x-hidden my-4"
        >
          {categories.map((item: any, index: number) => (
            <div
              key={item._id || index}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
              style={{ width: `calc(100% / 8)` }}
              onClick={() => handleCategoryClick(item)}
            >
              <img
                src={item.image ? `http://localhost:7000${item.image}` : `https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=${encodeURIComponent(item.name)}`}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-full hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=${encodeURIComponent(item.name)}`;
                }}
              />
              <p className="mt-2 text-center text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/*featured products section*/}

      <div className="w-full min-h-[500px] relative mt-8 cursor-pointer ">
        <h3 className=" font-md m-4 text-4xl">
          <span className="inline-block border-b-2 border-blue-500">
            Featured Products
          </span>
        </h3>
        <button
          onClick={scrollFeaturedLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollFeaturedRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronRight className="text-2xl" />
        </button>

        {/* Scroll container */}
        <div
          ref={featuredScrollRef}
          className="flex gap-2 overflow-x-hidden m-4 "
        >
          {products.map((item, index) => (
            <div
              key={item._id || index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }}
            >
              <ProductCard product={item} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* Men Fashion*/}
      <div className="w-full min-h-[500px] grid grid-cols-[1fr_4fr] border-t-2 border-blue-800 m-4">
        <div className="flex flex-col gap-2 text-center border border-gray-300 ">
          <h3 className="w-full font-bold text-2xl text-blue-800 border border-gray-300 p-4">
            <span className="inline-block ">Men' Fashion</span>
          </h3>
          <p>Wallets</p>
          <p>T-Shirts</p>
          <p>Shirts</p>
          <p>Jeans</p>
          <p>Jackets & Coats</p>
        </div>

        <div className="  relative  mt-8 cursor-pointer  border border-gray-300 ">
          <button
            onClick={scrollMenLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={scrollMenRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FaChevronRight className="text-2xl" />
          </button>

          <div ref={menScrollRef} className="overflow-x-hidden m-4">
            <div
              className="
      grid grid-rows-2 grid-flow-col
      gap-4
       auto-cols-[calc(100%/3)] overflow-hidden
    "
            >
              {menProducts.slice(0, 9).map((item, index) => (
                <div key={item._id || index} className="w-full">
                  <ProductCard product={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*Female Fashion */}

      <div className="w-full min-h-[500px] grid grid-cols-[1fr_4fr] border-t-2 border-red-800 m-4">
        <div className="flex flex-col gap-2 text-center border border-gray-300 ">
          <h3 className="w-full font-bold text-2xl text-red-800 border border-gray-300 p-4">
            <span className="inline-block ">Women' Fashion</span>
          </h3>
          <p>Trousers & Capris</p>
          <p>Tops</p>
          <p>Shorts & Skirts</p>
          <p>Lingerie & Nightwear</p>
          <p>Jeans</p>
          <p>Dresses</p>
        </div>

        <div className="  relative  mt-8 cursor-pointer  border border-gray-300 ">
          <button
            onClick={scrollFemaleLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={scrollFemaleRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FaChevronRight className="text-2xl" />
          </button>

          <div ref={femaleScrollRef} className="overflow-x-hidden m-4">
            <div
              className="
      grid grid-rows-2 grid-flow-col
      gap-4
       auto-cols-[calc(100%/3)] overflow-hidden
    "
            >
              {womenProducts.slice(0, 9).map((item, index) => (
                <div key={item._id || index} className="w-full">
                  <ProductCard product={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-[500px] relative mt-8 cursor-pointer ">
        <h3 className=" font-md m-4 text-4xl">
          <span className="inline-block border-b-2 border-blue-500">
            Featured Products
          </span>
        </h3>
        <button
          onClick={scrollFeatured2Left}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollFeatured2Right}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronRight className="text-2xl" />
        </button>

        {/* Scroll container */}
        <div
          ref={featured2ScrollRef}
          className="flex gap-2 overflow-x-hidden m-4 "
        >
          {products.slice(0, 8).map((item, index) => (
            <div
              key={item._id || index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }}
            >
              <ProductCard product={item} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full min-h-[500px] relative mt-8 cursor-pointer ">
        <h3 className=" font-md m-4 text-4xl">
          <span className="inline-block border-b-2 border-blue-500">
            Featured Products
          </span>
        </h3>
        <button
          onClick={scrollFeatured3Left}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollFeatured3Right}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronRight className="text-2xl" />
        </button>

        {/* Scroll container */}
        <div
          ref={featured3ScrollRef}
          className="flex gap-2 overflow-x-hidden m-4 "
        >
          {products.slice(4, 12).map((item, index) => (
            <div
              key={item._id || index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }}
            >
              <ProductCard product={item} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full min-h-[500px] relative mt-8 cursor-pointer ">
        <h3 className=" font-md m-4 text-4xl">
          <span className="inline-block border-b-2 border-blue-500">
            Featured Products
          </span>
        </h3>
        <button
          onClick={scrollFeatured4Left}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollFeatured4Right}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <FaChevronRight className="text-2xl" />
        </button>

        {/* Scroll container */}
        <div
          ref={featured4ScrollRef}
          className="flex gap-2 overflow-x-hidden m-4 "
        >
          {products.slice(8).map((item, index) => (
            <div
              key={item._id || index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }}
            >
              <ProductCard product={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
