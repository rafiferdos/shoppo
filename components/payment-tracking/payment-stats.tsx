"use client"

import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    MoneyBag02Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    AlertCircleIcon
} from "@hugeicons/core-free-icons"

export function PaymentStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center py-6">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">AED 31,300</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                        <HugeiconsIcon icon={MoneyBag02Icon} size={20} />
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center py-6">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
                        <p className="text-2xl font-bold">AED 10,400</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center py-6">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Pending</p>
                        <p className="text-2xl font-bold">AED 5,900</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">
                        <HugeiconsIcon icon={Clock01Icon} size={20} />
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center py-6">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                        <p className="text-2xl font-bold">AED 5,000</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                        <HugeiconsIcon icon={AlertCircleIcon} size={20} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
