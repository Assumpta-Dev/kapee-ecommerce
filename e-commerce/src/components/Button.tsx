type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      <button className="bg-white text-blue-500 px-4 py-2 rounded mt-4 font-bold hover:bg-blue-500 hover:text-white transition duration-300 border border-blue-500 cursor-pointer">
        {text}
      </button>
    </div>
  );
}
