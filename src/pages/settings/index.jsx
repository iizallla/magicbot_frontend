import react from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

const Settings = () => {
  return (
    <div>
      <h1 className="ml-[15px] mt-2 mb-6 font-medium">Boshqaruv Paneli</h1>
      <div className="flex  gap-12">
        <div>
          <Select>
            <p className="m-[15px]">Ish vaqti </p>
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Har Kuni" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jumagacham">Dushanbadan Jumagacham</SelectItem>
              <SelectItem value="shanbagacham">
                Dushanbadan Shanbagacham
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="m-[14px]">Dan</p>
          <input
            className="border w-[300px] dark:bg-gray-950 p-2 rounded-lg "
            type="time"
          />
        </div>
        <div>
          <p className="m-[14px]">Gacha</p>
          <input
            className="border dark:bg-gray-950 w-[300px] p-2 rounded-lg "
            type="time"
          />
        </div>
      </div>
      <div className="">
        <p className="font-medium ml-[15px] mt-[20px] mb-[20px]">
          Mahalliylashtirish sozlamalari
        </p>
        <Select>
          <div className="flex items-center">
            <p className="m-[15px]">Asosiy til </p>
            <SelectTrigger className="w-[800px] m-[14px] ">
              <SelectValue placeholder="Asosiy tilni tanlash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uzbekcha">O`zbekcha</SelectItem>
              <SelectItem value="ruscha">Ruscha</SelectItem>
            </SelectContent>
          </div>
        </Select>
        <Select>
          <div className="flex align-middle items-center gap-x-2.5">
            <p className="m-[15px]">Valyuta </p>
            <SelectTrigger className="w-[800px] m-[14px] ">
              <SelectValue placeholder="Valyutani tanlash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uzbek-Sum">Uzbek so`m</SelectItem>
              <SelectItem value="US-dollar">US Dollar</SelectItem>
              <SelectItem value="qirgiz-som">Qirg`iz s`om</SelectItem>
              <SelectItem value="qazax-tenge">Qazax Tenge</SelectItem>
              <SelectItem value="rubl">Rubl</SelectItem>
              <SelectItem value="von">Von</SelectItem>
            </SelectContent>
          </div>
        </Select>
      </div>
      <p className="m-4 font-semibold">
        Manzil: Toshkent, Olmazor tumani, 2-to'siq Qorasaroy, 12
      </p>
      <div
        className="m-[14px]"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <iframe
          src="https://yandex.uz/map-widget/v1/?indoorLevel=1&ll=69.238124%2C41.318621&mode=whatshere&whatshere%5Bpoint%5D=69.233984%2C41.317799&whatshere%5Bzoom%5D=17&z=16.72source=constructor
"
          height={600}
          frameBorder={1}
          allowFullScreen="true"
          style={{ position: "relative", width: "100%" }}
        />
      </div>
    </div>
  );
};
export default Settings;
