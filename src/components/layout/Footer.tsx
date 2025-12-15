"use client";

import * as React from "react";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-md">
          Our mission is to make support careers more transparent, predictable
          and respected — for both candidates and recruiters.
        </p>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <span className="font-medium text-slate-700">
            Contact: hemendralalawat30@gmail.com
          </span>
          <span className="text-[11px] text-slate-500">
            Early access platform – validation phase. No live jobs yet.
          </span>
        </div>
      </div>
    </footer>
  );
}

