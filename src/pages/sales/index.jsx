
import { DataTableDemo } from "@/payments/table";
import React from "react";
import ExcelIcon from '../../assets/excel.png'
import { TableToExcelReact } from "table-to-excel-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Sales = () => {
    return <div >
        <div className="flex justify-between">
            <p>Sales</p>
            <div className="flex gap-4">
                {/* <div className="flex items-center gap-2 bg-blue-500 w-[140px] h-[40px] rounded-lg pl-2 hover:bg-blue-800">
                <Youtube className="w-[15px] h-[18px] text-white "></Youtube>
                <button className="text-white" >Rukovodstva</button>
            </div> */}
                <TableToExcelReact
                    table="table_sales_list"
                    fileName="myFile"
                    sheet="sheet 1"
                    format="xlsx"
                >
                    <img src={ExcelIcon} className="w-12 h-12 object-contain" alt="excel" />
                </TableToExcelReact>
            </div>
        </div>
        <DataTableDemo />
    </div>;

};

export default Sales;
