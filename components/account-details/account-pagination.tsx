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

interface AccountPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function AccountPagination({ currentPage, totalPages, onPageChange }: AccountPaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-end mt-2">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => { e.preventDefault(); if (currentPage > 1) onPageChange(currentPage - 1) }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === i + 1}
                                onClick={(e) => { e.preventDefault(); onPageChange(i + 1) }}
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
                            onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) onPageChange(currentPage + 1) }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
