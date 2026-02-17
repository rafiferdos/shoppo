"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function QuotationsStatsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="shadow-sm border-none">
                    <CardContent className="px-4 flex justify-between items-center">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-7 w-16" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-lg" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
