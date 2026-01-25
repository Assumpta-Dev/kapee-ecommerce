type PaymentCardProps = {
  src: string;
  alt: string;
};

const PaymentCard: React.FC<PaymentCardProps> = ({ src, alt }) => {
  return (
    <div className="bg-white rounded-md shadow p-3 flex items-center justify-center">
      <img src={src} alt={alt} className="h-6 object-contain" />
    </div>
  );
};

export default PaymentCard;
