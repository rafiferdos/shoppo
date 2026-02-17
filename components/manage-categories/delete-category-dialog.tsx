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

interface DeleteCategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    categoryName?: string
}

export function DeleteCategoryDialog({ open, onOpenChange, onConfirm, categoryName }: DeleteCategoryDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-sm p-6">
                <div className="absolute top-3 right-3">
                    <AlertDialogCancel className="border-none p-1.5 h-auto w-auto hover:bg-destructive/10 bg-transparent text-destructive/70 rounded-full transition-colors">
                        <HugeiconsIcon icon={Cancel01Icon} size={16} />
                    </AlertDialogCancel>
                </div>
                <div className="flex flex-col items-center gap-4 pt-2">
                    <AlertDialogHeader className="space-y-3 text-center">
                        <AlertDialogTitle className="text-2xl font-bold">Delete Category</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground text-sm">
                            Are you sure you want to delete <span className="font-semibold text-foreground">{categoryName}</span>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-full mt-2">
                        <AlertDialogAction
                            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold h-12 text-sm rounded-lg shadow-none"
                            onClick={onConfirm}
                        >
                            DELETE →
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
