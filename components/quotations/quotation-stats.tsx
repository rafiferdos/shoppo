"use client"

import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    File02Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    Cancel01Icon
} from "@hugeicons/core-free-icons"

export function QuotationsStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Total Quotations</p>
                        <p className="text-2xl font-bold">550</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                        <HugeiconsIcon icon={File02Icon} size={20} />
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                        <p className="text-2xl font-bold">450</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Pending</p>
                        <p className="text-2xl font-bold">40</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">
                        <HugeiconsIcon icon={Clock01Icon} size={20} />
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-sm border-none">
                <CardContent className="px-4 flex justify-between items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                        <p className="text-2xl font-bold">22</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                        <HugeiconsIcon icon={Cancel01Icon} size={20} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
