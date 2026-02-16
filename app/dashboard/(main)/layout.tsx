import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function DashboardMainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-muted/40 border-r hidden md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-15 lg:px-6">
                        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                            <Image src="/assets/logo.png" width={24} height={24} alt="Dubuy Logo" className="size-6 object-contain" />
                            <span className="">Dubuy</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted transition-all hover:text-primary"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/account-details"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                Account Details
                            </Link>
                            <Link
                                href="/dashboard/manage-categories"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                Manage Categories
                            </Link>
                            <Link
                                href="/dashboard/quotations"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                Quotations
                            </Link>
                            <Link
                                href="/dashboard/payment-tracking"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                Payment Tracking
                            </Link>
                            <Link
                                href="/dashboard/order-management"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                Order Management
                            </Link>
                            <Link
                                href="/dashboard/settings"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                Settings
                            </Link>
                        </nav>
                    </div>
                </div>
            </aside>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    )
}
