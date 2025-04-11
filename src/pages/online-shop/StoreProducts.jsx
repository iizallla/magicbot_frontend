import { Youtube } from "lucide-react";
import AmountCard from "./components/AmountCard";
import { useEffect, useState } from "react";

function StoreProducts() {
  const [products, setProducts] = useState([]);
  const [productsNumber, setProductsNumber] = useState(0);
  const [holeItms, setHoleItms] = useState(0);
  const [price, setPrice] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    items: "",
    img: "",
  });

  // Load products from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("storeProducts");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage + recalculate stats
  useEffect(() => {
    localStorage.setItem("storeProducts", JSON.stringify(products));

    let totalItems = 0;
    let totalPrice = 0;

    products.forEach((item) => {
      totalItems += Number(item.items);
      totalPrice += Number(item.price);
    });

    setHoleItms(totalItems);
    setPrice(totalPrice);
    setProductsNumber(products.length);
  }, [products]);

  // Create
  const handleAddProduct = () => {
    const { title, price, items, img } = newProduct;

    if (!title || !price || !items || !img) {
      alert("Please fill out all fields.");
      return;
    }

    const product = {
      id: Date.now(),
      title,
      price: Number(price),
      items: Number(items),
      img,
    };

    setProducts([...products, product]);
    setNewProduct({ title: "", price: "", items: "", img: "" });
    setShowForm(false);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  // Update
  const handleUpdate = (id) => {
    const updatedProducts = products.map((item) =>
      item.id === id
        ? { ...item, title: item.title + " (Updated)", items: item.items + 1 }
        : item
    );
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
            className="bg-green-600 text-white py-2 px-5 rounded-xl"
            onClick={() => setShowForm(true)}
          >
            Add new product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-5 mt-10">
        <AmountCard title={"Number of products"} number={productsNumber} />
        <AmountCard title={"The amount number of products"} number={holeItms} />
        <AmountCard
          title={"Price of whole products"}
          number={price.toLocaleString()}
        />
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white p-6 shadow-md rounded-lg mt-10 border max-w-xl">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Image URL"
              className="border rounded px-4 py-2"
              value={newProduct.img}
              onChange={(e) =>
                setNewProduct({ ...newProduct, img: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Title"
              className="border rounded px-4 py-2"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              className="border rounded px-4 py-2"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Items"
              className="border rounded px-4 py-2"
              value={newProduct.items}
              onChange={(e) =>
                setNewProduct({ ...newProduct, items: e.target.value })
              }
            />
            <div className="flex gap-4 mt-2">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={handleAddProduct}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-black px-6 py-2 rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
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
