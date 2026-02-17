"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

interface QuotationPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function QuotationPagination({ currentPage, totalPages, onPageChange }: QuotationPaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-end mt-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (currentPage > 1) onPageChange(currentPage - 1) }}
                            className={cn(
                                "transition-all",
                                currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"
                            )}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === i + 1}
                                onClick={(e) => { e.preventDefault(); onPageChange(i + 1) }}
                                className={cn(
                                    "cursor-pointer transition-all",
                                    currentPage === i + 1
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground rounded-md shadow-sm"
                                        : "hover:bg-primary/10 border-transparent"
                                )}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) onPageChange(currentPage + 1) }}
                            className={cn(
                                "transition-all",
                                currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
