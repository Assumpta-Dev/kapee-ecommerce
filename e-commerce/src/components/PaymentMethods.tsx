const PaymentMethods = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Guaranteed Safe Checkout
      </h3>
      <div className="grid grid-cols-6 gap-3">
        {/* AMEX */}
        <div className="bg-blue-900 rounded p-3 flex items-center justify-center">
          <span className="text-white font-bold text-sm">AMEX</span>
        </div>

        {/* Apple Pay */}
        <div className="bg-white border-2 border-gray-300 rounded p-3 flex items-center justify-center">
          <span className="text-gray-900 font-semibold text-sm">Apple Pay</span>
        </div>

        {/* Google Pay */}
        <div className="bg-white border-2 border-gray-300 rounded p-3 flex items-center justify-center">
          <span className="text-gray-900 font-semibold text-sm">G Pay</span>
        </div>

        {/* Mastercard */}
        <div className="bg-white border-2 border-gray-300 rounded p-3 flex items-center justify-center">
          <img src="/mastercard.png" alt="Mastercard" className="h-6 object-contain" />
        </div>

        {/* Shop Pay - placeholder */}
        <div className="bg-purple-700 rounded p-3 flex items-center justify-center">
          <span className="text-white font-bold text-xs">Pay</span>
        </div>

        {/* Visa */}
        <div className="bg-white border-2 border-gray-300 rounded p-3 flex items-center justify-center">
          <img src="/visa.png" alt="Visa" className="h-6 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
