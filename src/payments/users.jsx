import * as React from "react";
import FilterIcon from "../assets/filter.png";

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

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import ExcelIcon from "../assets/excel.png";
import { TableToExcelReact } from "table-to-excel-react";

const data = [
  {
    id: "123",
    amount: 316,
    status: "success",
    name: "Bakhriddinxoja",
    financialStatus: "in anticipation",
    deliveryType: "new",
    created: "22.08.2023",
  },
  {
    id: "456",
    amount: 574,
    status: "success",
    name: "Abdulfattoh",
    financialStatus: "done",
    deliveryType: "new",
    created: "31.09.2023",
  },
  {
    id: "89",
    amount: 5964,
    status: "processing",
    name: "Abdulfattoh",
    financialStatus: "in anticipation",
    deliveryType: "accept",
    created: "5.09.2022",
  },
  {
    id: "012",
    amount: 3424,
    status: "processing",
    name: "Ulug`bekf",
    financialStatus: "failed",
    deliveryType: "accept",
    created: "5.09.2022",
  },
  {
    id: "012",
    amount: 3424,
    status: "processing",
    name: "Ulug`bekf",
    financialStatus: "failed",
    deliveryType: "accept",
    created: "5.09.2022",
  },
  {
    id: "012",
    amount: 3424,
    status: "failed",
    name: "Ulug`bekf",
    financialStatus: "failed",
    deliveryType: "accept",
    created: "5.09.2022",
  },
  {
    id: "012",
    amount: 3424,
    status: "success",
    name: "Ulug`bekf",
    financialStatus: "success",
    deliveryType: "accept",
    created: "5.09.2022",
  },
];

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">{"# " + row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("created")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("status") === "failed"
            ? "bg-red-400"
            : row.getValue("status") === "success"
            ? "bg-green-500"
            : "bg-yellow-500"
        }  p-1.5 w-fit text-white rounded-md cursor-pointer`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="camelcase font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: (row) => {
      console.log(row);

      return <div className="text-right pr-12">Amount</div>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className=" text-right pr-12 font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "tool",
    header: (row) => {
      console.log(row);

      return <div className="text-right pr-12">Tool</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="!text-right font-medium flex justify-end pr-10">
          <Select>
            <SelectTrigger className="w-[40px] text-center text-right">
              <p>...</p>
            </SelectTrigger>
            <SelectContent>
              <Link to={`/sales/${row.getValue("name")}`}>Sotuvlari</Link>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
];

function Users() {
  const { t: translate } = useTranslation();
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const location = useLocation();
  let mainPage = location.pathname.split("/")[1];
  let id = location.pathname.split("/")[2];
  React.useEffect(() => {
    table.getColumn("name")?.setFilterValue(id);
  }, []);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const onSalesFilterChange = (value) => {
    if (value === "#") {
      table.getColumn("status")?.setFilterValue("");
    } else {
      table.getColumn("status")?.setFilterValue(value);
    }
  };

  return (
    <div className="w-full">
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
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter name and id..."
          onChange={(event) => {
            const value = event.target.value;
            if (value.startsWith(" ")) {
              const value = value.slice(1).trim();
              table.getColumn("name")?.setFilterValue("");
            } else {
              table.getColumn("name")?.setFilterValue(value);
            }
          }}
          className="max-w-sm"
        />
        <div className="flex gap-5">
          <Select onValueChange={onSalesFilterChange}>
            <SelectTrigger className="w-[80px]">
              <img
                src={FilterIcon}
                className="w-5 h-5 object-contain"
                alt="filter"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="success">Succes</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="#">Reset</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div id="table_sales_list" className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2"></div>
      </div>
    </div>
  );
}

export default Users;
