"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FileDownIcon, FilterIcon } from "lucide-react";

const data = [
  {
    id: "123",
    created: "22.08.2023",
    status: "success",
    name: "Bakhriddinxoja",
    inn: "123456789",
    paymentMethod: "Payme",
    amount: "$3,424.00",
  },
  {
    id: "456",
    created: "31.09.2023",
    status: "success",
    name: "Abdulfattoh",
    inn: "987654321",
    paymentMethod: "Click",
    amount: "$2,100.00",
  },
  {
    id: "456",
    created: "31.09.2023",
    status: "success",
    name: "Abdulfattoh",
    inn: "987654321",
    paymentMethod: "Click",
    amount: "$2,100.00",
  },
  {
    id: "456",
    created: "31.09.2023",
    status: "success",
    name: "Abdulfattoh",
    inn: "987654321",
    paymentMethod: "Click",
    amount: "$2,100.00",
  },
  // Qolgan ma'lumotlar shu tarzda...
];

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-bold"># {row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColor = {
        success: "bg-green-500",
        processing: "bg-yellow-400",
        failed: "bg-red-400",
      };
      return (
        <Badge className={`${statusColor[status]} text-white`}>{status}</Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "inn",
    header: "INN",
  },
  {
    accessorKey: "paymentMethod",
    header: "Tolov usuli",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export default function Tranzactions() {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter name and id..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-[300px]"
        />
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <FilterIcon className="h-4 w-4 mr-2" /> Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline">
            <FileDownIcon className="h-4 w-4 mr-2" /> Excel
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
    </div>
  );
}
