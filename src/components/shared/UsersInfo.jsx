import { UserRound, UserX } from "lucide-react";
import { useTranslation } from "react-i18next";

function UsersInfo({ title, number, color, Icon }) {
  const { t } = useTranslation();
  return (
    <div className="w-[300px] border rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition">
      <Icon
        className={`w-8 h-8 ${color ? "text-green-600" : "text-gray-500"}`}
      />
      <p className="text-lg font-medium">{t(title)}</p>
      <p className="text-xl font-semibold">{t(number)}</p>
    </div>
  );
}

export default UsersInfo;
