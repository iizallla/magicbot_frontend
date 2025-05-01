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
  addFilial,
  updateFilial,
  deleteFilial,
} from "../../features/filial/Filial";
import { Pen, Trash2, MapPin, Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Switch } from "@/components/ui/switch";

function Filials() {
  const dispatch = useDispatch();
  const filials = useSelector((state) => state.filial.list);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [filialForm, setFilialForm] = useState({
    name: "",
    city: "",
    address: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilialForm({ ...filialForm, [name]: value });
  };

  const handleSave = () => {
    const { name, city, address } = filialForm;
    if (!name || !city || !address) {
      alert("Barcha maydonlarni to'ldiring.");
      return;
    }

    const newFilial = {
      id: isEditing ? editingId : uuidv4(),
      ...filialForm,
      date: new Date().toISOString(),
    };

    if (isEditing) {
      dispatch(updateFilial(newFilial));
    } else {
      dispatch(addFilial(newFilial));
    }

    resetForm();
  };

  const handleEdit = (filial) => {
    setFilialForm({
      name: filial.name,
      city: filial.city,
      address: filial.address,
      status: filial.status,
    });
    setEditingId(filial.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      dispatch(deleteFilial(id));
    }
  };

  const resetForm = () => {
    setFilialForm({
      name: "",
      city: "",
      address: "",
      status: "active",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-[#222122] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Filiallar</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          {isEditing ? "Tahrirlash" : "Yangi filial"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-[#222122] dark:text-white p-6 border rounded shadow mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold">Nomi</label>
              <input
                name="name"
                type="text"
                value={filialForm.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 dark:bg-[#222122] dark:text-white"
                placeholder="Filial nomi"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Shahar</label>
              <input
                name="city"
                type="text"
                value={filialForm.city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 dark:bg-[#222122] dark:text-white"
                placeholder="Shahar nomi"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Manzil</label>
              <input
                name="address"
                type="text"
                value={filialForm.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 dark:bg-[#222122] dark:text-white"
                placeholder="Manzil"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Holat</label>
              <select
                name="status"
                value={filialForm.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 dark:bg-[#222122] dark:text-white"
              >
                <option value="active">Faol</option>
                <option value="inactive">Nofaol</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              {isEditing ? "Yangilash" : "Saqlash"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-black px-6 py-2 rounded"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {filials.length > 0 && (
        <div className="shadow-xl rounded p-3 dark:bg-[#222122] dark:text-white">
          <Table>
            <TableCaption>Filiallar ro'yxati</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Filial</TableHead>
                <TableHead>Shahar</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filials.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {f.name}
                  </TableCell>
                  <TableCell className="font-medium  ">{f.city}</TableCell>
                  <TableCell>{f.address}</TableCell>
                  <TableCell>
                    {/* {f.status === "active" ? (
                      <span className="text-green-500">Faol</span>
                    ) : (
                      <span className="text-red-500">Nofaol</span>
                      )} */}
                    <Switch id={`switch-${f.id}`} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(f)}
                        className="text-yellow-400 gap-1 flex items-center px-4 py-1 rounded"
                      >
                        <Pen className="w-4 h-4" /> Tahrirlash
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="text-red-500 gap-1 flex items-center px-4 py-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" /> O'chirish
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

export default Filials;
