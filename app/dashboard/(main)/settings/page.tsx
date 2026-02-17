import { SettingsMenuItem } from "@/components/settings/settings-menu-item"

export default function SettingsPage() {
    const settingsItems = [
        { title: "Personal Information", href: "/dashboard/settings/personal-information" },
        { title: "Change Password", href: "/dashboard/settings/change-password" }, // Placeholder for now
        { title: "About Us", href: "/dashboard/settings/about-us" }, // Placeholder
        { title: "Privacy Policy", href: "/dashboard/settings/privacy-policy" }, // Placeholder
        { title: "Terms & Condition", href: "/dashboard/settings/terms-conditions" }, // Placeholder
    ]

    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

            <div className="space-y-4">
                {settingsItems.map((item, index) => (
                    <SettingsMenuItem
                        key={index}
                        title={item.title}
                        href={item.href}
                    />
                ))}
            </div>
        </div>
    )
}
