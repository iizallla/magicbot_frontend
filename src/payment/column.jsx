"use client"

import { useMemo } from "react"
import { useReactTable, flexRender } from "@tanstack/react-table"

// This is the type definition for Payment data
// You can replace this with a schema validation library like Zod if desired
export const columns = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]