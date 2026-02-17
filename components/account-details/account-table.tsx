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
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewIcon, UnavailableIcon } from "@hugeicons/core-free-icons"

export interface User {
    id: number
    serial: string
    name: string
    phone: string
    type: string
    date: string
    rawDate: Date
    avatar: string
    location: string
    joinDate: string
}

interface AccountTableProps {
    data: User[]
    onView: (user: User) => void
    onBlock: (user: User) => void
}

export function AccountTable({ data, onView, onBlock }: AccountTableProps) {
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
                        {data.length > 0 ? (
                            data.map((account, index) => (
                                <TableRow key={account.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                                    <TableCell className="font-medium text-muted-foreground py-4">{account.serial}</TableCell>
                                    <TableCell className="py-4">{account.name}</TableCell>
                                    <TableCell className="py-4">{account.phone}</TableCell>
                                    <TableCell className="py-4">{account.type}</TableCell>
                                    <TableCell className="py-4">{account.date}</TableCell>
                                    <TableCell className="text-right py-4 pr-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full"
                                                onClick={() => onView(account)}
                                            >
                                                <HugeiconsIcon icon={ViewIcon} size={20} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                                                onClick={() => onBlock(account)}
                                            >
                                                <HugeiconsIcon icon={UnavailableIcon} size={20} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
