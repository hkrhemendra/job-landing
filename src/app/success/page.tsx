"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isJobSeeker = type === "job-seeker";
  const isRecruiter = type === "recruiter";

  const title = isJobSeeker
    ? "Application Submitted Successfully!"
    : isRecruiter
    ? "Thank You for Your Interest!"
    : "Submission Successful!";

  const message = isJobSeeker
    ? "We've received your details and will notify you when we launch in your city. Keep an eye on your phone for updates!"
    : isRecruiter
    ? "We've received your hiring requirements and will reach out soon to understand your needs better. We're excited to help you find the right talent!"
    : "We've received your submission successfully.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              {title}
            </motion.h1>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base md:text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed"
            >
              {message}
            </motion.p>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 mb-8 border border-blue-200"
            >
              <div className="flex items-start gap-3 text-left">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    What happens next?
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isJobSeeker && (
                      <>
                        We&apos;re currently in the validation phase. Once we have
                        enough interest in your city, we&apos;ll start onboarding
                        verified recruiters and notify you about relevant job
                        openings.
                      </>
                    )}
                    {isRecruiter && (
                      <>
                        Our team will review your requirements and reach out to
                        discuss how we can help you find quality candidates for
                        your support roles. We&apos;re building a platform
                        specifically for BPO, KPO, and call center hiring.
                      </>
                    )}
                    {!isJobSeeker && !isRecruiter && (
                      <>
                        We&apos;ll review your submission and get back to you soon
                        with next steps.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              {isJobSeeker && (
                <Link href="/#recruiters">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Are you hiring?
                  </Button>
                </Link>
              )}
              {isRecruiter && (
                <Link href="/#job-seekers">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Looking for a job?
                  </Button>
                </Link>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-xs text-slate-500 mt-8"
            >
              Questions? Reach us at{" "}
              <a
                href="mailto:hemendralalawat30@gmail.com"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                hemendralalawat30@gmail.com
              </a>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center">
          <div className="text-slate-600">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
