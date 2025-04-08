import { useEffect, useState } from "react"
import { DataTable } from "./data-table"
import { columns } from "./column"

// Function to fetch data (simulated here as an async function)
async function getData() {
  // Fetch data from your API or source here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
    // Add more data as needed
  ]
}

export default function DemoPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await getData()
      setData(result)
    }
    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
