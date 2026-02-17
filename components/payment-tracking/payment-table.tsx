"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Clock01Icon, AlertCircleIcon } from "@hugeicons/core-free-icons"
import type { Payment } from "./types"

interface PaymentTableProps {
    data: Payment[]
    onView: (payment: Payment) => void
}

export function PaymentTable({ data, onView }: PaymentTableProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} /> Paid</Badge>
            case "Pending":
                return <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={Clock01Icon} size={12} /> Pending</Badge>
            case "Overdue":
                return <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={AlertCircleIcon} size={12} /> Overdue</Badge>
            default:
                return null
        }
    }

    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Payment Details</h3>
            </div>
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary/5 hover:bg-primary/5 border-b-primary/10">
                            <TableHead className="w-20 text-primary font-semibold">Serial</TableHead>
                            <TableHead className="text-primary font-semibold">Customer</TableHead>
                            <TableHead className="text-primary font-semibold">Upfront Payment</TableHead>
                            <TableHead className="text-primary font-semibold">Final Payment</TableHead>
                            <TableHead className="text-primary font-semibold">Total Amount</TableHead>
                            <TableHead className="text-primary font-semibold">Due Date</TableHead>
                            <TableHead className="text-right text-primary font-semibold pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((payment) => (
                            <TableRow key={payment.id} className="hover:bg-muted/50 border-b-border">
                                <TableCell className="font-medium text-muted-foreground py-4">{payment.serial}</TableCell>
                                <TableCell className="py-4 font-medium">{payment.customer.name}</TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="font-medium">{payment.upfront.amount}</span>
                                        {getStatusBadge(payment.upfront.status)}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="font-medium">{payment.final.amount}</span>
                                        {getStatusBadge(payment.final.status)}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 font-medium">{payment.totalAmount}</TableCell>
                                <TableCell className="py-4 text-muted-foreground">{payment.dueDate}</TableCell>
                                <TableCell className="text-right pr-6 py-4">
                                    <Button
                                        onClick={() => onView(payment)}
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 text-xs px-3"
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
