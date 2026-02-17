"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function NotificationsSkeleton() {
    return (
        <div className="divide-y divide-border/20">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4">
                    <div className="flex gap-3 items-start">
                        <Skeleton className="mt-1 h-8 w-8 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start gap-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-12 shrink-0" />
                            </div>
                            <Skeleton className="h-3.5 w-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
