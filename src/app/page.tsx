"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { JobSeekerForm } from "@/components/forms/JobSeekerForm";
import { RecruiterForm } from "@/components/forms/RecruiterForm";
import { Toast } from "@/components/ui/toast";
import { initAnalytics } from "@/lib/firebase";
import { ToastState } from "@/types";

const initialToast: ToastState = {
  message: "",
  open: false,
};

export default function Home() {
  const [toast, setToast] = useState<ToastState>(initialToast);

  useEffect(() => {
    // Initialize Firebase Analytics on the client only
    initAnalytics().catch((err) => {
      console.warn("Analytics not enabled:", err);
    });
  }, []);

  const showToast = (message: string) => {
    setToast({ message, open: true });
    window.setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2800);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToJobSeekers = () => {
    scrollToSection("job-seekers");
  };

  const scrollToRecruiters = () => {
    scrollToSection("recruiters");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <Hero
          onJobSeekerClick={scrollToJobSeekers}
          onRecruiterClick={scrollToRecruiters}
        />
        <ProblemSection />
        <SolutionSection />
        <div className="mt-12 grid gap-8 lg:grid-cols-2" id="forms">
          <JobSeekerForm
            onSuccess={() =>
              showToast("Thanks! We will notify you when we launch in your city.")
            }
          />
          <RecruiterForm
            onSuccess={() =>
              showToast("Thanks! We will reach out to understand your hiring needs.")
            }
          />
        </div>
        <TrustSection />
      </main>

      <Footer />

      <Toast open={toast.open}>{toast.message}</Toast>
    </div>
  );
}
