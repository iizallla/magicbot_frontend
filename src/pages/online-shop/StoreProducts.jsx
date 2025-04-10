import { Youtube } from "lucide-react";
import AmountCard from "./components/AmountCard";
import { useEffect, useState } from "react";

function StoreProducts() {
  const [productsNumber, setproductsNumber] = useState(0);
  const [holeItms, setHoleItms] = useState(0);
  const [price, setPrice] = useState(0);

  const data = [
    {
      id: 1,
      title: "iphone",
      price: 17000000,
      items: 58,
    },
    {
      id: 2,
      title: "iphone",
      price: 17000000,
      items: 58,
    },
  ];
  //   data.map((item) => {
  //     setHoleItms(holeItms + item.items);
  //   });
  useEffect(() => {
    data.map((item) => {
      setHoleItms(holeItms + item.items);
      setPrice(price + item.price);
    });
    setproductsNumber(data.length);
  }, []);
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <p>Products</p>
        <div className="flex items-center gap-3">
          <button className="bg-blue-500 flex items-center gap-2 text-white py-2 px-5 rounded-xl">
            <Youtube />
            Managing
          </button>
          <button className="bg-blue-500 text-white py-2 px-5 rounded-xl">
            Add new product
          </button>
        </div>
      </div>
      <div className="flex gap-5 mt-10">
        <AmountCard title={"Number of products"} number={productsNumber} />
        <AmountCard title={"The amount number of products"} number={holeItms} />
        <AmountCard title={"Price of hole products"} number={price} />
      </div>
    </>
  );
}
export default StoreProducts;
