"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function UserManagementChartSkeleton() {
    return (
        <Card className="col-span-4 shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <Skeleton className="h-6 w-40" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-14 rounded-full" />
                    <Skeleton className="h-9 w-25 rounded-md" />
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-80 flex items-end gap-3 px-8 pb-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <Skeleton
                                className="w-full rounded-t-sm"
                                style={{ height: `${Math.floor(Math.random() * 150) + 80}px` }}
                            />
                            <Skeleton className="h-3 w-8" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
