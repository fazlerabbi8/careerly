export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      {children}
    </div>
  )
}