"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-blue-700">
            SupportJobs
          </span>
          <span className="text-xs text-slate-500">
            Only BPO, KPO & Call Center roles
          </span>
        </div>
        <nav className="hidden gap-6 text-sm text-slate-600 sm:flex">
          <a
            href="#problem"
            className="transition-colors hover:text-slate-900"
          >
            Problem
          </a>
          <a
            href="#solution"
            className="transition-colors hover:text-slate-900"
          >
            Solution
          </a>
          <a
            href="#job-seekers"
            className="transition-colors hover:text-slate-900"
          >
            Job seekers
          </a>
          <a
            href="#recruiters"
            className="transition-colors hover:text-slate-900"
          >
            Recruiters
          </a>
        </nav>
      </div>
    </header>
  );
}

