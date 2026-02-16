
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const recentOrders = [
    {
        customer: "Ali Ahmed",
        product: "iPhone 17 pro max",
        status: "Shipped",
        amount: "AED 2050",
    },
    {
        customer: "Ali Ahmed",
        product: "iPhone 17 pro max",
        status: "Pending",
        amount: "AED 2050",
    },
    {
        customer: "Ali Ahmed",
        product: "iPhone 17 pro max",
        status: "Delivered",
        amount: "AED 2050",
    },
    {
        customer: "Ali Ahmed",
        product: "iPhone 17 pro max",
        status: "Pending",
        amount: "AED 2050",
    },
    {
        customer: "Ali Ahmed",
        product: "iPhone 17 pro max",
        status: "Shipped",
        amount: "AED 2050",
    },
    {
        customer: "Ali Ahmed",
        product: "iPhone 17 pro max",
        status: "Delivered",
        amount: "AED 2050",
    },
]

export function RecentOrders() {
    return (
        <Card className="col-span-1 md:col-span-2 shadow-sm border-none h-full flex flex-col">
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <div className="overflow-auto h-[380px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Customer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{order.customer}</TableCell>
                                    <TableCell>{order.product}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "rounded-sm px-2 py-0.5 text-xs font-normal shadow-none hover:bg-opacity-80",
                                                order.status === "Shipped" && "bg-blue-100 text-blue-600 hover:bg-blue-100",
                                                order.status === "Pending" && "bg-orange-100 text-orange-600 hover:bg-orange-100",
                                                order.status === "Delivered" && "bg-green-100 text-green-600 hover:bg-green-100"
                                            )}
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{order.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
