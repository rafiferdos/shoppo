import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard Application",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
}
