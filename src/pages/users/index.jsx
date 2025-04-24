import * as React from "react";
import ExcelIcon from "../../assets/excel.png";
import { TableToExcelReact } from "table-to-excel-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import FilterIcon from "../../assets/filter.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableDemo } from "@/payments/table";

const Users = () => {
  return (
    <div>
      <div className="flex justify-between">
        <p>Users</p>
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
            <button className="border w-14 h-11 pl-2 rounded-md bg-gray-100">
              <img
                src={ExcelIcon}
                className="w-10 h-10 object-contain "
                alt="excel"
              />
            </button>
          </TableToExcelReact>
        </div>
      </div>
      <DataTableDemo />
    </div>
  );
};

export default Users;
