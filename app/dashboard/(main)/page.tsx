import { PageHeader } from "@/components/dashboard/page-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UserManagementChart } from "@/components/dashboard/user-management-chart"
import { RecentAccounts } from "@/components/dashboard/recent-accounts"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
            <PageHeader
                title="Dashboard Overview"
                subtitle="Welcome back! Here's what's happening with your business today."
            />

            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentOrders />
                </div>
                <div className="lg:col-span-1">
                    <RecentActivity />
                </div>
            </div>

            <UserManagementChart />

            <RecentAccounts />
        </div>
    )
}
