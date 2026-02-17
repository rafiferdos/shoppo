"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function PersonalInfoSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card Skeleton */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 shadow-sm border border-border/40 h-fit">
                <Skeleton className="h-36 w-36 rounded-full" />
                <div className="text-center space-y-2">
                    <Skeleton className="h-3.5 w-16 mx-auto" />
                    <Skeleton className="h-7 w-20 mx-auto" />
                </div>
            </div>

            {/* Information Form Skeleton */}
            <div className="md:col-span-2 space-y-6 bg-white rounded-2xl p-8 shadow-sm border border-border/40">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24 ml-1" />
                        <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    )
}
