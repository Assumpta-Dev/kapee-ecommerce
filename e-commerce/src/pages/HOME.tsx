import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../App.css";
import PriceBadge from "../components/PriceBadge";
import { useCategories, useProducts } from "../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

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

const staticCategories = [
  { img: "./1 (8).jpg", tag: "Men" },
  { img: "./1 (1).jpg", tag: "Bags" },
  { img: "./1 (2).jpg", tag: "pants" },
  { img: "./1 (3).jpg", tag: "Trouser" },
  { img: "./1 (4).jpg", tag: "Party" },
  { img: "./1 (5).jpg", tag: "Shoes" },
  { img: "./1 (6).jpg", tag: "Men's complete" },
  { img: "./1 (31).jpg", tag: "Female shoes" },
  { img: "./1 (30).jpg", tag: "High hills" },
  { img: "./1 (16).jpg", tag: "Tops" },
  { img: "./1 (14).jpg", tag: "Female Pants" },
  { img: "./1 (10).jpg", tag: "Men's Fashion" },
];

function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  async function getCategories() {
    const response = await apiClient.get("category");
    return response.data;
  }

  async function getProducts() {
    const response = await apiClient.get("product");
    return response.data;
  }

  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: productsData,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });


  console.log(categoriesData);



  

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: products = [] } = useProducts();

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

  // Filter products for different sections
  const featured = [
    {
      img: "./1 (25).jpg",
      tag: "Men's Fashion",
      title: "Female shoes",
      rate: 4,
      price: "$99",
    },
    {
      img: "./1 (20).jpg",
      tag: "Female Bags",
      title: "Female shoes",
      rate: 4,
      price: "$70",
    },
    {
      img: "./1 (19).jpg",
      tag: "Female pants",
      title: "Female pants",
      rate: 4,
      price: "$13",
    },
    {
      img: "./1 (40).jpg",
      tag: "Trouser",
      title: "Trouser",
      rate: 4,
      price: "$100",
    },
    {
      img: "./1 (17).jpg",
      tag: "Party wear",
      title: "Party wear",
      rate: 4,
      price: "$70",
    },
    {
      img: "./1 (60).jpg",
      tag: "Girl's shoes",
      title: "Girl's shoes",
      rate: 4,
      price: "$43",
    },
    {
      img: "./1 (55).jpg",
      tag: "Men's complete",
      title: "Men's complete",
      rate: 4,
      price: "$99",
    },
    {
      img: "./1 (31).jpg",
      tag: "Female shoes",
      title: "Female shoes",
      rate: 4,
      price: "$74",
    },
    {
      img: "./1 (30).jpg",
      tag: "High hills",
      title: "High hills",
      rate: 4,
      price: "$30",
    },
    { img: "./1 (74).jpg", tag: "Tops", title: "Tops", rate: 4, price: "$55" },
    {
      img: "./1 (23).jpg",
      tag: "Female Pant",
      title: "Female Pant",
      rate: 4,
      price: "$55",
    },
    {
      img: "./1 (51).jpg",
      tag: "Men's Fashion",
      title: "Men's Fashion",
      rate: 4,
      price: "$39",
    },
  ];
  const men = [
    {
      img: "./1 (3).jpg",
      tag: "Men's Fashion",
      title: "Trouser",
      rate: 4,
      price: "$99",
    },
    {
      img: "./1 (4).jpg",
      tag: "Men's Fashion",
      title: "Complete for men",
      rate: 4,
      price: "$70",
    },
    {
      img: "./1 (6).jpg",
      tag: "Men Pants",
      title: "Good every season",
      rate: 4,
      price: "$13",
    },
    {
      img: "./1 (12).jpg",
      tag: "Trouser",
      title: "Trouser",
      rate: 4,
      price: "$100",
    },
    {
      img: "./1 (9).jpg",
      tag: "Party wear",
      title: "Party wear",
      rate: 4,
      price: "$70",
    },
    {
      img: "./1 (13).jpg",
      tag: "Girl's shoes",
      title: "Girl's shoes",
      rate: 4,
      price: "$43",
    },
    {
      img: "./1 (14).jpg",
      tag: "Men's complete",
      title: "Men's complete",
      rate: 4,
      price: "$99",
    },
    {
      img: "./1 (10).jpg",
      tag: "Men's Fashion",
      title: "Get it now",
      rate: 4,
      price: "$74",
    },
    {
      img: "./1 (11).jpg",
      tag: "Men's Fashion",
      title: "Boss man",
      rate: 4,
      price: "$30",
    },
  ];
  const female = [
    {
      img: "./1 (2).jpg",
      tag: "Men's Fashion",
      title: "Trouser",
      rate: 4,
      price: "$99",
    },
    {
      img: "./1 (7).jpg",
      tag: "Men's Fashion",
      title: "Complete for men",
      rate: 4,
      price: "$70",
    },
    {
      img: "./1 (14).jpg",
      tag: "Men Pants",
      title: "Good every season",
      rate: 4,
      price: "$13",
    },
    {
      img: "./1 (15).jpg",
      tag: "Trouser",
      title: "Trouser",
      rate: 4,
      price: "$100",
    },
    {
      img: "./1 (16).jpg",
      tag: "Party wear",
      title: "Party wear",
      rate: 4,
      price: "$70",
    },
    {
      img: "./1 (17).jpg",
      tag: "Girl's shoes",
      title: "Girl's shoes",
      rate: 4,
      price: "$43",
    },
    {
      img: "./1 (54).jpg",
      tag: "Men's complete",
      title: "Men's complete",
      rate: 4,
      price: "$99",
    },
    {
      img: "./1 (66).jpg",
      tag: "Men's Fashion",
      title: "Get it now",
      rate: 4,
      price: "$74",
    },
    {
      img: "./1 (68).jpg",
      tag: "Men's Fashion",
      title: "Boss man",
      rate: 4,
      price: "$30",
    },
  ];

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

  return (
    <>
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
          {(categoriesData?.length > 0 ? categoriesData : staticCategories).map(
            (item: any, index: number) => (
              <div
                key={item.id || item._id || index}
                className="flex-shrink-0 flex flex-col items-center cursor-pointer"
                style={{ width: `calc(100% / 8)` }}
                onClick={() => handleCategoryClick(item)}
              >
                <img
                  src={item.image || item.img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-full hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=${encodeURIComponent(item.name || item.tag)}`;
                  }}
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">
                  {item.name || item.tag}
                </p>
              </div>
            ),
          )}
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
          {(productsData?.length > 0 ? productsData : featured).map((item, index) => (
            <div
              key={item.id || item._id || index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }}
            >
              <div className="w-full flex flex-col justify-center items-start shadow-lg h-full border border-gray-200 p-2 ">
                <div className="relative w-full h-48">
                  <img
                    src={item.image || item.img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Product`;
                    }}
                  />
                  <FaHeart className="absolute top-2 right-8 text-white stroke-gray-400 stroke-[30]" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.category || item.tag}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.name || item.title}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 text-white bg-blue-500 px-2 rounded">
                  {item.rating || item.rate}{" "}
                  <FaStar className="inline-block text-white mb-1" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-800">
                  ${item.price} <span className="text-green-500">50 % off</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Men Fashion*/}
      <div className="w-full min-h-[500px] grid grid-cols-[1fr_2fr] border-t-2 border-blue-800 m-4">
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
              {men.map((item, index) => (
                <div key={index} className="w-full">
                  {/* CARD */}
                  <div className="flex flex-col gap-2">
                    <div className="relative h-48">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Men`;
                        }}
                      />
                      <FaHeart className="absolute top-2 right-2 text-white" />
                    </div>

                    <p className="text-sm text-gray-600">{item.tag}</p>
                    <p className="font-medium">{item.title}</p>

                    <div className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white px-2 rounded text-sm">
                        {item.rate}
                        <FaStar className="inline ml-1 mb-0.5" />
                      </span>
                      <span className="text-lg font-semibold">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*Female Fashion */}

      <div className="w-full min-h-[500px] grid grid-cols-[1fr_2fr] border-t-2 border-red-800 m-4">
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
      w-max
       auto-cols-[calc(100%/3)] overflow-hidden
    "
            >
              {female.map((item, index) => (
                <div key={index} className="w-full">
                  {/* CARD */}
                  <div className="flex flex-col gap-2">
                    <div className="relative h-48">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Women`;
                        }}
                      />
                      <FaHeart className="absolute top-2 right-2 text-white" />
                    </div>

                    <p className="text-sm text-gray-600">{item.tag}</p>
                    <p className="font-medium">{item.title}</p>

                    <div className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white px-2 rounded text-sm">
                        {item.rate}
                        <FaStar className="inline ml-1 mb-0.5" />
                      </span>
                      <span className="text-lg font-semibold">
                        {item.price}
                      </span>
                    </div>
                  </div>
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
          {featured.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }} // ensures 4 columns visible
            >
              <div className="w-full flex flex-col justify-center items-start shadow-lg h-full border border-gray-200 p-2 ">
                <div className="relative w-full h-48">
                  <img
                    src={item.img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <FaHeart className="absolute top-2 right-8 text-white stroke-gray-400 stroke-[30]" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.tag}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.title}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 text-white bg-blue-500 px-2 rounded">
                  {item.rate}{" "}
                  <FaStar className="inline-block text-white mb-1" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-800">
                  {item.price} <span className="text-green-500">50 % off</span>
                </p>
              </div>
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
          {featured.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }} // ensures 4 columns visible
            >
              <div className="w-full flex flex-col justify-center items-start shadow-lg h-full border border-gray-200 p-2 ">
                <div className="relative w-full h-48">
                  <img
                    src={item.img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <FaHeart className="absolute top-2 right-8 text-white stroke-gray-400 stroke-[30]" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.tag}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.title}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 text-white bg-blue-500 px-2 rounded">
                  {item.rate}{" "}
                  <FaStar className="inline-block text-white mb-1" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-800">
                  {item.price} <span className="text-green-500">50 % off</span>
                </p>
              </div>
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
          {featured.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ width: `calc(100% / 4)` }} // ensures 4 columns visible
            >
              <div className="w-full flex flex-col justify-center items-start shadow-lg h-full border border-gray-200 p-2 ">
                <div className="relative w-full h-48">
                  <img
                    src={item.img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <FaHeart className="absolute top-2 right-8 text-white stroke-gray-400 stroke-[30]" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.tag}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 ">
                  {item.title}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-800 text-white bg-blue-500 px-2 rounded">
                  {item.rate}{" "}
                  <FaStar className="inline-block text-white mb-1" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-800">
                  {item.price} <span className="text-green-500">50 % off</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
