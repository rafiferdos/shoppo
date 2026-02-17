"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { PaymentStats } from "@/components/payment-tracking/payment-stats"
import { PaymentStatsSkeleton } from "@/components/payment-tracking/payment-stats-skeleton"
import { PaymentFilters } from "@/components/payment-tracking/payment-filters"
import { PaymentTable } from "@/components/payment-tracking/payment-table"
import { PaymentTableSkeleton } from "@/components/payment-tracking/payment-table-skeleton"
import { PaymentPagination } from "@/components/payment-tracking/payment-pagination"
import { PaymentDetailsDialog } from "@/components/payment-tracking/payment-details-dialog"
import { Payment } from "@/components/payment-tracking/types"

// Mock Data Generator
const generatePayments = (): Payment[] => {
    const names = ["Ali Ahmed", "Sara Khan", "Mohamed Salem", "Fatima Al-Farsi", "Omar Hassan", "Noor Al-Said", "Zaid Ibrahim", "Laila Mahmoud", "Youssef Abbas", "Hana Al-Shami"]
    const products = [
        { name: "iPhone 17 Pro Max", price: "5500 AED" },
        { name: "Samsung Galaxy S25 Ultra", price: "4800 AED" },
        { name: "Sony WH-1000XM6", price: "1200 AED" },
        { name: "MacBook Pro M4 14\"", price: "8900 AED" },
        { name: "DJI Mavic 4", price: "4200 AED" },
        { name: "iPad Air 6", price: "2800 AED" },
        { name: "Nintendo Switch 2", price: "1800 AED" },
        { name: "PlayStation 6", price: "2400 AED" },
        { name: "Xbox Series Z", price: "2300 AED" },
        { name: "Dell XPS 15", price: "7500 AED" }
    ]

    return Array.from({ length: 45 }).map((_, i) => {
        const product = products[i % products.length]
        const total = parseInt(product.price.split(' ')[0])
        const upfront = Math.floor(total * 0.3) // 30% upfront
        const final = total - upfront

        // Random statuses
        const upfrontStatus = Math.random() > 0.1 ? "Paid" : "Pending"
        const finalStatus = upfrontStatus === "Pending" ? "Pending" : (Math.random() > 0.7 ? "Paid" : Math.random() > 0.5 ? "Pending" : "Overdue")

        return {
            id: i.toString(),
            serial: `#${(i + 1).toString().padStart(3, '0')}`,
            customer: {
                name: names[i % names.length],
                phone: `+218 ${92 + (i % 5)} ${123 + i} ${4567 + i}`,
            },
            product: {
                name: product.name,
                price: product.price,
                notes: `Quantity: ${1 + (i % 3)}, Color: ${i % 2 === 0 ? "Black" : "White"}`,
            },
            upfront: {
                amount: `AED ${upfront}`,
                status: upfrontStatus as any,
                paidDate: upfrontStatus === "Paid" ? `2026-01-${(i % 20 + 1).toString().padStart(2, '0')}` : undefined
            },
            final: {
                amount: `AED ${final}`,
                status: finalStatus as any,
                dueDate: `2026-02-${(i % 20 + 1).toString().padStart(2, '0')}`
            },
            totalAmount: product.price,
            dueDate: `2026-02-${(i % 20 + 1).toString().padStart(2, '0')}`
        }
    })
}

export default function PaymentTrackingPage() {
    const [allPayments, setAllPayments] = useState<Payment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filter, setFilter] = useState("All")

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        // Simulate API
        const timer = setTimeout(() => {
            setAllPayments(generatePayments())
            setIsLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    const handleViewPayment = (payment: Payment) => {
        setSelectedPayment(payment)
        setIsDialogOpen(true)
    }

    const handleSendReminder = (payment: Payment) => {
        console.log("Sending reminder to", payment.customer.name)
        // Simulate sending reminder
    }

    const handleMarkAsPaid = (payment: Payment) => {
        console.log("Marking as paid", payment.id)
        setAllPayments(prev => prev.map(p => {
            if (p.id === payment.id) {
                return {
                    ...p,
                    upfront: { ...p.upfront, status: "Paid" },
                    final: { ...p.final, status: "Paid" }
                }
            }
            return p
        }))
        setIsDialogOpen(false)
    }

    // Filter Logic
    const filteredPayments = allPayments.filter(payment => {
        if (filter === "All") return true
        if (filter === "Paid") return payment.final.status === "Paid" && payment.upfront.status === "Paid"
        if (filter === "Pending") return payment.final.status === "Pending" || payment.upfront.status === "Pending"
        if (filter === "Overdue") return payment.final.status === "Overdue" || payment.upfront.status === "Overdue"
        return true
    })

    // Pagination Logic
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const currentPayments = filteredPayments.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [filter])

    return (
        <div className="space-y-8">
            <PageHeader
                title="Payment Tracking"
                subtitle="Monitor upfront and final payments for all orders"
            />

            {isLoading ? <PaymentStatsSkeleton /> : <PaymentStats />}

            <div className="space-y-4">
                <PaymentFilters
                    currentFilter={filter}
                    onFilterChange={setFilter}
                />

                {isLoading ? (
                    <PaymentTableSkeleton />
                ) : (
                    <>
                        <PaymentTable
                            data={currentPayments}
                            onView={handleViewPayment}
                        />
                        <PaymentPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>

            <PaymentDetailsDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                payment={selectedPayment}
                onSendReminder={handleSendReminder}
                onMarkAsPaid={handleMarkAsPaid}
            />
        </div>
    )
}
