"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProblemSection() {
  const problems = [
    {
      id: 1,
      color: "red",
      title: "Fake or misleading postings",
      description:
        "Confusing agency chains, hidden terms, and roles that don't match the description.",
    },
    {
      id: 2,
      color: "amber",
      title: "Too many irrelevant candidates",
      description:
        "Recruiters get flooded with non-support profiles and people not ready for shift work.",
    },
    {
      id: 3,
      color: "blue",
      title: "No clarity on basics",
      description:
        "Shift, salary range, process rounds and work location are rarely clear upfront.",
    },
  ];

  const colorClasses = {
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="mt-10"
    >
      <h2
        id="problem-heading"
        className="text-lg font-semibold tracking-tight text-slate-900"
      >
        The problem with generic job portals
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Support hiring today is noisy and inefficient for both job seekers and recruiters.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {problems.map((problem, idx) => (
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div
                className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  colorClasses[problem.color as keyof typeof colorClasses]
                }`}
              >
                {problem.id}
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                {problem.title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600">{problem.description}</p>
            </CardContent>
          </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

