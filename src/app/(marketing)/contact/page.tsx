"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ক্লায়েন্ট-সাইড সিমুলেশন
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Header Section */}
      <section className="relative py-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moss/10 text-moss text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-zinc-900 dark:text-zinc-50">
            We&apos;re here to help
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Have questions about LiveStock-Check or need support with your farm
            inventory? Reach out to our team anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="text-xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
                  Contact Information
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Fill out the form or reach us directly via email or phone. Our
                  dedicated support team responds within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-moss/10 text-moss shrink-0">
                    <Mail className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Email Us
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      support@livestockcheck.com
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      sales@livestockcheck.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-moss/10 text-moss shrink-0">
                    <Phone className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Call Us
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      +880 (1700) 000-000
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Mon - Fri, 9:00 AM - 6:00 PM (BST)
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-moss/10 text-moss shrink-0">
                    <MapPin className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Headquarters
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Level 4, AgriTech Tower, Gulshan-2, <br />
                      Dhaka-1212, Bangladesh
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-moss/10 text-moss shrink-0">
                    <Clock className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Working Hours
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Sunday — Thursday: 9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. tanvir@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="e.g. Inquiry about Growth Plan"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-moss hover:bg-moss/90 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-moss/15 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
