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
  addPromocode,
  updatePromocode,
  deletePromocode,
} from "../../features/promocodes/promocodesSlice";

import { useDispatch, useSelector } from "react-redux";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Switch } from "@/components/ui/switch";

function Messages() {
  const dispatch = useDispatch();
  const promocodes = useSelector((state) => state.promocodes.list);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const generateCode = () =>
    Math.random().toString(36).substring(2, 10).toUpperCase();

  const [form, setForm] = useState({
    code: generateCode(),
    type: "Процент",
    discount: "",
    client: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    const { discount, usageLimit, startDate } = form;
    if (!discount || !usageLimit || !startDate) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    const newPromo = {
      id: isEditing ? editingId : uuidv4(),
      ...form,
      date: new Date().toISOString(),
    };
    if (isEditing) {
      dispatch(updatePromocode({ id: editingId, ...form }));
    } else {
      dispatch(addPromocode(form));
    }

    resetForm();
  };

  const handleEdit = (promo) => {
    setForm({ ...promo });
    setEditingId(promo.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      dispatch(deletePromocode(id));
    }
  };

  const resetForm = () => {
    setForm({
      code: generateCode(),
      type: "Процент",
      discount: "",
      client: "",
      usageLimit: "",
      startDate: "",
      endDate: "",
      status: "active",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-[#222122] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promo Kodlar</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          {isEditing ? "Tahrirlash" : "Yangi Promo Kod"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-[#222122] dark:text-white p-6 border rounded shadow mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Kod</label>
              <div className="flex gap-2">
                <input
                  name="code"
                  value={form.code}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100 dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, code: generateCode() })}
                  className="bg-gray-300 px-4 rounded"
                >
                  ⟳
                </button>
              </div>
            </div>
            <div>
              <label>Chegirma turi</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Процент">Процент</option>
                <option value="Сумма">Сумма</option>
              </select>
            </div>
            <div>
              <label>Chegirma qiymati</label>
              <input
                name="discount"
                type="number"
                value={form.discount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label>Foydalanuvchi</label>
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label>Foydalanish limiti</label>
              <input
                name="usageLimit"
                type="number"
                value={form.usageLimit}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label>Boshlanish sanasi</label>
              <input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label>Tugash sanasi</label>
              <input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
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

      {promocodes.length > 0 && (
        <div className="shadow-xl rounded p-3 dark:bg-[#222122] dark:text-white">
          <Table>
            <TableCaption>Promo Kodlar ro'yxati</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Qiymat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amal qilish muddati</TableHead>
                <TableHead>
                  <p className="text-right">Instrumentlar</p>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promocodes.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>{f.code}</TableCell>
                  <TableCell>{f.type}</TableCell>
                  <TableCell>
                    {f.discount} {f.type === "Процент" ? "%" : "so'm"}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={f.status === "active"}
                      onCheckedChange={(checked) =>
                        dispatch(
                          updatePromocode({
                            ...f,
                            status: checked ? "active" : "inactive",
                          })
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="">
                      {f.startDate}
                      {f.endDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(f)}
                        className="text-yellow-400 flex items-center gap-1"
                      >
                        <Pen className="w-4 h-4" /> Tahrirlash
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="text-red-500 flex items-center gap-1"
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

export default Messages;
