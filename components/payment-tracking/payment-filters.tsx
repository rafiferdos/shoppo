"use client"

import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { FilterHorizontalIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface PaymentFiltersProps {
    currentFilter: string
    onFilterChange: (filter: string) => void
}

export function PaymentFilters({ currentFilter, onFilterChange }: PaymentFiltersProps) {
    const filters = [
        { id: "All", label: "All" },
        { id: "Paid", label: "Paid" },
        { id: "Pending", label: "Pending" },
        { id: "Overdue", label: "Overdue" },
    ]

    return (
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border shadow-sm w-fit">
            <div className="flex items-center gap-2 px-2 text-muted-foreground">
                <HugeiconsIcon icon={FilterHorizontalIcon} size={20} />
                <span className="text-sm font-medium">Filter by status:</span>
            </div>
            <div className="flex items-center gap-1">
                {filters.map((filter) => (
                    <Button
                        key={filter.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => onFilterChange(filter.id)}
                        className={cn(
                            "rounded-md text-sm font-medium transition-colors hover:bg-muted",
                            currentFilter === filter.id
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}
