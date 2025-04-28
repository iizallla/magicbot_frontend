import react from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

const Settings = () => {
    return <div>
        <h1 className="ml-[15px] mt-2 mb-6">Boshqaruv Paneli</h1>
        <div className="flex align-middle gap-12">
            <div>
                <Select>
                    <p className="m-[15px]">Ish vaqti </p>
                    <SelectTrigger className="w-[240px] m-[15px]">
                        <SelectValue placeholder="Har kuni" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="jumagacham">Dushanbadan Jumagacham</SelectItem>
                        <SelectItem value="shanbagacham">Dushanbadan Shanbagacham</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <p className="m-[14px]">Dan</p>
                <input className="border w-[140px] p-2 rounded-lg " type="time" />
            </div>
            <div>
                <p className="m-[14px]">Gacha</p>
                <input className="border w-[140px] p-2 rounded-lg " type="time" />
            </div>
        </div>
       <div style={{position: 'relative', overflow: 'hidden'}}><iframe src="https://yandex.uz/map-widget/v1/?indoorLevel=1&ll=69.238124%2C41.318621&mode=whatshere&whatshere%5Bpoint%5D=69.233984%2C41.317799&whatshere%5Bzoom%5D=17&z=16.72source=constructor
"  height={600} frameBorder={1} allowFullScreen="true" style={{position: 'relative',width:"100%"}} /></div>

    </div>
}
export default Settings;