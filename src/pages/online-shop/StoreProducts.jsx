import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function StoreProducts() {
  const [products, setProducts] = useState([]);
  const [productsNumber, setProductsNumber] = useState(0);
  const [holeItms, setHoleItms] = useState(0);
  const [price, setPrice] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: "",
    price: "",
    items: "",
    img: "",
  });
  useEffect(() => {
    const stored = localStorage.getItem("storeProducts");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };
  const handleSave = () => {
    const { title, price, items, img } = productForm;
    if (!title || !price || !items || !img) {
      alert("Please fill out all fields.");
      return;
    }
    if (isEditing) {
      const updated = products.map((item) =>
        item.id === editingId
          ? { ...item, title, price: Number(price), items: Number(items), img }
          : item
      );
      setProducts(updated);
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        title,
        price: Number(price),
        items: Number(items),
        img,
      };
      setProducts([...products, newProduct]);
    }
    setProductForm({ title: "", price: "", items: "", img: "" });
    setShowForm(false);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };
  const handleEdit = (product) => {
    setProductForm({
      title: product.title,
      price: product.price,
      items: product.items,
      img: product.img,
    });
    setIsEditing(true);
    setEditingId(product.id);
    setShowForm(true);
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
            onClick={() => {
              setProductForm({ title: "", price: "", items: "", img: "" });
              setIsEditing(false);
              setShowForm(true);
            }}
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
      {showForm && (
        <div className="bg-white p-6 shadow-md rounded-lg mt-10 border max-w-xl">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="img"
              placeholder="Image URL"
              className="border rounded px-4 py-2"
              value={productForm.img}
              onChange={handleChange}
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="border rounded px-4 py-2"
              value={productForm.title}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border rounded px-4 py-2"
              value={productForm.price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="items"
              placeholder="Items"
              className="border rounded px-4 py-2"
              value={productForm.items}
              onChange={handleChange}
            />
            <div className="flex gap-4 mt-2">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={handleSave}
              >
                {isEditing ? "Update" : "Save"}
              </button>
              <button
                className="bg-gray-300 text-black px-6 py-2 rounded"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className="shadow-xl rounded p-3  dark:bg-[#222122] dark:text-white">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Tools</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((i) => (
                <TableRow key={i.title}>
                  <TableCell className="font-medium">
                    <img
                      className="w-[50px] h-[50px] object-cover"
                      src={i.imagePreview}
                      alt={i.title}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{i.title}</TableCell>
                  <TableCell>{i.price} so'm</TableCell>
                  <TableCell>{i.items}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-yellow-400 gap-1 flex items-center text-white px-4 py-1 rounded"
                      >
                        <Pen className="w-4 h-4" /> Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(i.id)}
                        className="text-red-500 gap-1 flex items-center text-white px-4 py-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" /> Удалить
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export default StoreProducts;
