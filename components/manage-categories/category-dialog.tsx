"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Delete02Icon } from "@hugeicons/core-free-icons"
import { useState, useEffect } from "react"
import type { Category } from "@/components/manage-categories/category-card"

interface CategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: Category | null
    onSubmit: (category: Category) => void
}

export function CategoryDialog({ open, onOpenChange, initialData, onSubmit }: CategoryDialogProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [links, setLinks] = useState<string[]>([])
    const [newLink, setNewLink] = useState("")

    // Reset or populate on open
    useEffect(() => {
        if (open && initialData) {
            setName(initialData.name)
            setDescription(initialData.description)
            setLinks(initialData.links || [])
        } else if (open) {
            setName("")
            setDescription("")
            setLinks([])
        }
    }, [open, initialData])

    const handleAddLink = () => {
        if (newLink.trim()) {
            setLinks([...links, newLink])
            setNewLink("")
        }
    }

    const handleDeleteLink = (index: number) => {
        const newLinks = [...links]
        newLinks.splice(index, 1)
        setLinks(newLinks)
    }

    const handleSubmit = () => {
        const categoryData: Category = {
            id: initialData?.id || Math.random().toString(36).substr(2, 9),
            name,
            description,
            links
        }
        onSubmit(categoryData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Category" : "Add New Category"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edit the existing category details." : "Create a new category for your products."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="category-name">Category Name</Label>
                        <Input
                            id="category-name"
                            placeholder="Enter category name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter category description"
                            className="min-h-25"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="website-link">Website Link</Label>
                        <div className="flex gap-2">
                            <Input
                                id="website-link"
                                placeholder="Enter category website"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleAddLink}
                                className="shrink-0"
                            >
                                <HugeiconsIcon icon={Add01Icon} size={18} />
                            </Button>
                        </div>
                        {/* Link List */}
                        <div className="space-y-2 mt-2 max-h-37.5 overflow-auto">
                            {links.map((link, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        readOnly
                                        value={link}
                                        className="bg-muted/30"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteLink(index)}
                                        className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <HugeiconsIcon icon={Delete02Icon} size={18} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                        {initialData ? "Update Category" : "Add Category"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
