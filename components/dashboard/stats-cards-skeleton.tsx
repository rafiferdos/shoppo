"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function StatsCardsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-sm">
                    <CardContent className="px-4">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-10 rounded-xl" />
                        </div>
                        <div className="mt-2 space-y-2">
                            <Skeleton className="h-7 w-32" />
                            <Skeleton className="h-3.5 w-40" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
