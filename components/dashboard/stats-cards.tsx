import { HugeiconsIcon } from "@hugeicons/react"
import {
    Money03Icon,
    UserMultiple02Icon,
    PackageIcon,
    ArrowUp01Icon
} from "@hugeicons/core-free-icons"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
    {
        title: "Total Revenue",
        value: "AED 28,400",
        change: "+12.5% vs last month",
        icon: Money03Icon,
        iconBg: "bg-purple-100 text-purple-600",
    },
    {
        title: "Total User",
        value: "2,560",
        change: "+12.5% vs last month",
        icon: UserMultiple02Icon,
        iconBg: "bg-blue-100 text-blue-600",
    },
    {
        title: "Total Orders",
        value: "1,284",
        change: "+12.5% vs last month",
        icon: PackageIcon,
        iconBg: "bg-indigo-100 text-indigo-600",
    },
]

export function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </span>
                            <div className={`rounded-xl p-2 ${stat.iconBg}`}>
                                <HugeiconsIcon icon={stat.icon} size={20} strokeWidth={2} />
                            </div>
                        </div>
                        <div className="mt-2 space-y-1">
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center text-xs text-green-500 font-medium">
                                <HugeiconsIcon icon={ArrowUp01Icon} size={14} className="mr-1" />
                                {stat.change}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
