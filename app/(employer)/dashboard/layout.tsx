import { requireRole } from "@/lib/session"

export default async function DashboardLayot({
    children,
}:{
    children: React.ReactNode
}) {
    await requireRole('EMPLOYER')
    return <>{children}</>
}