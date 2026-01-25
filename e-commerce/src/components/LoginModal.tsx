import { FaEye } from "react-icons/fa";

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 w-[900px] max-w-[95%] bg-white rounded shadow-lg grid grid-cols-2 animate-scaleIn">
        {/* LEFT SIDE */}
        <div className="bg-blue-600 text-white  p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <p className="text-sm leading-relaxed">
            Get access to your Orders,
            <br />
            Wishlist and Recommendations.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-800 hover:text-black cursor-pointer"
          >
            ×
          </button>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Username/Email address"
              className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <FaEye className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-800">
                <input type="checkbox" className="bg-blue-600"/>
                Remember me
              </label>

              <a href="#" className="text-blue-600 hover:underline">
                Lost your password?
              </a>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition">
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
