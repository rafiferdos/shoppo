"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    ViewIcon,
    Link01Icon,
    CheckmarkCircle02Icon,
    Cancel01Icon,
    Clock01Icon
} from "@hugeicons/core-free-icons"
import type { Quotation } from "./quotation-details-dialog"

interface QuotationsTableProps {
    data: Quotation[]
    onView: (quotation: Quotation) => void
}

export function QuotationsTable({ data, onView }: QuotationsTableProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Accepted":
                return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} /> Accept</Badge>
            case "Rejected":
                return <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={Cancel01Icon} size={14} /> Reject</Badge>
            default:
                return <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-none px-2 py-0.5 gap-1 font-normal"><HugeiconsIcon icon={Clock01Icon} size={14} /> Pending</Badge>
        }
    }

    return (
        <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary/5 hover:bg-primary/5 border-b-primary/10">
                            <TableHead className="w-20 text-primary font-semibold">Serial</TableHead>
                            <TableHead className="text-primary font-semibold">Customer</TableHead>
                            <TableHead className="text-primary font-semibold">Product Link</TableHead>
                            <TableHead className="text-primary font-semibold">Product</TableHead>
                            <TableHead className="text-primary font-semibold">Product Price</TableHead>
                            <TableHead className="text-primary font-semibold min-w-50">Additional Notes</TableHead>
                            <TableHead className="text-primary font-semibold">Date</TableHead>
                            <TableHead className="text-primary font-semibold">Status</TableHead>
                            <TableHead className="text-right text-primary font-semibold pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((quotation, index) => (
                                <TableRow key={quotation.id} className="hover:bg-muted/50 border-b-border">
                                    <TableCell className="font-medium text-muted-foreground py-4">{quotation.serial}</TableCell>
                                    <TableCell className="py-4 font-medium">{quotation.customer.name}</TableCell>
                                    <TableCell className="py-4">
                                        <a href={quotation.product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:text-primary/80 hover:underline text-sm font-medium">
                                            <HugeiconsIcon icon={Link01Icon} size={16} />
                                            View Product
                                        </a>
                                    </TableCell>
                                    <TableCell className="py-4 font-medium">{quotation.product.name}</TableCell>
                                    <TableCell className="py-4 text-muted-foreground">{quotation.product.price}</TableCell>
                                    <TableCell className="py-4 text-sm text-muted-foreground max-w-62.5 truncate" title={quotation.product.notes}>
                                        {quotation.product.notes}
                                    </TableCell>
                                    <TableCell className="py-4 text-muted-foreground">{quotation.date}</TableCell>
                                    <TableCell className="py-4">
                                        {getStatusBadge(quotation.status)}
                                    </TableCell>
                                    <TableCell className="text-right py-4 pr-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full"
                                            onClick={() => onView(quotation)}
                                        >
                                            <HugeiconsIcon icon={ViewIcon} size={20} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} className="h-24 text-center">
                                    No quotations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
