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

export function PaymentTableSkeleton() {
    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <div className="p-6 border-b">
                <Skeleton className="h-6 w-36" />
            </div>
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary/5 hover:bg-primary/5 border-b-primary/10">
                            <TableHead className="w-20"><Skeleton className="h-4 w-12" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-28" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                            <TableHead className="text-right pr-6"><Skeleton className="h-4 w-14 ml-auto" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <TableRow key={i} className="border-b-border">
                                <TableCell className="py-4"><Skeleton className="h-4 w-10" /></TableCell>
                                <TableCell className="py-4"><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col items-start gap-1.5">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-5 w-16 rounded-sm" />
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col items-start gap-1.5">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-5 w-16 rounded-sm" />
                                    </div>
                                </TableCell>
                                <TableCell className="py-4"><Skeleton className="h-4 w-20" /></TableCell>
                                <TableCell className="py-4"><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="text-right pr-6 py-4">
                                    <Skeleton className="h-8 w-24 rounded-md ml-auto" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
