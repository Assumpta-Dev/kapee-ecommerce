import PriceBadge from "../components/PriceBadge";

function SHOP(){
    return (
      <>
        <div className="flex flex-col items-center text-center gap-2 min-h-[200px] bg-gray-100 pt-12">
          <h3 className=" text-4xl text-gray-800 text-4xl font-bold">SHOP</h3>
          <p className="text-sm">
            <a href="/#" className="hover:text-blue-500">
              HOME
            </a>{" "}
            / SHOP
          </p>
          <PriceBadge price={39} />
        </div>
      </>
    );
}
export default SHOP;