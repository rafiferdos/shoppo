"use client"

import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function QuotationsSkeleton() {
    return (
        <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary/5 hover:bg-primary/5 border-b-primary/10">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <TableHead key={i} className="min-w-25">
                                    <Skeleton className="h-4 w-3/4 rounded-sm" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i} className="border-b-border">
                                {Array.from({ length: 9 }).map((_, j) => (
                                    <TableCell key={j} className="py-4">
                                        <Skeleton className="h-4 w-full rounded-sm" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
