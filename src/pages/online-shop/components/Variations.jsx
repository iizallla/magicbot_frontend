import { Trash2 } from "lucide-react";
import { useState } from "react";

function Variations() {
  const [variations, setVariations] = useState([{ attribute: "", option: "" }]);

  const addVariation = () => {
    setVariations([...variations, { attribute: "", option: "" }]);
  };

  const removeVariation = (index) => {
    const updated = variations.filter((_, i) => i !== index);
    setVariations(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = variations.map((variation, i) =>
      i === index ? { ...variation, [field]: value } : variation
    );
    setVariations(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Вариации</h2>

      {variations.map((variation, index) => (
        <div key={index} className="mb-6 border p-4 rounded relative">
          <div className="mb-2">
            <label className="block mb-1">Введите значение атрибута</label>
            <input
              type="text"
              value={variation.attribute}
              onChange={(e) => handleChange(index, "attribute", e.target.value)}
              className="w-full dark:bg-[#2a2a2a] border px-3 py-2 rounded"
              placeholder="например: Размер, цвет"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Значения опции</label>
            <input
              type="text"
              value={variation.option}
              onChange={(e) => handleChange(index, "option", e.target.value)}
              className="w-full dark:bg-[#2a2a2a] border px-3 py-2 rounded"
              placeholder="например: M, L, XL"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => removeVariation(index)}
            className="absolute top-2 right-2 text-red-600"
          >
            <Trash2 className="text-red-600" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariation}
        className="flex items-center text-blue-600 font-medium mt-2"
      >
        ➕ Добавить опции
      </button>
    </div>
  );
}

export default Variations;
