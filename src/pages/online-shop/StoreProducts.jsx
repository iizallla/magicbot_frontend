import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/features/products/productsSlice";
import { Delete, Pen, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

function StoreProducts() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [salePrice, setSalePrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [taxable, setTaxable] = useState(false);
  const [profit, setProfit] = useState(0);
  const [margin, setMargin] = useState(0);
  const { t } = useTranslation();
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    price: "",
    items: "",
    imageFile: null,
    imagePreview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProductForm({
        ...productForm,
        imageFile: file,
        imagePreview: preview,
      });
    }
  };
  const handleSave = () => {
    const { title, description, price, items, imagePreview } = productForm;
    if (!title || !description || !price || !items || !imagePreview) {
      alert("Please fill in all fields.");
      return;
    }

    const productData = {
      id: isEditing ? editingId : Date.now(),
      title,
      description,
      price,
      items,
      imagePreview,
    };

    if (isEditing) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price,
      items: product.items,
      imageFile: null,
      imagePreview: product.imagePreview,
    });
    setIsEditing(true);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSavee = async () => {
    if (!title || !description || !price || !items || !imagePreview) {
      alert("Заполните все обязательные поля.");
      return;
    }

    const videoUrl = await uploadVideoToFileIO();

    const newProduct = {
      id: Date.now(),
      title,
      description,
      price,
      items,
      imagePreview,
      videoUrl,
      salePrice,
      comparePrice,
      costPrice,
      profit,
      margin,
      taxable,
    };

    setProducts([...products, newProduct]);
  };
  const resetForm = () => {
    setProductForm({
      title: "",
      description: "",
      price: "",
      items: "",
      imageFile: null,
      imagePreview: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 50 * 1024 * 1024) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      alert("Максимальный размер видео — 50MB.");
    }
  };

  const uploadVideoToFileIO = async () => {
    if (!videoFile) return null;

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await fetch("https://file.io", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.link || null;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  useEffect(() => {
    const calcProfit = salePrice - costPrice;
    const calcMargin =
      salePrice > 0 ? ((calcProfit / salePrice) * 100).toFixed(1) : 0;
    setProfit(calcProfit);
    setMargin(calcMargin);
  }, [salePrice, costPrice]);

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-[#222122] dark:text-white">
      <div className="flex justify-between items-center mb-6  dark:bg-[#222122] dark:text-white">
        <h1 className="text-2xl font-bold">Добавить продукт</h1>
        <button
          className="bg-green-600 text-white px-5 py-2 rounded"
          onClick={() => {
            setProductForm({
              title: "",
              description: "",
              price: "",
              items: "",
              imageFile: null,
              imagePreview: "",
            });
            setIsEditing(false);
            setShowForm(true);
          }}
        >
          {isEditing ? "Редактировать" : "Добавить продукт"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 border rounded shadow mb-10  dark:bg-[#222122] dark:text-white">
          <label className="block font-semibold mb-1">Наименование</label>
          <input
            name="title"
            type="text"
            value={productForm.title}
            onChange={handleChange}
            className="dark:placeholder:text-white w-full border px-3 py-2 placeholder:text-black  text-black rounded mb-4 dark:bg-[#222122] dark:text-white placeholder:text-white"
            placeholder="Введите наименование"
          />
          <label className="block font-semibold mb-1">Описание</label>
          <ReactQuill
            theme="snow"
            value={productForm.description}
            onChange={(value) =>
              setProductForm({ ...productForm, description: value })
            }
            className="mb-4"
          />
          <label className="block font-semibold mb-1">Фото (1080x1440)</label>
          <input
            type="file"
            className="dark:placeholder:text-white placeholder:text-black dark:bg-[#222122] dark:text-white placeholder:text-white"
            accept="image/*"
            onChange={handleImageChange}
          />
          {productForm.imagePreview && (
            <img
              src={productForm.imagePreview}
              alt="Preview"
              className="mt-2 mb-4 w-40 border rounded"
            />
          )}

          <input
            name="price"
            type="number"
            value={productForm.price}
            onChange={handleChange}
            className="dark:placeholder:text-white placeholder:text-black w-full border px-3 py-2 rounded mb-4 dark:bg-[#222122] dark:text-white placeholder:text-white"
            placeholder="Цена"
          />
          <input
            name="items"
            type="number"
            value={productForm.items}
            onChange={handleChange}
            className="dark:placeholder:text-white placeholder:text-black w-full border px-3 py-2 rounded mb-4 dark:bg-[#222122] dark:text-white placeholder:text-white"
            placeholder="Количество"
          />
          <div className="bg-white p-6 border rounded shadow mb-10">
            <label className="block font-semibold mb-2">📹 Видео</label>
            <div className="border border-dashed border-gray-400 p-4 rounded mb-4">
              <input
                type="file"
                accept="video/mp4"
                onChange={handleVideoChange}
              />
              <p className="text-sm text-gray-600 mt-2">
                Рекомендуемый формат: MP4, максимальный размер:{" "}
                <strong>50MB</strong>
              </p>
              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  className="mt-4 rounded shadow w-full max-w-md"
                />
              )}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Цены</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Цена продажи</label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label>Цена сравнения</label>
                <input
                  type="number"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={taxable}
                  onChange={(e) => setTaxable(e.target.checked)}
                />
                <label>Взимать налог с этого товара</label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label>Цена прихода</label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label>Прибыль</label>
                <input
                  type="number"
                  value={profit.toFixed(10)}
                  readOnly
                  className="w-full border bg-gray-100 px-3 py-2 rounded"
                />
              </div>
              <div>
                <label>Маржа</label>
                <input
                  type="text"
                  value={`${margin}%`}
                  readOnly
                  className="w-full border bg-gray-100 px-3 py-2 rounded"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              {isEditing ? "Обновить" : "Сохранить"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-black px-6 py-2 rounded"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className="space-y-4  dark:bg-[#222122] dark:text-white">
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
    </div>
  );
}

export default StoreProducts;
