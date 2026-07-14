import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Payment Cancelled | LiveStock-Check",
  description: "Your checkout process was cancelled.",
};

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white dark:bg-zinc-950 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
        {/* Cancel Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <XCircle className="w-10 h-10 stroke-[2]" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-zinc-900 dark:text-zinc-100">
            Payment Cancelled
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            It looks like you cancelled the checkout process. No charges were
            made to your account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-moss hover:bg-moss/90 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-moss/15"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 font-semibold text-sm inline-flex items-center justify-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
