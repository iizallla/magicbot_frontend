import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import { DatePickerDemo } from "@/components/shared/DatePick";
import UsersInfo from "@/components/shared/UsersInfo";

function Models() {
  return (
    <div className="">
      <DatePickerDemo />
      <div>
        <p className="mb-10">Clients</p>
        <div className="flex justify-between">
          <UsersInfo title={"Active Users"} number={"0"} color={true} />
          <UsersInfo title={"Non active Users"} number={"0"} color={false} />
          <UsersInfo title={"Uzbek Users"} number={"0"} />
          <UsersInfo title={"Russian Users"} number={"0"} />
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
