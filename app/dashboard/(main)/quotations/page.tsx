"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { QuotationsStats } from "@/components/quotations/quotation-stats"
import { QuotationsStatsSkeleton } from "@/components/quotations/quotation-stats-skeleton"
import { QuotationsTable } from "@/components/quotations/quotation-table"
import { QuotationsSkeleton } from "@/components/quotations/quotation-skeleton"
import { QuotationDetailsDialog, type Quotation } from "@/components/quotations/quotation-details-dialog"

import { QuotationPagination } from "@/components/quotations/quotation-pagination"

// Mock Data
const generateQuotations = (): Quotation[] => {
    const names = ["Ali Ahmed", "Sara Khan", "Mohamed Salem", "Fatima Al-Farsi", "Omar Hassan", "Noor Al-Said", "Zaid Ibrahim", "Laila Mahmoud", "Youssef Abbas", "Hana Al-Shami"]
    const products = [
        { name: "iPhone 17 Pro Max", price: "5500 AED", link: "https://amazon.ae/iphone-17" },
        { name: "Samsung Galaxy S25 Ultra", price: "4800 AED", link: "https://noon.com/samsung-s25" },
        { name: "Sony WH-1000XM6", price: "1200 AED", link: "https://sony.com/headphones" },
        { name: "MacBook Pro M4 14\"", price: "8900 AED", link: "https://apple.com/macbook-pro" },
        { name: "DJI Mavic 4", price: "4200 AED", link: "https://dji.com/mavic" },
        { name: "iPad Air 6", price: "2800 AED", link: "https://apple.com/ipad-air" },
        { name: "Nintendo Switch 2", price: "1800 AED", link: "https://nintendo.com/switch" }
    ]
    const notes = [
        "Color: Black & White, Quantity: 2",
        "Express delivery required",
        "Gift wrapping if possible",
        "Include international warranty",
        "Quantity: 5 for office use",
        "Please check stock availability first"
    ]
    const statuses: ("Pending" | "Accepted" | "Rejected")[] = ["Pending", "Accepted", "Accepted", "Rejected"]

    return Array.from({ length: 35 }).map((_, i) => {
        const product = products[i % products.length]
        return {
            id: i.toString(),
            serial: `#${(i + 1).toString().padStart(3, '0')}`,
            customer: {
                name: names[i % names.length],
                phone: `+218 ${92 + (i % 5)} ${123 + i} ${4567 + i}`,
            },
            product: {
                ...product,
                price: i % 3 === 0 ? product.price : `AED ${parseInt(product.price) + i * 10}`,
                notes: notes[i % notes.length],
            },
            date: `2026-01-${(i % 28 + 1).toString().padStart(2, '0')}`,
            status: statuses[i % statuses.length],
            internationalCharge: "AED 150",
            homeDeliveryCharge: "AED 50"
        }
    })
}

export default function QuotationsPage() {
    const [allQuotations, setAllQuotations] = useState<Quotation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        // Simulate API
        const timer = setTimeout(() => {
            setAllQuotations(generateQuotations())
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleViewQuotation = (quotation: Quotation) => {
        setSelectedQuotation(quotation)
        setIsDialogOpen(true)
    }

    const handleAccept = (quotation: Quotation, charges: { international: string, home: string }) => {
        console.log("Accepted", quotation.id, charges)
        // Update mock state
        setAllQuotations(prev => prev.map(q => q.id === quotation.id ? { ...q, status: "Accepted" as const, internationalCharge: charges.international, homeDeliveryCharge: charges.home } : q))
        setIsDialogOpen(false)
    }

    const handleReject = (quotation: Quotation) => {
        console.log("Rejected", quotation.id)
        // Update mock state
        setAllQuotations(prev => prev.map(q => q.id === quotation.id ? { ...q, status: "Rejected" as const } : q))
        setIsDialogOpen(false)
    }

    // Pagination Logic
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const currentQuotations = allQuotations.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(allQuotations.length / itemsPerPage)

    return (
        <div className="space-y-8">
            <PageHeader
                title="Quotations"
                subtitle="Review and manage product quotation requests"
            />

            {isLoading ? <QuotationsStatsSkeleton /> : <QuotationsStats />}

            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Quotation Requests</h2>
                {isLoading ? (
                    <QuotationsSkeleton />
                ) : (
                    <>
                        <QuotationsTable
                            data={currentQuotations}
                            onView={handleViewQuotation}
                        />
                        <QuotationPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>

            <QuotationDetailsDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                quotation={selectedQuotation}
                onAccept={handleAccept}
                onReject={handleReject}
            />
        </div>
    )
}
