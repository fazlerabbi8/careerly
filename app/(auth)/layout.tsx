import { getSession } from "@/lib/session"
import { redirect } from "next/navigation";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if(session){
    redirect('/')
  }
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      {children}
    </div>
  )
}