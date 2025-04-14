import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CardTable({ data }) {
  //   const invoices = [
  //     {
  //       invoice: "INV001",
  //       paymentStatus: "Paid",
  //       totalAmount: "$250.00",
  //       paymentMethod: "Credit Card",
  //     },
  //     {
  //       invoice: "INV002",
  //       paymentStatus: "Pending",
  //       totalAmount: "$150.00",
  //       paymentMethod: "PayPal",
  //     },
  //     {
  //       invoice: "INV003",
  //       paymentStatus: "Unpaid",
  //       totalAmount: "$350.00",
  //       paymentMethod: "Bank Transfer",
  //     },
  //     {
  //       invoice: "INV004",
  //       paymentStatus: "Paid",
  //       totalAmount: "$450.00",
  //       paymentMethod: "Credit Card",
  //     },
  //     {
  //       invoice: "INV005",
  //       paymentStatus: "Paid",
  //       totalAmount: "$550.00",
  //       paymentMethod: "PayPal",
  //     },
  //     {
  //       invoice: "INV006",
  //       paymentStatus: "Pending",
  //       totalAmount: "$200.00",
  //       paymentMethod: "Bank Transfer",
  //     },
  //     {
  //       invoice: "INV007",
  //       paymentStatus: "Unpaid",
  //       totalAmount: "$300.00",
  //       paymentMethod: "Credit Card",
  //     },
  //   ];

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((i) => (
            <TableRow key={i.title}>
              <TableCell className="font-medium">
                <img src={i.imagePreview} alt={i.title} />
              </TableCell>
              <TableCell className="font-medium">{i.title}</TableCell>
              <TableCell>{i.price}</TableCell>
              <TableCell>{i.items}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Удалить
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </>
  );
}

export default CardTable;
