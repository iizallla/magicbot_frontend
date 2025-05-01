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


const DeliveringMethods = () => {
    return <div>
        <div className="flex justify-between m-6">
            <p className="font-medium">Yetkazib berish usullari</p>
            <button className="border rounded-lg p-3 text-white bg-blue-500">Yetkazib berish usulini ulash</button>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type of Delivery</TableHead>
                    <TableHead>Updated in</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Tools</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                
            </TableBody>
        </Table>
    </div>
}
export default DeliveringMethods;