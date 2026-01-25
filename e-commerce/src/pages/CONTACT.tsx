// ContactUs.tsx
import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import PriceBadge from "../components/PriceBadge";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* Header / Banner */}
      <div
        className="relative flex flex-col items-center text-center gap-2 min-h-[200px] pt-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
        <div className="relative z-10 space-y-4">
          <h3 className="text-4xl text-white font-bold">Contact Us</h3>
          <p className="text-sm text-white">
            <a href="/#" className="hover:text-blue-300">
              HOME
            </a>{" "}
            / Contact Us
          </p>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[400px] rounded overflow-hidden">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Kigali,Rwanda&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      {/* Contact Form Section */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 bg-white">
        <div className="flex flex-col justify-center p-6 ">
          <h3 className="text-2xl font-bold mb-4">Send Us Message</h3>
          <p className="mb-4 text-gray-500">
            Contact us to get any support or help.
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/*Right Side  */}
        <div className="flex flex-col justify-center p-6 space-y-4">
          <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
          <p className="p-4 mb-4 border-b border-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pretium nisi feugiat nisi gravida, eget rutrum ligula placerat.
            Aenean id elit dolor. Suspendisse malesuada varius odio. Praesent
            efficitur, odio at dictum fringilla, leo dolor ornare nulla, quis
            condimentum enim arcu id magna. Phasellus congue hendrerit dolor id
            commodo. Suspendisse potenti.
          </p>
          <h3 className="text-2xl font-bold mb-4">Our Office</h3>
          <p className="flex items-center gap-2 ">
            <FaMapMarkerAlt className="text-blue-600 w-4 h-4"></FaMapMarkerAlt>{" "}
            Address : 105 Street,New City,United State.
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-blue-600 w-4 h-4"></FaPhoneAlt>
            Phone: (012) 345 9870
          </p>
          <p className="mb-4 border-b border-gray-500 flex items-center gap-2 pb-4">
            <FaEnvelope className=" text-blue-600 w-4 h-4"></FaEnvelope>
            Email: mail@example.com
          </p>

          <h3 className="text-2xl font-bold mb-4">Working Hours</h3>
          <p className="flex items-center gap-2">
            <FaClock className="text-gray-300"></FaClock> Monday - Friday 9am to
            7pm
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-gray-300"></FaClock>
            Saturday - 9am to 2pm
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-gray-300"></FaClock>
            Sunday - Closed
          </p>
        </div>
      </div>
      <div
        className="relative flex flex-col items-center text-center gap-2 min-h-[500px] pt-12 bg-cover bg-center "
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        <div className="absolute inset-0 bg-blue-700/60" /> {/* overlay */}
        <div className="relative z-10 space-y-4 m-auto">
          <h3 className="text-4xl text-white font-bold">
            Want to work with us?
          </h3>
          <p className="text-sm text-white">
            Feel free to reach us with the contact form!
          </p>
          <button className="mt-4 bg-white text-blue-700 px-6 py-3 rounded hover:bg-blue-600 hover:text-white font-medium transition cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
      <PriceBadge price={39} />
    </>
  );
};

export default ContactUs;

