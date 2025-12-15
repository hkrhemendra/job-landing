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
import { JobSeekerFormProps } from "@/types";
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

const validateCity = (city: string): string | null => {
  const trimmed = city.trim();
  if (!trimmed) return "City is required";
  if (trimmed.length < 2) return "City must be at least 2 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return "City can only contain letters, spaces, hyphens, and apostrophes";
  return null;
};

export function JobSeekerForm({ onSuccess }: JobSeekerFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [jobType, setJobType] = useState("");
  const [shift, setShift] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Field-level validation errors
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    city?: string;
    jobType?: string;
    shift?: string;
  }>({});

  // Validate individual fields on blur
  const handleBlur = (field: string, value: string) => {
    let error: string | null = null;
    
    switch (field) {
      case "name":
        error = validateName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "city":
        error = validateCity(value);
        break;
      case "jobType":
        error = !value ? "Please select a job type" : null;
        break;
      case "shift":
        error = !value ? "Please select a shift preference" : null;
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
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedCity = city.trim();

    // Validate all fields
    const nameError = validateName(trimmedName);
    const phoneError = validatePhone(trimmedPhone);
    const cityError = validateCity(trimmedCity);
    const jobTypeError = !jobType ? "Please select a job type" : null;
    const shiftError = !shift ? "Please select a shift preference" : null;

    const errors = {
      name: nameError || undefined,
      phone: phoneError || undefined,
      city: cityError || undefined,
      jobType: jobTypeError || undefined,
      shift: shiftError || undefined,
    };

    setFieldErrors(errors);

    // Check if there are any errors
    if (nameError || phoneError || cityError || jobTypeError || shiftError) {
      setError("Please fix the errors below before submitting.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const payload = {
      type: "job-seeker",
      name: trimmedName,
      phone: trimmedPhone,
      city: trimmedCity,
      jobType,
      shift,
      createdAt: serverTimestamp(),
    };
    console.log("Job seeker interest:", payload);

    try {
      await addDoc(collection(db, "submissions"), payload);
      // Redirect to success page
      router.push("/success?type=job-seeker");
    } catch (err) {
      console.error("Error saving job seeker data to Firestore:", err);
      setError("We could not record this right now. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="job-seekers"
      aria-labelledby="job-seeker-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-slate-200 bg-white/90 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <h2
        id="job-seeker-heading"
        className="text-base font-semibold tracking-tight text-slate-900"
      >
        Looking for a Support Job?
      </h2>
      <p className="mt-1 text-xs text-slate-600">
        Share a few details and we&apos;ll notify you when relevant roles go live.
      </p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <Label htmlFor="js-name">Full Name</Label>
          <Input
            id="js-name"
            name="fullName"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              // Clear error when user starts typing
              if (fieldErrors.name) {
                setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            onBlur={(e) => handleBlur("name", e.target.value)}
            placeholder="Priya Sharma"
            className={cn(fieldErrors.name && "border-red-500 focus-visible:ring-red-500")}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="js-phone">Phone Number</Label>
          <Input
            id="js-phone"
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
          <Label htmlFor="js-city">City</Label>
          <Input
            id="js-city"
            name="city"
            required
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              // Clear error when user starts typing
              if (fieldErrors.city) {
                setFieldErrors((prev) => ({ ...prev, city: undefined }));
              }
            }}
            onBlur={(e) => handleBlur("city", e.target.value)}
            placeholder="Bengaluru, Pune, Gurgaon..."
            className={cn(fieldErrors.city && "border-red-500 focus-visible:ring-red-500")}
          />
          {fieldErrors.city && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.city}</p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="js-job-type">Job Type</Label>
            <Select
              id="js-job-type"
              name="jobType"
              required
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
                // Clear error when user selects
                if (fieldErrors.jobType) {
                  setFieldErrors((prev) => ({ ...prev, jobType: undefined }));
                }
              }}
              onBlur={(e) => handleBlur("jobType", e.target.value)}
              className={cn(fieldErrors.jobType && "border-red-500 focus-visible:ring-red-500")}
            >
              <option value="" disabled>
                Select job type
              </option>
              <option value="inbound">Inbound Voice</option>
              <option value="outbound">Outbound Voice</option>
              <option value="chat">Chat Support</option>
              <option value="email">Email Support</option>
            </Select>
            {fieldErrors.jobType && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.jobType}</p>
            )}
          </div>
          <div>
            <Label htmlFor="js-shift">Shift Preference</Label>
            <Select
              id="js-shift"
              name="shiftPreference"
              required
              value={shift}
              onChange={(e) => {
                setShift(e.target.value);
                // Clear error when user selects
                if (fieldErrors.shift) {
                  setFieldErrors((prev) => ({ ...prev, shift: undefined }));
                }
              }}
              onBlur={(e) => handleBlur("shift", e.target.value)}
              className={cn(fieldErrors.shift && "border-red-500 focus-visible:ring-red-500")}
            >
              <option value="" disabled>
                Select shift
              </option>
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="rotational">Rotational</option>
            </Select>
            {fieldErrors.shift && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.shift}</p>
            )}
          </div>
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
            "Get Early Access"
          )}
        </Button>
        <p className="mt-1 text-[11px] text-slate-500">
          We&apos;ll only use this to understand demand and share updates when we launch.
        </p>
      </form>
    </motion.section>
  );
}

