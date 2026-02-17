"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function CategorySkeleton() {
    return (
        <Card className="h-45 p-6">
            <div className="flex justify-between items-start">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </Card>
    )
}
