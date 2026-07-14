import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Dashboard | LiveStock-Check",
  description:
    "Manage your livestock inventory workspace, subscription, and quick actions.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-[85vh] bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </div>
    </div>
  );
}
