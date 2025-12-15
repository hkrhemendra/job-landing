"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function SolutionSection() {
  const solutions = [
    {
      title: "Only support jobs",
      description:
        "No IT or engineering noise. Just voice, chat, email and process support roles.",
    },
    {
      title: "Shift & process filters",
      description:
        "Filter by shift type, process (inbound/outbound/chat/email) and language needs.",
    },
    {
      title: "Verified recruiters only",
      description:
        "Work only with recruiters and companies that have been manually verified.",
    },
  ];

  return (
    <section
      id="solution"
      aria-labelledby="solution-heading"
      className="mt-10 border-y border-slate-200 py-8"
    >
      <h2
        id="solution-heading"
        className="text-lg font-semibold tracking-tight text-slate-900"
      >
        A platform built only for support jobs
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Focused, filtered and transparent — for BPO, KPO, call center and customer support roles.
      </p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {solutions.map((solution, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-lg bg-gradient-to-br from-blue-50/50 to-white p-4 ring-1 ring-blue-50 hover:shadow-md transition-all"
          >
            <dt className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              {solution.title}
            </dt>
            <dd className="mt-2 text-xs text-slate-600">
              {solution.description}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}

