import { requireRole } from "@/lib/core/session";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin Portal | LiveStock-Check",
  description: "System-wide inventory and user management portal.",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("admin");

  return (
    <div className="min-h-[85vh] space-y-8">
      {/* Admin Distinct Top Bar / Header */}
      <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-md border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 border border-amber-500/30">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-heading">
                System Administration
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-widest">
                ADMIN PORTAL
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              System-wide metrics, global inventory overview, and user control.
            </p>
          </div>
        </div>

        {/* Quick Nav back to User Dashboard */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-all border border-zinc-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>User Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Main Admin Content */}
      <div>{children}</div>
    </div>
  );
}
