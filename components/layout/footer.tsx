import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Careerly. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link href="/jobs" className="hover:text-foreground">
            Jobs
          </Link>
          <Link href="/companies" className="hover:text-foreground">
            Companies
          </Link>
        </nav>
      </div>
    </footer>
  );
}