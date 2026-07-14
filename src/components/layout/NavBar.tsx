"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  Menu,
  X,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  Package,
  Home,
  Tag,
} from "lucide-react";

export function NavBar() {
  const { data: session, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-moss shadow-[0_0_8px_var(--color-moss)]"></span>
            </span>
            <span className="font-heading font-semibold text-xl tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-moss transition-colors">
              LiveStock-Check
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-moss dark:hover:text-moss transition-colors"
            >
              Home
            </Link>
            <Link
              href="/items"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-moss dark:hover:text-moss transition-colors"
            >
              Explore Items
            </Link>

            {user ? (
              <>
                <Link
                  href="/items/add"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-moss transition-colors flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4 text-sprout" />
                  Add Item
                </Link>
                <Link
                  href="/manage"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-moss transition-colors flex items-center gap-1.5"
                >
                  <Package className="w-4 h-4 text-harbor" />
                  Manage Items
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-moss transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4 text-moss" />
                  Dashboard
                </Link>
              </>
            ) : (
              <Link
                href="/pricing"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-moss transition-colors"
              >
                Pricing
              </Link>
            )}
          </nav>

          {/* Action Buttons & Theme Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />

            {!isPending && (
              <>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="px-3.5 py-1.5 rounded-default bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors flex items-center gap-1.5 border border-zinc-300 dark:border-zinc-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/signin"
                    className="px-4 py-1.5 rounded-default bg-moss text-zinc-950 font-semibold hover:bg-sprout text-sm transition-colors shadow-sm"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <Home className="w-4 h-4 text-moss" />
            Home
          </Link>
          <Link
            href="/items"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            <Package className="w-4 h-4 text-harbor" />
            Explore Items
          </Link>

          {user ? (
            <>
              <Link
                href="/items/add"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                <PlusCircle className="w-4 h-4 text-sprout" />
                Add Item
              </Link>
              <Link
                href="/manage"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                <Package className="w-4 h-4 text-harbor" />
                Manage Items
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                <LayoutDashboard className="w-4 h-4 text-moss" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                <Tag className="w-4 h-4 text-sprout" />
                Pricing
              </Link>
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-4 w-full py-2 rounded-default bg-moss text-zinc-950 font-semibold text-sm"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
