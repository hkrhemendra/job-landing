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
import { cn } from "@/lib/utils";

// Validation functions
const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
  return null;
};

const validateCompanyName = (companyName: string): string | null => {
  const trimmed = companyName.trim();
  if (!trimmed) return "Company name is required";
  if (trimmed.length < 2) return "Company name must be at least 2 characters";
  // Allow letters, numbers, spaces, and common business characters
  if (!/^[a-zA-Z0-9\s\-.,&'()]+$/.test(trimmed)) return "Please enter a valid company name";
  return null;
};

const validatePhone = (phone: string): string | null => {
  const trimmed = phone.trim();
  if (!trimmed) return "Phone number is required";
  // Remove spaces, dashes, and parentheses for validation
  const cleaned = trimmed.replace(/[\s\-\(\)]/g, "");
  // Indian phone format: +91 followed by 10 digits, or just 10 digits
  if (/^\+91\d{10}$/.test(cleaned)) return null;
  if (/^\d{10}$/.test(cleaned)) return null;
  return "Please enter a valid 10-digit phone number (e.g., +91 9876543210 or 9876543210)";
};

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
  
  // Field-level validation errors
  const [fieldErrors, setFieldErrors] = useState<{
    companyName?: string;
    recruiterName?: string;
    phone?: string;
    hiringRoles?: string;
    monthlyVolume?: string;
    willingToPay?: string;
  }>({});

  const toggleRole = (role: string) => {
    setHiringRoles((prev) => {
      const updated = prev.includes(role) 
        ? prev.filter((r) => r !== role) 
        : [...prev, role];
      // Clear error when user selects a role
      if (updated.length > 0 && fieldErrors.hiringRoles) {
        setFieldErrors((prev) => ({ ...prev, hiringRoles: undefined }));
      }
      return updated;
    });
  };

  // Validate individual fields on blur
  const handleBlur = (field: string, value: string) => {
    let error: string | null = null;
    
    switch (field) {
      case "companyName":
        error = validateCompanyName(value);
        break;
      case "recruiterName":
        error = validateName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "monthlyVolume":
        error = !value ? "Please select monthly hiring volume" : null;
        break;
      case "willingToPay":
        error = !value ? "Please select an option" : null;
        break;
    }
    
    setFieldErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Trim all inputs
    const trimmedCompanyName = companyName.trim();
    const trimmedRecruiterName = recruiterName.trim();
    const trimmedPhone = phone.trim();

    // Validate all fields
    const companyNameError = validateCompanyName(trimmedCompanyName);
    const recruiterNameError = validateName(trimmedRecruiterName);
    const phoneError = validatePhone(trimmedPhone);
    const hiringRolesError = hiringRoles.length === 0 ? "Please select at least one hiring role" : null;
    const monthlyVolumeError = !monthlyVolume ? "Please select monthly hiring volume" : null;
    const willingToPayError = !willingToPay ? "Please select an option" : null;

    const errors = {
      companyName: companyNameError || undefined,
      recruiterName: recruiterNameError || undefined,
      phone: phoneError || undefined,
      hiringRoles: hiringRolesError || undefined,
      monthlyVolume: monthlyVolumeError || undefined,
      willingToPay: willingToPayError || undefined,
    };

    setFieldErrors(errors);

    // Check if there are any errors
    if (companyNameError || recruiterNameError || phoneError || hiringRolesError || monthlyVolumeError || willingToPayError) {
      setError("Please fix the errors below before submitting.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const payload = {
      type: "recruiter",
      companyName: trimmedCompanyName,
      recruiterName: trimmedRecruiterName,
      phone: trimmedPhone,
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
            onChange={(e) => {
              setCompanyName(e.target.value);
              // Clear error when user starts typing
              if (fieldErrors.companyName) {
                setFieldErrors((prev) => ({ ...prev, companyName: undefined }));
              }
            }}
            onBlur={(e) => handleBlur("companyName", e.target.value)}
            placeholder="ABC BPO Pvt. Ltd."
            className={cn(fieldErrors.companyName && "border-red-500 focus-visible:ring-red-500")}
          />
          {fieldErrors.companyName && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.companyName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="rec-name">Recruiter Name</Label>
          <Input
            id="rec-name"
            name="recruiterName"
            required
            value={recruiterName}
            onChange={(e) => {
              setRecruiterName(e.target.value);
              // Clear error when user starts typing
              if (fieldErrors.recruiterName) {
                setFieldErrors((prev) => ({ ...prev, recruiterName: undefined }));
              }
            }}
            onBlur={(e) => handleBlur("recruiterName", e.target.value)}
            placeholder="Hiring Manager / Recruiter"
            className={cn(fieldErrors.recruiterName && "border-red-500 focus-visible:ring-red-500")}
          />
          {fieldErrors.recruiterName && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.recruiterName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="rec-phone">Phone Number</Label>
          <Input
            id="rec-phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              // Clear error when user starts typing
              if (fieldErrors.phone) {
                setFieldErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            onBlur={(e) => handleBlur("phone", e.target.value)}
            placeholder="+91 9876543210 or 9876543210"
            className={cn(fieldErrors.phone && "border-red-500 focus-visible:ring-red-500")}
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
          )}
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
                  className={cn(
                    "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs transition-colors",
                    selected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    fieldErrors.hiringRoles && !selected && "border-red-300"
                  )}
                  aria-pressed={selected}
                >
                  {role}
                </button>
              );
            })}
          </div>
          {fieldErrors.hiringRoles && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.hiringRoles}</p>
          )}
        </div>
        <div>
          <Label htmlFor="rec-volume">Monthly Hiring Volume</Label>
          <Select
            id="rec-volume"
            name="monthlyHiringVolume"
            required
            value={monthlyVolume}
            onChange={(e) => {
              setMonthlyVolume(e.target.value);
              // Clear error when user selects
              if (fieldErrors.monthlyVolume) {
                setFieldErrors((prev) => ({ ...prev, monthlyVolume: undefined }));
              }
            }}
            onBlur={(e) => handleBlur("monthlyVolume", e.target.value)}
            className={cn(fieldErrors.monthlyVolume && "border-red-500 focus-visible:ring-red-500")}
          >
            <option value="" disabled>
              Select volume
            </option>
            <option value="1-10">1 - 10 hires / month</option>
            <option value="11-30">11 - 30 hires / month</option>
            <option value="31-75">31 - 75 hires / month</option>
            <option value="76+">76+ hires / month</option>
          </Select>
          {fieldErrors.monthlyVolume && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.monthlyVolume}</p>
          )}
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
                  onClick={() => {
                    setWillingToPay(value);
                    // Clear error when user selects
                    if (fieldErrors.willingToPay) {
                      setFieldErrors((prev) => ({ ...prev, willingToPay: undefined }));
                    }
                  }}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center rounded-full border px-3 py-1 text-xs transition-colors",
                    selected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    fieldErrors.willingToPay && !selected && "border-red-300"
                  )}
                  aria-pressed={selected}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {fieldErrors.willingToPay && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.willingToPay}</p>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-600 font-medium">{error}</p>
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

