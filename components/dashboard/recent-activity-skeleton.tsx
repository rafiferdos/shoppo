"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function RecentActivitySkeleton() {
    return (
        <Card className="col-span-1 shadow-sm border-none h-full flex flex-col">
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-6 h-95 overflow-auto pr-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-start">
                            <Skeleton className="mr-4 h-9 w-9 rounded-full shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3.5 w-36" />
                            </div>
                            <Skeleton className="h-3 w-20 shrink-0" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
