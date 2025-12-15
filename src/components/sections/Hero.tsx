"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroProps } from "@/types";

export function Hero({ onJobSeekerClick, onRecruiterClick }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-100"
        >
          Early access · Validation phase
        </motion.p>
        <h1
          id="hero-heading"
          className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          Only BPO & Call Center Jobs. No IT Noise.
        </h1>
        <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
          A dedicated hiring platform for support roles — faster hiring, verified
          recruiters, and clear shift details.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            onClick={onJobSeekerClick}
            className="w-full sm:w-auto"
            size="lg"
          >
            I&apos;m looking for a job
          </Button>
          <Button
            onClick={onRecruiterClick}
            variant="outline"
            className="w-full sm:w-auto"
            size="lg"
          >
            I&apos;m hiring
          </Button>
        </motion.div>
        <p className="mt-3 text-xs text-slate-500">
          {/* No sign-ups yet. */}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-dashed border-blue-100 bg-gradient-to-br from-blue-50/50 to-white p-6 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          Why this exists
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Support hiring is different from IT hiring. Shift timings, processes,
          language skills and stability matter more than fancy tech stacks.
        </p>
        {/* We're validating interest from both sides first. */}
      </motion.div>
    </section>
  );
}

