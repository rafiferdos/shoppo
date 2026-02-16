import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    subtitle?: string
}

export function PageHeader({ title, subtitle, className, ...props }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-1", className)} {...props}>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
                <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
        </div>
    )
}
