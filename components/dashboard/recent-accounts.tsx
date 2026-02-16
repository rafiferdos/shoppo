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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewIcon, UnavailableIcon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const accounts = [
    {
        serial: "#01",
        name: "Ali Ahmed",
        phone: "+218214441753",
        type: "User",
        date: "11 Aug, 2025",
        avatar: "/assets/avatar-placeholder.png",
        location: "Tripoli, Libya",
        joinDate: "10 Jan, 2025"
    },
    {
        serial: "#02",
        name: "Ali Ahmed",
        phone: "+218214441753",
        type: "User",
        date: "11 Aug, 2025",
        avatar: "/assets/avatar-placeholder.png",
        location: "Tripoli, Libya",
        joinDate: "10 Jan, 2025"
    },
    {
        serial: "#03",
        name: "Ali Ahmed",
        phone: "+218214441753",
        type: "User",
        date: "11 Aug, 2025",
        avatar: "/assets/avatar-placeholder.png",
        location: "Tripoli, Libya",
        joinDate: "10 Jan, 2025"
    },
    {
        serial: "#04",
        name: "Ali Ahmed",
        phone: "+218214441753",
        type: "User",
        date: "11 Aug, 2025",
        avatar: "/assets/avatar-placeholder.png",
        location: "Tripoli, Libya",
        joinDate: "10 Jan, 2025"
    },
    {
        serial: "#05",
        name: "Ali Ahmed",
        phone: "+218214441753",
        type: "User",
        date: "11 Aug, 2025",
        avatar: "/assets/avatar-placeholder.png",
        location: "Tripoli, Libya",
        joinDate: "10 Jan, 2025"
    },
]

export function RecentAccounts() {
    const [selectedUser, setSelectedUser] = useState<typeof accounts[0] | null>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isBlockOpen, setIsBlockOpen] = useState(false)

    const handleView = (user: typeof accounts[0]) => {
        setSelectedUser(user)
        setIsViewOpen(true)
    }

    const handleBlock = (user: typeof accounts[0]) => {
        setSelectedUser(user)
        setIsBlockOpen(true)
    }

    return (
        <Card className="col-span-4 shadow-sm border-none">
            <CardHeader>
                <CardTitle>Recent Account List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">Serial</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Account Type</TableHead>
                                <TableHead>Registration Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account.serial}>
                                    <TableCell className="font-medium text-muted-foreground">{account.serial}</TableCell>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.phone}</TableCell>
                                    <TableCell>{account.type}</TableCell>
                                    <TableCell>{account.date}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                                                onClick={() => handleView(account)}
                                            >
                                                <HugeiconsIcon icon={ViewIcon} size={18} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleBlock(account)}
                                            >
                                                <HugeiconsIcon icon={UnavailableIcon} size={18} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* View User Dialog */}
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

                {/* Block User Alert */}
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
                                    className="w-full bg-primary text-white font-bold h-12 text-sm rounded-lg shadow-none"
                                    onClick={() => setIsBlockOpen(false)}
                                >
                                    CONFIRM →
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}
