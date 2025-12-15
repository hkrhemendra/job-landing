"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export function TrustSection() {
  return (
    <motion.section
      aria-labelledby="trust-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="mt-10 rounded-xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50/30 px-6 py-5 text-sm text-slate-700 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h2
            id="trust-heading"
            className="text-sm font-semibold tracking-tight text-slate-900"
          >
            Built from real conversations
          </h2>
          <p className="mt-2 text-xs text-slate-700 leading-relaxed">
            Built after speaking with BPO recruiters and support job seekers about
            the gaps in today&apos;s generic job portals.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

