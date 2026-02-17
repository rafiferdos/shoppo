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

export function AccountTableSkeleton() {
    return (
        <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary hover:bg-primary">
                            <TableHead className="w-25 text-primary-foreground font-medium">Serial</TableHead>
                            <TableHead className="text-primary-foreground font-medium">Name</TableHead>
                            <TableHead className="text-primary-foreground font-medium">Phone Number</TableHead>
                            <TableHead className="text-primary-foreground font-medium">Account Type</TableHead>
                            <TableHead className="text-primary-foreground font-medium">Registration Date</TableHead>
                            <TableHead className="text-right text-primary-foreground font-medium pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <TableRow key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                                <TableCell className="py-4"><Skeleton className="h-4 w-8" /></TableCell>
                                <TableCell className="py-4"><Skeleton className="h-4 w-20" /></TableCell>
                                <TableCell className="py-4"><Skeleton className="h-4 w-28" /></TableCell>
                                <TableCell className="py-4"><Skeleton className="h-4 w-12" /></TableCell>
                                <TableCell className="py-4"><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="text-right py-4 pr-4">
                                    <div className="flex justify-end gap-2">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
