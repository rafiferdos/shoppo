"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ViewUserDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: {
        name: string
        phone: string
        location: string
        type: string
        joinDate: string
        avatar?: string
    } | null
}

export function ViewUserDialog({ open, onOpenChange, user }: ViewUserDialogProps) {
    if (!user) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader className="hidden">
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>View user details</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-6 py-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-background shadow-lg">
                        <Avatar className="h-full w-full">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary flex items-center justify-center">
                                {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="w-full space-y-0 text-sm">
                        <div className="flex justify-between py-3 px-4 bg-muted/30 rounded-t-lg">
                            <span className="text-muted-foreground">User Name</span>
                            <span className="font-medium">{user.name}</span>
                        </div>
                        <div className="flex justify-between py-3 px-4">
                            <span className="text-muted-foreground">Contact Number</span>
                            <span className="font-medium">{user.phone}</span>
                        </div>
                        <div className="flex justify-between py-3 px-4 bg-muted/30">
                            <span className="text-muted-foreground">Location</span>
                            <span className="font-medium">{user.location}</span>
                        </div>
                        <div className="flex justify-between py-3 px-4">
                            <span className="text-muted-foreground">Account Type</span>
                            <span className="font-medium">{user.type}</span>
                        </div>
                        <div className="flex justify-between py-3 px-4 bg-muted/30 rounded-b-lg">
                            <span className="text-muted-foreground">Date of Join</span>
                            <span className="font-medium">{user.joinDate}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
