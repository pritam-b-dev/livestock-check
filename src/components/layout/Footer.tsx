import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-moss"></span>
              </span>
              <span className="font-heading font-semibold text-lg text-foreground">
                LiveStock-Check
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Real-time livestock management, tracking, and analytics platform
              built for modern farms and enterprise operations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-medium text-sm text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href="/" className="hover:text-moss transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/items"
                  className="hover:text-moss transition-colors"
                >
                  Explore Items
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-moss transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-moss transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-moss transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-heading font-medium text-sm text-foreground">
              Contact
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-harbor" />
                <span>support@livestock-check.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-harbor" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-harbor" />
                <span>100 Agro Tech Way, Suite 400</span>
              </li>
            </ul>
          </div>

          {/* Social Links using react-icons */}
          <div className="space-y-3">
            <h4 className="font-heading font-medium text-sm text-foreground">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-default bg-zinc-100 dark:bg-zinc-800/80 hover:text-moss transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-default bg-zinc-100 dark:bg-zinc-800/80 hover:text-moss transition-colors"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-default bg-zinc-100 dark:bg-zinc-800/80 hover:text-moss transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>
            © {new Date().getFullYear()} LiveStock-Check. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
