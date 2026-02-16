import Image from "next/image"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/assets/auth-side-bg.png"
          alt="Authentication Background"
          fill
          className="absolute inset-0 h-full w-full object-cover p-2 rounded-xl bg-white"
          priority
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 relative overflow-hidden items-center justify-center">
        <div className="w-full max-w-sm relative z-10 bg-background/60 backdrop-blur-sm p-8 rounded-xl border border-border/40 shadow-sm flex flex-col items-center">
            <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden rounded-t-xl -z-10 opacity-20">
                 <Image src="/assets/dotted-world-map.png" fill className="object-cover object-top" alt="World Map Pattern" />
            </div>
          {children}
        </div>
      </div>
    </div>
    )
}
