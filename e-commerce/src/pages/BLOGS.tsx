import PriceBadge from "../components/PriceBadge";
import {FaUser, FaCalendar, FaSearch} from 'react-icons/fa'
const blogs = [
  {
    img: "./blog (1).jpg",
    tag: "Lifestyle, trip",
    title: "Do you Have A Passion for travelling",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 31, 2019
      </>
    ),
    desc: "Sed velit mattis ipsum mi, massa amet et libero,…",
  },
  {
    img: "./blog (2).jpg",
    tag: "Family, Lifestyle",
    title: "Taking pics with your family",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 30, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,.... ",
  },
  {
    img: "./blog (3).jpg",
    tag: "Travelling, Lifestyle",
    title: "What to know on the first flight?",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 29, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,....",
  },
  {
    img: "./blog (4).jpg",
    tag: "Ice Skating",
    title: "Ice skating lessons",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 27, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,....",
  },
  {
    img: "./blog (5).jpg",
    tag: "Time with friends",
    title: "Best ways to keep friends",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 24, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,....",
  },
  {
    img: "./blog (6).jpg",
    tag: "Family time",
    title: "Make the best memories with family",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 23, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,....",
  },
  {
    img: "./blog (7).jpg",
    tag: "Shopping time",
    title: "Tips of shopping with low budget",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 19, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,....",
  },
  {
    img: "./blog (8).jpg",
    tag: "Pocket money",
    title: "Manage your pocket mony well",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 18, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,....",
  },
  {
    img: "./blog (9).jpg",
    tag: "Leissure time",
    title: "Going for leissure ",
    validation: (
      <>
        <FaUser className="inline mr-1" />
        By Martin Gray:
        <FaCalendar className="inline ml-2 mr-1" />
        May 15, 2019
      </>
    ),
    desc: "Lorem ipsum, Sed velit mattis ipsum mi,....",
  },
];

function Blogs() {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-2 min-h-[200px] bg-gray-100 pt-12">
        <h3 className=" text-4xl text-gray-800 text-4xl font-bold">Our Blog</h3>
        <p className="text-sm">
          <a href="/#" className="hover:text-blue-500">
            HOME
          </a>{" "}
          / BLOG
        </p>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-[2fr_1fr] gap-8">
          {/* LEFT SECTION */}
          <div className="grid grid-cols-2 gap-8">
            {blogs.map((item, index) => (
              <div key={index} className="bg-white shadow-md">
                {/* Image + price */}
                <div className="relative overflow-hidden group cursor-pointer">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <PriceBadge price={39} />
                </div>

                {/* Content */}
                <div className="p-4 text-center gap-2">
                  <p className="text-blue-500 text-md font-medium uppercase">
                    {item.tag}
                  </p>

                  <h2 className="text-xl font-semibold mt-2">{item.title}</h2>

                  <p className="text-gray-600 mt-3 text-gray-100">
                    {item.validation}
                  </p>
                  <p className="text-gray-600 mt-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8 cursor-pointer">
            {/* Search */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search ..."
                className="w-full border px-4 py-2"
              />
              <button className="bg-blue-600 text-white px-4">
                <FaSearch></FaSearch>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button className="px-4 py-2 border-b-2 border-blue-600">
                Recent
              </button>
              <button className="px-4 py-2 text-gray-500">Popular</button>
            </div>

            {/* Recent posts */}
            <div className="space-y-4">
              {blogs.slice(0, 3).map((item, index) => (
                <div key={index} className="flex gap-3">
                  <img src={item.img} className="w-16 h-16 object-cover" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">May 27, 2019</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default Blogs;

