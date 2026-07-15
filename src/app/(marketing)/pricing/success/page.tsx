import Link from "next/link";
import { redirect } from "next/navigation";
import { confirmPayment } from "@/lib/actions/payment";
import { CheckCircle2, ArrowRight, LayoutDashboard } from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export const metadata = {
  title: "Payment Successful | LiveStock-Check",
  description: "Your plan upgrade has been confirmed.",
};

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/pricing");
  }

  let planName = "New Plan";
  let isVerified = false;

  try {
    const response = await confirmPayment(session_id);
    if (response?.data) {
      planName = response.data.planName || "Subscription";
      isVerified = true;
    }
  } catch (error) {
    console.error("Payment confirmation failed:", error);
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white dark:bg-zinc-950 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-900 dark:text-zinc-100">
            Payment Successful!
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Thank you for upgrading your account. Your subscription to{" "}
            <span className="font-semibold text-moss">{planName}</span> is now
            active.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-moss hover:bg-moss/90 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-moss/15"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>

          <Link
            href="/items"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 font-semibold text-sm inline-flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Browse Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
