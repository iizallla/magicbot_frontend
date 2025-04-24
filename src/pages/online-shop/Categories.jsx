import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/features/categories/Categories";
import { Delete, Image, Pen, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

function ProductsCategories() {
  const { t } = useTranslation();
  const categories = useSelector((state) => state.categories.list);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: "",
    status: "",
    description: "",
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
    const { title, description, imagePreview, status } = productForm;
    if (!title || !description || !imagePreview || !status) {
      alert("Please fill in all fields.");
      return;
    }

    const productData = {
      id: isEditing ? editingId : Date.now(),
      title,
      description,
      imagePreview,
      date: new Date().toISOString(), // add this line
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

  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-[#222122] dark:text-white">
      <div className="flex justify-between items-center mb-6  dark:bg-[#222122] dark:text-white">
        <h1 className="text-2xl font-bold">Категории</h1>
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
          {isEditing ? "Редактировать" : "Создать категорию"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 border rounded shadow mb-10  dark:bg-[#222122] dark:text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="border rounded p-4 flex flex-col items-center text-center">
                <label className="block font-semibold mb-1">
                  Фото (1080x1440)
                </label>
                <div className="relative w-40 h-40 border border-dashed rounded flex items-center justify-center bg-gray-50">
                  {productForm.imagePreview ? (
                    <img
                      src={productForm.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <Image className="w-[160px] h-[120px] text-gray-500" />
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
              <div className="mt-4 border p-4 rounded mb-6">
                <label className="block font-semibold mb-1">Статус</label>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
                  <select
                    className="border rounded px-3 py-2"
                    value={productForm.status || "active"}
                    onChange={(e) =>
                      setProductForm({ ...productForm, status: e.target.value })
                    }
                  >
                    <option value="active">Активный</option>
                    <option value="inactive">Неактивный</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Установите статус категории.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
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
      {categories.length > 0 && (
        <div className="shadow-xl rounded p-3  dark:bg-[#222122] dark:text-white">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Tools</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((i) => (
                <TableRow key={i.title}>
                  <TableCell className="font-medium">
                    <img
                      className="w-[60px] h-[60px] object-cover"
                      src={i.imagePreview}
                      alt={i.title}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{i.title}</TableCell>
                  <TableCell>
                    {i.date ? new Date(i.date).toLocaleDateString() : "—"}
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
                        className="text-red-500 gap-1 flex items-center px-4 py-1 rounded"
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

export default ProductsCategories;
