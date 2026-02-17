"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, Delete02Icon } from "@hugeicons/core-free-icons"

export interface Category {
    id: string
    name: string
    description: string
    links: string[]
    icon?: string
}

interface CategoryCardProps {
    category: Category
    onEdit: (category: Category) => void
    onDelete: (category: Category) => void
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
    return (
        <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 relative">
                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md"
                        onClick={() => onEdit(category)}
                    >
                        <HugeiconsIcon icon={Edit02Icon} size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-md"
                        onClick={() => onDelete(category)}
                    >
                        <HugeiconsIcon icon={Delete02Icon} size={18} />
                    </Button>
                </div>

                {/* Icon */}
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <Image
                        src="/assets/dashboard-icons-svg/manage-category.svg"
                        alt="Category Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                    />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg leading-none tracking-tight">{category.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
