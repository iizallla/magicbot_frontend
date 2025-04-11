import { Youtube } from "lucide-react";
import AmountCard from "./components/AmountCard";
import { useEffect, useState } from "react";

function StoreProducts() {
  const [products, setProducts] = useState([]);
  const [productsNumber, setProductsNumber] = useState(0);
  const [holeItms, setHoleItms] = useState(0);
  const [price, setPrice] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("storeProducts");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  // Update localStorage & summary stats when products change
  useEffect(() => {
    localStorage.setItem("storeProducts", JSON.stringify(products));

    let totalItems = 0;
    let totalPrice = 0;

    products.forEach((item) => {
      totalItems += item.items;
      totalPrice += item.price;
    });

    setHoleItms(totalItems);
    setPrice(totalPrice);
    setProductsNumber(products.length);
  }, [products]);

  // CREATE
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      img: "https://humo.fra1.cdn.digitaloceanspaces.com/magicbot/bestbuy/products/XKdn19DKTjggf6Kh8YqcDJWoDAYuMoxWKBdNANl6.jpg",
      title: `New iPhone ${products.length + 1}`,
      price: 17000000,
      items: 10,
    };
    setProducts([...products, newProduct]);
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const filtered = products.filter((item) => item.id !== id);
      setProducts(filtered);
    }
  };

  // UPDATE
  const handleUpdate = (id) => {
    const updatedProducts = products.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: item.title + " (Updated)",
          items: item.items + 1,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <p className="text-xl font-bold">Products</p>
        <div className="flex items-center gap-3">
          <button className="bg-blue-500 flex items-center gap-2 text-white py-2 px-5 rounded-xl">
            <Youtube />
            Managing
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-5 rounded-xl"
            onClick={addProduct}
          >
            Add new product
          </button>
        </div>
      </div>

      <div className="flex gap-5 mt-10">
        <AmountCard title={"Number of products"} number={productsNumber} />
        <AmountCard title={"The amount number of products"} number={holeItms} />
        <AmountCard
          title={"Price of whole products"}
          number={price.toLocaleString()}
        />
      </div>

      <div>
        {products.map((i) => (
          <div
            key={i.id}
            className="flex w-full items-center gap-3 border justify-between bg-gray-100 mt-10 rounded-md p-4"
          >
            <div className="flex items-center">
              <img className="w-[100px]" src={i.img} alt={i.title} />
              <div className="flex gap-3 items-center ml-4">
                <p className="font-semibold text-[18px]">{i.title}</p>
                <p className="ml-6 mr-6">{i.price.toLocaleString()} so'm</p>
                <p>{i.items}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(i.id)}
                className="bg-yellow-400 text-white px-4 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(i.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StoreProducts;
