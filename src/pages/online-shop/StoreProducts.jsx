import { Switch } from "@/components/ui/switch";
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
} from "@/features/products/Products";

import { Delete, Image, Pen, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Variations from "./components/Variations";

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
    if (!title || !description || !items || !imagePreview) {
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
    <div className="max-w-6xl mx-auto p-6 dark:bg-[#222122] dark:text-white">
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
        <div className="bg-white dark:bg-[#1e1e1e] p-8 border rounded-2xl shadow-xl space-y-6 mb-10 transition-all">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Наименование</label>
            <input
              name="title"
              type="text"
              value={productForm.title}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg dark:bg-[#2a2a2a] dark:text-white placeholder:text-gray-400"
              placeholder="Введите наименование"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Описание</label>
            <ReactQuill
              theme="snow"
              value={productForm.description}
              onChange={(value) =>
                setProductForm({ ...productForm, description: value })
              }
              className="bg-white dark:bg-[#2a2a2a] rounded-md"
            />
          </div>

          {/* Image Upload */}
          <div className="border rounded p-4 flex flex-col items-center text-center">
            <label className="block font-semibold mb-1">Фото (1080x1440)</label>
            <div className="relative w-80 h-40 border border-dashed rounded dark:bg-[#2a2a2a] flex items-center justify-center bg-gray-50">
              {productForm.imagePreview ? (
                <img
                  src={productForm.imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <Image className="w-[160px] dark:text-white h-[120px] text-gray-500" />
              )}
              <label
                htmlFor="image-upload"
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer"
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Принимаются только файлы изображений *.png, *.jpg и *.jpeg
              размером не более 2 мегабайт.
            </p>
          </div>
          {/* Price & Quantity */}

          {/* Video Upload */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">📹 Видео</h3>
            <div className="border border-dashed p-4 rounded-lg bg-gray-50 dark:bg-[#2a2a2a]">
              <input
                type="file"
                accept="video/mp4"
                onChange={handleVideoChange}
                className="mb-2"
              />
              <p className="text-sm text-gray-600">
                Формат: MP4, макс. размер: <strong>50MB</strong>
              </p>
              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  className="mt-4 rounded shadow w-full max-w-md"
                />
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Цены</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Цена продажи</label>
                <input
                  type="number"
                  placeholder="Цена продажи"
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded dark:bg-[#2a2a2a] dark:text-white"
                />
              </div>
              <div>
                <label>Цена сравнения</label>
                <input
                  type="number"
                  placeholder="Цена сравнения"
                  onChange={(e) => setComparePrice(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded dark:bg-[#2a2a2a] dark:text-white"
                />
              </div>
              <div>
                <label className="">Количество</label>
                <input
                  name="items"
                  type="number"
                  value={productForm.items}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded dark:bg-[#2a2a2a] dark:text-white"
                  placeholder="Количество"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => setTaxable(e.target.checked)}
              />
              <label>Взимать налог с этого товара</label>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Цена прихода</label>
                <input
                  type="number"
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full border px-3 py-2 rounded dark:bg-[#2a2a2a] dark:text-white"
                />
              </div>
              <div>
                <label>Прибыль</label>
                <input
                  type="number"
                  value={profit.toFixed(2)}
                  readOnly
                  className="w-full border dark:bg-[#2a2a2a] bg-gray-100 px-3 py-2 rounded"
                />
              </div>
              <div>
                <label>Маржа</label>
                <input
                  type="text"
                  value={`${margin}%`}
                  readOnly
                  className="w-full border dark:bg-[#2a2a2a] bg-gray-100 px-3 py-2 rounded"
                />
              </div>
            </div>
          </div>
          <p className="mt-10 font-medium text-lg">Детали продукта</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label>Тип продукта</label>
              <input
                type="text"
                placeholder="Тип продукта"
                // onChange={(e) => {
                //   setSalePrice(Number(e.target.value));
                // }}
                className="w-full border px-3 py-2 rounded dark:bg-[#2a2a2a] dark:text-white"
              />
            </div>
            <div>
              <label>Бренд</label>
              <input
                type="text"
                placeholder="Бренд"
                // onChange={(e) => setComparePrice(Number(e.target.value))}
                className="w-full border px-3 py-2 rounded dark:bg-[#2a2a2a] dark:text-white"
              />
            </div>
            <div>
              <label className="">Теги</label>
              <input
                name="items"
                // value={productForm.items}
                // onChange={handleChange}
                className="w-full border px-3 py-2 rounded dark:bg-[#2a2a2a] dark:text-white"
                placeholder="Теги"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg"
            >
              {isEditing ? "Обновить" : "Сохранить"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg"
            >
              Отмена
            </button>
          </div>
          <Variations />
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
                <TableHead>Status</TableHead>
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
                  <TableCell>
                    <Switch id={`switch-${i.id}`} />
                  </TableCell>
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
                        className="text-red-500 gap-1 flex items-center dark:text-white  px-4 py-1 rounded"
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
