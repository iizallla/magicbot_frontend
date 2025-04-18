import { FlagpackRu } from "@/assets/Rusflag";
import { FlagpackUz } from "@/assets/UzbFlag";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import { DatePickerDemo } from "@/components/shared/DatePick";
import UsersInfo from "@/components/shared/UsersInfo";
import { UserRound, UserX } from "lucide-react";
import { useTranslation } from "react-i18next";

function Models() {
  const { t } = useTranslation();
  const data = [
    {
      title: "Active Users",
      number: "0",
      color: false,
      logo: UserRound,
    },
    {
      title: "Non active Users",
      number: "0",
      color: false,
      logo: UserX,
    },
    {
      title: "Uzbek Users",
      number: "0",
      color: false,
      logo: FlagpackUz,
    },
    {
      title: "Russian Users",
      number: "0",
      color: false,
      logo: FlagpackUz,
    },
  ];
  return (
    <div className="">
      <DatePickerDemo />
      <div>
        <p className="mb-10">{t("Clients")}</p>
        <div className="flex justify-between">
          {data.map((i) => (
            <UsersInfo
              title={i.title}
              number={i.number}
              color={i.color}
              Icon={i.logo}
            />
          ))}
          {/* <UsersInfo title={"Active Users"} number={"0"} color={true} logo={} />
          <UsersInfo title={"Non active Users"} number={"0"} color={false} />
          <UsersInfo title={"Uzbek Users"} number={"0"} />
          <UsersInfo title={"Russian Users"} number={"0"} /> */}
        </div>
      </div>
      <div className="flex gap-10">
        <LineChart />
        <BarChart />
      </div>
      <div className="flex gap-10">
        <PieChart />
        <PieChart />
      </div>
    </div>
  );
}

export default Models;
