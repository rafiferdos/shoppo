"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Search01Icon,
    Calendar02Icon,
    ViewIcon,
    UnavailableIcon,
    Cancel01Icon
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
// date-fns
import { format } from "date-fns"

// Mock Data
const generateAccounts = () => {
    const data = []
    for (let i = 1; i <= 25; i++) {
        data.push({
            id: i,
            serial: `#${i.toString().padStart(2, '0')}`,
            name: "Ali Ahmed",
            phone: "+218214441754",
            type: "User",
            date: "11 Aug, 2025",
            rawDate: new Date(2025, 7, 11), // 11 Aug 2025
            avatar: "/assets/avatar-placeholder.png",
            location: "Tripoli, Libya",
            joinDate: "10 Jan, 2025"
        })
    }
    return data
}

const accountsData = generateAccounts()

export default function AccountDetailsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Dialog States
    const [selectedUser, setSelectedUser] = useState<typeof accountsData[0] | null>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isBlockOpen, setIsBlockOpen] = useState(false)

    // Filter Logic
    const filteredAccounts = accountsData.filter(account => {
        const matchesPhone = account.phone.includes(searchTerm)
        let matchesDate = true
        if (date) {
            // Simple string comparison for demo, ideally compare timestamps or formatted strings
            // accounts use "11 Aug, 2025". date is Date object.
            // Let's assume we filter by exact date match on 'rawDate' mock property
            // or just string match if format matches.
            // efficient way:
            const selectedDateStr = format(date, "d MMM, yyyy")
            matchesDate = account.date === selectedDateStr
        }
        return matchesPhone && matchesDate
    })

    // Pagination Logic
    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage)
    const paginatedAccounts = filteredAccounts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleView = (user: typeof accountsData[0]) => {
        setSelectedUser(user)
        setIsViewOpen(true)
    }

    const handleBlock = (user: typeof accountsData[0]) => {
        setSelectedUser(user)
        setIsBlockOpen(true)
    }

    const clearDate = () => {
        setDate(undefined)
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-2">

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full md:w-1/2">
                    <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search here...."
                        className="pl-10 h-12 bg-muted/30 border-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <Popover>
                        <PopoverTrigger className={cn(
                            "w-full h-12 flex items-center justify-between text-left font-normal bg-muted/30 border-input px-4 rounded-md border hover:bg-muted/50",
                            !date && "text-muted-foreground"
                        )}>
                            <div className="flex items-center gap-2">
                                {date ? format(date, "PPP") : <span>Calendar</span>}
                            </div>
                            <HugeiconsIcon icon={Calendar02Icon} className="h-5 w-5 opacity-50" />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                captionLayout="dropdown"
                                fromYear={2020}
                                toYear={2030}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Table Card */}
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
                            {paginatedAccounts.length > 0 ? (
                                paginatedAccounts.map((account, index) => (
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
                                                    className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full"
                                                    onClick={() => handleView(account)}
                                                >
                                                    <HugeiconsIcon icon={ViewIcon} size={20} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                                                    onClick={() => handleBlock(account)}
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-end mt-2">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(p => p - 1) }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === i + 1}
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1) }}
                                        className={cn(
                                            "cursor-pointer",
                                            currentPage === i + 1 && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground rounded-full"
                                        )}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(p => p + 1) }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {/* View User Dialog (Reused from Dashboard) */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader className="hidden">
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>View user details</DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="flex flex-col items-center gap-6 py-4">
                            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-background shadow-lg">
                                <Avatar className="h-full w-full">
                                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary flex items-center justify-center">
                                        {selectedUser.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="w-full space-y-0 text-sm">
                                <div className="flex justify-between py-3 px-4 bg-muted/30 rounded-t-lg">
                                    <span className="text-muted-foreground">User Name</span>
                                    <span className="font-medium">{selectedUser.name}</span>
                                </div>
                                <div className="flex justify-between py-3 px-4">
                                    <span className="text-muted-foreground">Contact Number</span>
                                    <span className="font-medium">{selectedUser.phone}</span>
                                </div>
                                <div className="flex justify-between py-3 px-4 bg-muted/30">
                                    <span className="text-muted-foreground">Location</span>
                                    <span className="font-medium">{selectedUser.location}</span>
                                </div>
                                <div className="flex justify-between py-3 px-4">
                                    <span className="text-muted-foreground">Account Type</span>
                                    <span className="font-medium">{selectedUser.type}</span>
                                </div>
                                <div className="flex justify-between py-3 px-4 bg-muted/30 rounded-b-lg">
                                    <span className="text-muted-foreground">Date of Join</span>
                                    <span className="font-medium">{selectedUser.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Block User Alert (Reused from Dashboard) */}
            <AlertDialog open={isBlockOpen} onOpenChange={setIsBlockOpen}>
                <AlertDialogContent className="sm:max-w-sm p-6">
                    <div className="absolute top-3 right-3">
                        <AlertDialogCancel className="border-none p-1.5 h-auto w-auto hover:bg-red-100 bg-transparent text-red-400 rounded-full transition-colors">
                            <HugeiconsIcon icon={Cancel01Icon} size={16} />
                        </AlertDialogCancel>
                    </div>
                    <div className="flex flex-col items-center gap-4 pt-2">
                        <AlertDialogHeader className="space-y-3 text-center">
                            <AlertDialogTitle className="text-2xl font-bold">Block User</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground text-sm">
                                Are you sure you want to block this user?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="w-full mt-2">
                            <AlertDialogAction
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 text-sm rounded-lg shadow-none"
                                onClick={() => setIsBlockOpen(false)}
                            >
                                CONFIRM →
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}
