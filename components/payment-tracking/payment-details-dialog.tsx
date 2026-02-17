"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    UserIcon,
    PackageIcon,
    MoneyBag02Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    AlertCircleIcon,
    Sent02Icon
} from "@hugeicons/core-free-icons"
import type { Payment } from "./types"

interface PaymentDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    payment: Payment | null
    onSendReminder: (payment: Payment) => void
    onMarkAsPaid: (payment: Payment) => void
}

export function PaymentDetailsDialog({ open, onOpenChange, payment, onSendReminder, onMarkAsPaid }: PaymentDetailsDialogProps) {
    if (!payment) return null

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-primary/10 text-primary border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} /> Paid</Badge>
            case "Pending":
                return <Badge className="bg-orange-100 text-orange-600 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={Clock01Icon} size={12} /> Pending</Badge>
            case "Overdue":
                return <Badge className="bg-red-100 text-red-600 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={AlertCircleIcon} size={12} /> Overdue</Badge>
            default:
                return null
        }
    }

    // Parse amounts for calculation (basic mock logic)
    const upfrontNum = parseInt(payment.upfront.amount.replace(/[^0-9]/g, ''))
    const finalNum = parseInt(payment.final.amount.replace(/[^0-9]/g, ''))
    const totalNum = parseInt(payment.totalAmount.replace(/[^0-9]/g, ''))
    const paidAmount = (payment.upfront.status === "Paid" ? upfrontNum : 0) + (payment.final.status === "Paid" ? finalNum : 0)
    const remainingAmount = totalNum - paidAmount

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-start pr-8">
                        <div>
                            <DialogTitle className="text-xl font-bold">Payment Tracking</DialogTitle>
                            <DialogDescription className="mt-1">
                                Monitor upfront and final payments for all orders
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {/* Customer Information */}
                    <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-2 text-purple-600 font-medium">
                            <HugeiconsIcon icon={UserIcon} size={20} />
                            <h3>Customer Information</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Name</Label>
                                <p className="font-semibold">{payment.customer.name}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Phone Number</Label>
                                <p className="font-semibold">{payment.customer.phone}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Payment Status</Label>
                                <div>{getStatusBadge(payment.final.status === "Paid" && payment.upfront.status === "Paid" ? "Paid" : payment.final.status === "Overdue" || payment.upfront.status === "Overdue" ? "Overdue" : "Pending")}</div>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 font-medium">
                            <HugeiconsIcon icon={PackageIcon} size={20} />
                            <h3>Product Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Product Name</Label>
                                <p className="font-semibold">{payment.product.name}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Product Price</Label>
                                <p className="font-semibold">{payment.product.price}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Additional Notes</Label>
                                <p className="text-sm font-medium leading-relaxed">{payment.product.notes}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <HugeiconsIcon icon={MoneyBag02Icon} size={20} />
                            <h3>Payment Breakdown</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/60 rounded-lg p-3 border border-primary/10 space-y-2">
                                <div className="flex justify-between items-start">
                                    <Label className="text-muted-foreground text-xs">Upfront Payment</Label>
                                    {getStatusBadge(payment.upfront.status)}
                                </div>
                                <p className="text-xl font-bold">{payment.upfront.amount}</p>
                                {payment.upfront.paidDate && (
                                    <p className="text-xs text-muted-foreground">Paid on: {payment.upfront.paidDate}</p>
                                )}
                            </div>

                            <div className="bg-white/60 rounded-lg p-3 border border-primary/10 space-y-2">
                                <div className="flex justify-between items-start">
                                    <Label className="text-muted-foreground text-xs">Final Payment</Label>
                                    {getStatusBadge(payment.final.status)}
                                </div>
                                <p className="text-xl font-bold">{payment.final.amount}</p>
                                <p className="text-xs text-muted-foreground">Due by: {payment.final.dueDate}</p>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-primary/10 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Amount Paid</span>
                                <span className="font-medium text-orange-600">- AED {paidAmount}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Amount Remaining</span>
                                <span className="font-medium text-primary">AED {remainingAmount}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg mt-2 font-bold">
                                <span>Total Amount</span>
                                <span>{payment.totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                        Close
                    </Button>
                    <Button
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        onClick={() => onSendReminder(payment)}
                    >
                        <HugeiconsIcon icon={Sent02Icon} size={16} className="mr-1" />
                        Send Payment Reminder
                    </Button>
                    <Button
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                        onClick={() => onMarkAsPaid(payment)}
                    >
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} className="mr-1" />
                        Mark as Paid
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
