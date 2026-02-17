"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { QuotationsStats } from "@/components/quotations/quotation-stats"
import { QuotationsTable } from "@/components/quotations/quotation-table"
import { QuotationsSkeleton } from "@/components/quotations/quotation-skeleton"
import { QuotationDetailsDialog, type Quotation } from "@/components/quotations/quotation-details-dialog"

// Mock Data
const generateQuotations = (): Quotation[] => {
    return Array.from({ length: 15 }).map((_, i) => ({
        id: i.toString(),
        serial: `#${(i + 1).toString().padStart(3, '0')}`,
        customer: {
            name: "Ali Ahmed",
            phone: "+218 92 123 4567",
        },
        product: {
            name: "iPhone 17 pro max",
            price: i % 3 === 0 ? "3125 AED" : "AED 3451",
            link: "https://amazon.com/electronics/iPhone",
            notes: "Color: Black & White, Quantity: 2",
        },
        date: "2026-01-16",
        status: i % 4 === 0 ? "Pending" : i % 4 === 1 ? "Accepted" : i % 4 === 2 ? "Accepted" : "Rejected",
        internationalCharge: "AED 150",
        homeDeliveryCharge: "AED 50"
    }))
}

export default function QuotationsPage() {
    const [quotations, setQuotations] = useState<Quotation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        // Simulate API
        const timer = setTimeout(() => {
            setQuotations(generateQuotations())
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
        setQuotations(prev => prev.map(q => q.id === quotation.id ? { ...q, status: "Accepted" as const, internationalCharge: charges.international, homeDeliveryCharge: charges.home } : q))
        setIsDialogOpen(false)
    }

    const handleReject = (quotation: Quotation) => {
        console.log("Rejected", quotation.id)
        // Update mock state
        setQuotations(prev => prev.map(q => q.id === quotation.id ? { ...q, status: "Rejected" as const } : q))
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Quotations"
                subtitle="Review and manage product quotation requests"
            />

            <QuotationsStats />

            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Quotation Requests</h2>
                {isLoading ? (
                    <QuotationsSkeleton />
                ) : (
                    <QuotationsTable
                        data={quotations}
                        onView={handleViewQuotation}
                    />
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
