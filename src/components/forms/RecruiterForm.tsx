"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { RecruiterFormProps, HiringRole } from "@/types";
import { Loader2 } from "lucide-react";

export function RecruiterForm({ onSuccess }: RecruiterFormProps) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [phone, setPhone] = useState("");
  const [hiringRoles, setHiringRoles] = useState<string[]>([]);
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [willingToPay, setWillingToPay] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRole = (role: string) => {
    setHiringRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !companyName ||
      !recruiterName ||
      !phone ||
      hiringRoles.length === 0 ||
      !monthlyVolume ||
      !willingToPay
    ) {
      setError("Please fill all required fields and select at least one role.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const payload = {
      type: "recruiter",
      companyName,
      recruiterName,
      phone,
      hiringRoles,
      monthlyVolume,
      willingToPay,
      createdAt: serverTimestamp(),
    };
    console.log("Recruiter interest:", payload);

    try {
      await addDoc(collection(db, "submissions"), payload);
      // Redirect to success page
      router.push("/success?type=recruiter");
    } catch (err) {
      console.error("Error saving recruiter data to Firestore:", err);
      setError("We could not record this right now. Please try again.");
      setSubmitting(false);
    }
  };

  const roleOptions: HiringRole[] = [
    "Inbound voice",
    "Outbound voice",
    "Blended",
    "Chat",
    "Email",
    "Technical support",
  ];

  return (
    <motion.section
      id="recruiters"
      aria-labelledby="recruiter-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="rounded-xl border border-slate-200 bg-white/90 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <h2
        id="recruiter-heading"
        className="text-base font-semibold tracking-tight text-slate-900"
      >
        Hiring Support Staff?
      </h2>
      <p className="mt-1 text-xs text-slate-600">
        Share your hiring pattern to help us design the platform for recruiters like you.
      </p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <Label htmlFor="rec-company">Company Name</Label>
          <Input
            id="rec-company"
            name="companyName"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="ABC BPO Pvt. Ltd."
          />
        </div>
        <div>
          <Label htmlFor="rec-name">Recruiter Name</Label>
          <Input
            id="rec-name"
            name="recruiterName"
            required
            value={recruiterName}
            onChange={(e) => setRecruiterName(e.target.value)}
            placeholder="Hiring Manager / Recruiter"
          />
        </div>
        <div>
          <Label htmlFor="rec-phone">Phone Number</Label>
          <Input
            id="rec-phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 ..."
          />
        </div>
        <div>
          <Label>Hiring Roles (select all that apply)</Label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {roleOptions.map((role) => {
              const selected = hiringRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs transition-colors ${
                    selected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={selected}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <Label htmlFor="rec-volume">Monthly Hiring Volume</Label>
          <Select
            id="rec-volume"
            name="monthlyHiringVolume"
            required
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(e.target.value)}
          >
            <option value="" disabled>
              Select volume
            </option>
            <option value="1-10">1 - 10 hires / month</option>
            <option value="11-30">11 - 30 hires / month</option>
            <option value="31-75">31 - 75 hires / month</option>
            <option value="76+">76+ hires / month</option>
          </Select>
        </div>
        <div>
          <Label>Would you pay for quality candidates?</Label>
          <div className="mt-1 flex gap-2">
            {["Yes", "Maybe", "No"].map((option) => {
              const value = option.toLowerCase();
              const selected = willingToPay === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setWillingToPay(value)}
                  className={`inline-flex flex-1 items-center justify-center rounded-full border px-3 py-1 text-xs transition-colors ${
                    selected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={selected}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Join as Early Recruiter"
          )}
        </Button>
        <p className="mt-1 text-[11px] text-slate-500">
          {/* This helps us understand if a focused support hiring platform is worth investing in, and how to price it. */}
        </p>
      </form>
    </motion.section>
  );
}

