import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../features/sliceDelivering/deliveringSlice";

const DeliveringMethods = () => {
  const [showForm, setShowForm] = useState(false);
  const delivering = useSelector((state) => state.delivering.list);
  const dispatch = useDispatch();

  const [deliveringForm, setDeliveringForm] = useState({
    title: "",
    description: "",
    items: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveringForm({ ...deliveringForm, [name]: value });
  };

  const resetForm = () => {
    setDeliveringForm({
      title: "",
      description: "",
      items: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    const { title, description, items, status } = deliveringForm;

    if (!title || !description || !items) {
      alert("Please fill in all fields.");
      return;
    }

    const data = {
      id: isEditing ? editingId : Date.now(),
      title,
      description,
      items,
      date: new Date().toISOString(),
      status
    };

    if (isEditing) {
      dispatch(updateProduct(data));
    } else {
      dispatch(addProduct(data));
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setDeliveringForm({
      title: item.title,
      description: item.description,
      items: item.items || "",
      status: item.status
    });
    setIsEditing(true);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between m-6">
        <p className="font-medium">Yetkazib berish usullari</p>
        <button
          onClick={() => setShowForm(true)}
          className="border rounded-lg p-3 text-white bg-blue-500 hover:bg-blue-700"
        >
          Yetkazib berish usulini ulash
        </button>
      </div>

      {showForm && (
        <div className="px-6">
          <div className="mb-4">
            <p className="mb-1">Nomi</p>
            <input
              name="title"
              value={deliveringForm.title}
              onChange={handleChange}
              className="border rounded-md w-full p-2"
              type="text"
              placeholder="Nomi..."
            />
          </div>
          <div className="mb-4">
            <p className="mb-1">Yetkazib berish turi</p>
            <input
              name="description"
              value={deliveringForm.description}
              onChange={handleChange}
              className="border rounded-md w-full p-2"
              type="text"
              placeholder="Yetkazib berish turi..."
            />
          </div>
          <div className="mb-4">
            <p className="mb-1">Yangilangan</p>
            <input
              name="items"
              value={deliveringForm.items}
              onChange={handleChange}
              className="border rounded-md w-full p-2"
              type="text"
              placeholder="Yangilangan..."
            />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <p>Statusi</p>
            <Switch
              checked={deliveringForm.status}
              onCheckedChange={(value) => handleChange({target:{ name: "status",value }})}
            />


          </div>
          <div className="flex justify-between">
            <button
              onClick={resetForm}
              className="border rounded-md bg-gray-300 px-4 py-2"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Saqlash
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <Table>
          <TableCaption>Oxirgi yetkazib berish usullari ro'yxati</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nomi</TableHead>
              <TableHead>Yetkazib berish turi</TableHead>
              <TableHead>Yangilangan</TableHead>
              <TableHead >Statusi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {delivering.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {item.date ? new Date(item.date).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell>
                  <Switch checked={item.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className=" text-yellow-500 px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Pen className="w-4 h-4" /> Tuzatish
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className=" text-red-500 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> O'chirish
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DeliveringMethods;
