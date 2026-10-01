"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AwardIcon, Briefcase, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-clients";
import { signOut } from "@/lib/auth-api";

const links = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/companies", label: "Companies" },
];


export function Navbar() {
  const pathname = usePathname();
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  const loginVariant = pathname === "/login" ? "default" : "ghost";
  const signupVariant = pathname === "/register" ? "default" : "ghost";

  async function handleLogOut(){
    await signOut();
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-100 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="/logo.png"
            alt="Careerly logo"
            width={32}
            height={32}
            priority
          />
          <span>Careerly</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "rounded-full p-0",
                )}
              >
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: loginVariant })}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: signupVariant })}
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden",
            )}
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-10 flex flex-col gap-4 px-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium",
                    pathname === link.href && "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <hr />
              {!user && (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: pathname === "/login" ? "default" : "outline",
                    })}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className={buttonVariants({
                      variant: pathname === "/register" ? "default" : "outline",
                    })}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
