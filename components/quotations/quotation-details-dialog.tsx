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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    UserIcon,
    PackageIcon,
    TruckIcon,
    Link01Icon,
    Cancel01Icon,
    CheckmarkCircle02Icon,
    Clock01Icon
} from "@hugeicons/core-free-icons"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface Quotation {
    id: string
    serial: string
    customer: {
        name: string
        phone: string
        avatar?: string
    }
    product: {
        name: string
        price: string
        link: string
        notes: string
    }
    date: string
    status: "Pending" | "Accepted" | "Rejected"
    internationalCharge?: string
    homeDeliveryCharge?: string
}

interface QuotationDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    quotation: Quotation | null
    onAccept: (quotation: Quotation, charges: { international: string, home: string }) => void
    onReject: (quotation: Quotation) => void
}

export function QuotationDetailsDialog({ open, onOpenChange, quotation, onAccept, onReject }: QuotationDetailsDialogProps) {
    const [internationalCharge, setInternationalCharge] = useState("")
    const [homeDeliveryCharge, setHomeDeliveryCharge] = useState("")

    useEffect(() => {
        if (open && quotation) {
            setInternationalCharge(quotation.internationalCharge || "AED 150")
            setHomeDeliveryCharge(quotation.homeDeliveryCharge || "AED 50")
        } else {
            setInternationalCharge("")
            setHomeDeliveryCharge("")
        }
    }, [open, quotation])

    if (!quotation) return null

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Accepted":
                return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 gap-1"><HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} /> Accepted</Badge>
            case "Rejected":
                return <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-none px-3 py-1 gap-1"><HugeiconsIcon icon={Cancel01Icon} size={14} /> Rejected</Badge>
            default:
                return <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-none px-3 py-1 gap-1"><HugeiconsIcon icon={Clock01Icon} size={14} /> Pending</Badge>
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden">
                <DialogHeader>
                    <div className="flex justify-between items-start pr-8">
                        <div>
                            <DialogTitle className="text-xl font-bold">Quotation Details</DialogTitle>
                            <DialogDescription className="mt-1">
                                Review and manage product quotation requests
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
                                <p className="font-semibold">{quotation.customer.name}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Phone Number</Label>
                                <p className="font-semibold">{quotation.customer.phone}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Request Date</Label>
                                <p className="font-medium">{quotation.date}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Status</Label>
                                <div>{getStatusBadge(quotation.status)}</div>
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
                                <p className="font-semibold">{quotation.product.name}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Product Price</Label>
                                <p className="font-semibold">{quotation.product.price}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Product Link</Label>
                                <a href={quotation.product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline text-sm font-medium break-all">
                                    <HugeiconsIcon icon={Link01Icon} size={14} className="shrink-0" />
                                    <span className="truncate">{quotation.product.link}</span>
                                </a>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-muted-foreground text-xs">Additional Notes</Label>
                                <p className="text-sm font-medium leading-relaxed">{quotation.product.notes}</p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Charges */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-4">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <HugeiconsIcon icon={TruckIcon} size={20} />
                            <h3>Set Delivery Charges</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="intl-charge" className="text-muted-foreground text-xs">International Delivery Charge</Label>
                                <Input
                                    id="intl-charge"
                                    value={internationalCharge}
                                    onChange={(e) => setInternationalCharge(e.target.value)}
                                    className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="home-charge" className="text-muted-foreground text-xs">Home Delivery Charge</Label>
                                <Input
                                    id="home-charge"
                                    value={homeDeliveryCharge}
                                    onChange={(e) => setHomeDeliveryCharge(e.target.value)}
                                    className="bg-white/50 border-primary/20 focus-visible:ring-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="destructive"
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-medium"
                        onClick={() => onReject(quotation)}
                    >
                        <HugeiconsIcon icon={Cancel01Icon} size={16} className="mr-1" />
                        Reject Request
                    </Button>
                    <Button
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                        onClick={() => onAccept(quotation, { international: internationalCharge, home: homeDeliveryCharge })}
                    >
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} className="mr-1" />
                        Accept & Send for Payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
