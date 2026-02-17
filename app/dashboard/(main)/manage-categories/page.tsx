"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { CategoryCard, type Category } from "@/components/manage-categories/category-card"
import { CategorySkeleton } from "@/components/manage-categories/category-skeleton"
import { CategoryDialog } from "@/components/manage-categories/category-dialog"
import { DeleteCategoryDialog } from "@/components/manage-categories/delete-category-dialog"

// Mock Data
const initialCategories: Category[] = [
    {
        id: "1",
        name: "Electronics",
        description: "Electronic devices and components",
        links: ["https://example.com/electronics"],
    },
    {
        id: "2",
        name: "Beauty",
        description: "Skincare & Fragrances",
        links: ["https://example.com/beauty"],
    },
    {
        id: "3",
        name: "Clothing",
        description: "Middle Easter Style",
        links: ["https://example.com/clothing"],
    },
    {
        id: "4",
        name: "Household",
        description: "Home Decor & Kitchen",
        links: ["https://example.com/household"],
    },
    {
        id: "5",
        name: "Electronics",
        description: "Electronic devices and components",
        links: ["https://example.com/electronics"],
    },
    {
        id: "6",
        name: "Beauty",
        description: "Skincare & Fragrances",
        links: [],
    },
]

export default function ManageCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Dialog States
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

    // Simulate API fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            setCategories(initialCategories)
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleAddCategory = () => {
        setEditingCategory(null)
        setIsDialogOpen(true)
    }

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category)
        setIsDialogOpen(true)
    }

    const handleDeleteClick = (category: Category) => {
        setDeletingCategory(category)
        setIsDeleteDialogOpen(true)
    }

    const handleFormSubmit = (category: Category) => {
        if (editingCategory) {
            // Update
            setCategories(prev => prev.map(c => c.id === category.id ? category : c))
        } else {
            // Create
            setCategories(prev => [...prev, category])
        }
        setIsDialogOpen(false)
    }

    const handleDeleteConfirm = () => {
        if (deletingCategory) {
            setCategories(prev => prev.filter(c => c.id !== deletingCategory.id))
            setIsDeleteDialogOpen(false)
            setDeletingCategory(null)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <PageHeader
                    title="Manage Categories"
                    subtitle="Organize and manage product categories"
                />
                <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2 shadow-sm"
                    onClick={handleAddCategory}
                >
                    <HugeiconsIcon icon={Add01Icon} size={20} />
                    Add Category
                </Button>
            </div>

            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CategorySkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onEdit={handleEditCategory}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            )}

            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={editingCategory}
                onSubmit={handleFormSubmit}
            />

            <DeleteCategoryDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                categoryName={deletingCategory?.name}
            />
        </div>
    )
}
