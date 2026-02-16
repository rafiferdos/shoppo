import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Invoice01Icon,
    Money03Icon,
    CheckmarkCircle02Icon,
    TruckIcon,
    Alert01Icon
} from "@hugeicons/core-free-icons"

const activities = [
    {
        icon: Invoice01Icon,
        title: "Quotation received",
        desc: "from Ali Ahmed",
        time: "5 minutes ago",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: Money03Icon,
        title: "Payment Confirmed",
        desc: "AED 1,234 by Ali Ahmed",
        time: "15 minutes ago",
        color: "bg-green-100 text-green-600",
    },
    {
        icon: TruckIcon,
        title: "At Warehouse",
        desc: "Successfully delivered in Tripoli",
        time: "15 minutes ago",
        color: "bg-green-100 text-green-600",
    },
    {
        icon: Alert01Icon,
        title: "Payment Confirmed",
        desc: "AED 1,234 by Ali Ahmed",
        time: "15 minutes ago",
        color: "bg-green-100 text-green-600",
    },
    {
        icon: Invoice01Icon,
        title: "Quotation received",
        desc: "from Ali Ahmed",
        time: "5 minutes ago",
        color: "bg-blue-100 text-blue-600",
    },
]

export function RecentActivity() {
    return (
        <Card className="col-span-1 shadow-sm border-none h-full flex flex-col">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-6 h-95 overflow-auto pr-2">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-start">
                            <div className={`mr-4 flex h-9 w-9 items-center justify-center rounded-full ${activity.color}`}>
                                <HugeiconsIcon icon={activity.icon} size={16} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {activity.desc}
                                </p>
                            </div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
