import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaClock,
  FaHome,
  FaChevronUp,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import PaymentCard from "./paymentCards";

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#172337] text-white p-6 relative">
      {/* MAIN GRID */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr] gap-6">
        {/* BRAND */}
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-bold">Kapee.</h3>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>

          <p className="flex items-center gap-2 text-sm">
            <FaHome /> Lorem Ipsum, 2046 Lorem Ipsum
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaPhone /> 576-245-2478
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope /> info@kapee.com
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaClock /> Mon – Fri / 9:00 AM – 6:00 PM
          </p>
        </div>

        {/* INFORMATION */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-bold">Information</h5>
          <p className="text-sm">About Us</p>
          <p className="text-sm">Store Location</p>
          <p className="text-sm">Contact Us</p>
          <p className="text-sm">Shipping & Delivery</p>
          <p className="text-sm">Latest News</p>
          <p className="text-sm">Our Sitemap</p>
        </div>

        {/* SERVICES */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-bold">Our Service</h5>
          <p className="text-sm">Privacy Policy</p>
          <p className="text-sm">Terms of Sale</p>
          <p className="text-sm">Customer Service</p>
          <p className="text-sm">Delivery Information</p>
          <p className="text-sm">Payments</p>
          <p className="text-sm">Saved Cards</p>
        </div>

        {/* ACCOUNT */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-bold">My Account</h5>
          <p className="text-sm">My Account</p>
          <p className="text-sm">My Shop</p>
          <p className="text-sm">My Cart</p>
          <p className="text-sm">Checkout</p>
          <p className="text-sm">My Wishlist</p>
          <p className="text-sm">Tracking Order</p>
        </div>

        {/* NEWSLETTER */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-bold">Newsletter</h5>
          <p className="text-sm">
            Subscribe to our mailing list to get the new updates!
          </p>

          <div className="flex border border-gray-300 rounded overflow-hidden bg-white">
            <div className="flex items-center flex-1 px-4">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 py-3 outline-none text-gray-700"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 hover:bg-blue-600">
              Subscribe
            </button>
          </div>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full text-[#1877F2] bg-white hover:opacity-70 hover:scale-105 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-full text-[#1DA1F2] bg-white hover:opacity-70 hover:scale-105 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full text-[#E4405F] bg-white hover:opacity-70 hover:scale-105 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="p-2 rounded-full text-[#FF0000] bg-white hover:opacity-70 hover:scale-105 transition"
            >
              <FaYoutube />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full text-[#0A66C2] bg-white hover:opacity-70 hover:scale-105 transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              aria-label="Pinterest"
              className="p-2 rounded-full text-[#BD081C] bg-white hover:opacity-70 hover:scale-105 transition"
            >
              <FaPinterestP />
            </a>

            <a
              href="mailto:info@kampee.com"
              aria-label="Email"
              className="p-2 rounded-full text-[#10B981] bg-white hover:opacity-70 hover:scale-105 transition"
            >
              <HiOutlineMail />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex justify-between items-center border-t border-gray-600 mt-8 pt-4">
        <p>Kapee © 2026 — All Rights Reserved.</p>

        <div className="flex gap-3">
          <PaymentCard src="/visa.png" alt="Visa" />
          <PaymentCard src="/paypal.png" alt="PayPal" />
          <PaymentCard src="/discover.png" alt="Discover" />
          <PaymentCard src="/maestro.png" alt="Maestro" />
          <PaymentCard src="/mastercard.png" alt="MasterCard" />
        </div>
      </div>

      {/* BACK TO TOP */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 w-12 h-12 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-lg hover:opacity-80 transition cursor-pointer"
        >
          <FaChevronUp className="text-xl" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
