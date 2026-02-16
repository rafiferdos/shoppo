import Image from "next/image"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10 relative overflow-hidden">
                <div className="flex justify-center gap-2 md:justify-start z-20">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Image src="/assets/logo.png" width={24} height={24} alt="Logo" className="size-5 object-contain" />
                        </div>
                        <span className="text-lg font-bold">Acme Inc.</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center relative">
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-5 dark:opacity-10">
                        <Image src="/assets/dotted-world-map.png" fill className="object-contain" alt="World Map Pattern" />
                    </div>
                    <div className="w-full max-w-sm relative z-10 bg-background/60 backdrop-blur-sm p-6 rounded-xl border border-border/40 shadow-sm">
                        {children}
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/assets/auth-side-bg.png"
                    alt="Authentication Background"
                    fill
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    priority
                />
            </div>
        </div>
    )
}
