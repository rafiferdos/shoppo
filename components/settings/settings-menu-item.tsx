"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface SettingsMenuItemProps {
    title: string
    href: string
}

export function SettingsMenuItem({ title, href }: SettingsMenuItemProps) {
    return (
        <Link href={href}>
            <div className="bg-white rounded-xl p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-primary/10 group">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
        </Link>
    )
}
