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

export function JobSeekerForm({ onSuccess }: JobSeekerFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [jobType, setJobType] = useState("");
  const [shift, setShift] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !phone || !city || !jobType || !shift) {
      setError("Please fill all required fields.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const payload = {
      type: "job-seeker",
      name,
      phone,
      city,
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
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
          />
        </div>
        <div>
          <Label htmlFor="js-phone">Phone Number</Label>
          <Input
            id="js-phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 ..."
          />
        </div>
        <div>
          <Label htmlFor="js-city">City</Label>
          <Input
            id="js-city"
            name="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Bengaluru, Pune, Gurgaon..."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="js-job-type">Job Type</Label>
            <Select
              id="js-job-type"
              name="jobType"
              required
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="" disabled>
                Select job type
              </option>
              <option value="inbound">Inbound Voice</option>
              <option value="outbound">Outbound Voice</option>
              <option value="chat">Chat Support</option>
              <option value="email">Email Support</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="js-shift">Shift Preference</Label>
            <Select
              id="js-shift"
              name="shiftPreference"
              required
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="" disabled>
                Select shift
              </option>
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="rotational">Rotational</option>
            </Select>
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

