"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { AccountFilters } from "@/components/account-details/account-filters"
import { AccountTable, User } from "@/components/account-details/account-table"
import { AccountTableSkeleton } from "@/components/account-details/account-table-skeleton"
import { AccountPagination } from "@/components/account-details/account-pagination"
import { ViewUserDialog } from "@/components/account-details/view-user-dialog"
import { BlockUserDialog } from "@/components/account-details/block-user-dialog"

// Mock Data
const generateAccounts = (): User[] => {
    const data: User[] = []
    for (let i = 1; i <= 25; i++) {
        data.push({
            id: i,
            serial: `#${i.toString().padStart(2, '0')}`,
            name: "Ali Ahmed",
            phone: "+218214441754",
            type: "User",
            date: "11 Aug, 2025",
            rawDate: new Date(2025, 7, 11), // 11 Aug 2025
            avatar: "/assets/avatar-placeholder.png",
            location: "Tripoli, Libya",
            joinDate: "10 Jan, 2025"
        })
    }
    return data
}

export default function AccountDetailsPage() {
    const [accountsData, setAccountsData] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Dialog States
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isBlockOpen, setIsBlockOpen] = useState(false)

    // Simulate API fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            setAccountsData(generateAccounts())
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    // Filter Logic
    const filteredAccounts = accountsData.filter(account => {
        const matchesPhone = account.phone.includes(searchTerm)
        let matchesDate = true
        if (date) {
            const selectedDateStr = format(date, "d MMM, yyyy")
            matchesDate = account.date === selectedDateStr
        }
        return matchesPhone && matchesDate
    })

    // Pagination Logic
    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage)
    const paginatedAccounts = filteredAccounts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleView = (user: User) => {
        setSelectedUser(user)
        setIsViewOpen(true)
    }

    const handleBlock = (user: User) => {
        setSelectedUser(user)
        setIsBlockOpen(true)
    }

    const handleBlockConfirm = () => {
        // Here you would implement the actual block logic
        console.log("Blocking user:", selectedUser?.name)
        setIsBlockOpen(false)
    }

    return (
        <div className="flex flex-col gap-6 w-full">

            <AccountFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                date={date}
                onDateChange={setDate}
            />

            {isLoading ? (
                <AccountTableSkeleton />
            ) : (
                <AccountTable
                    data={paginatedAccounts}
                    onView={handleView}
                    onBlock={handleBlock}
                />
            )}

            {!isLoading && (
                <AccountPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <ViewUserDialog
                open={isViewOpen}
                onOpenChange={setIsViewOpen}
                user={selectedUser}
            />

            <BlockUserDialog
                open={isBlockOpen}
                onOpenChange={setIsBlockOpen}
                onConfirm={handleBlockConfirm}
            />

        </div>
    )
}
