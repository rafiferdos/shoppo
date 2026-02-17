"use client"

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
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

interface BlockUserDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
}

export function BlockUserDialog({ open, onOpenChange, onConfirm }: BlockUserDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
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
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-sm rounded-lg shadow-none"
                            onClick={onConfirm}
                        >
                            CONFIRM →
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
