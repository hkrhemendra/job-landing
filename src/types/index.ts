// Core types for the job portal application

export type ToastState = {
  message: string;
  open: boolean;
};

export type JobType = "inbound" | "outbound" | "chat" | "email";
export type ShiftPreference = "day" | "night" | "rotational";
export type MonthlyVolume = "1-10" | "11-30" | "31-75" | "76+";
export type WillingToPay = "yes" | "maybe" | "no";

export type HiringRole =
  | "Inbound voice"
  | "Outbound voice"
  | "Blended"
  | "Chat"
  | "Email"
  | "Technical support";

export interface JobSeekerFormData {
  name: string;
  phone: string;
  city: string;
  jobType: string;
  shift: string;
}

export interface RecruiterFormData {
  companyName: string;
  recruiterName: string;
  phone: string;
  hiringRoles: string[];
  monthlyVolume: string;
  willingToPay: string;
}

export interface JobSeekerFormProps {
  onSuccess: () => void;
}

export interface RecruiterFormProps {
  onSuccess: () => void;
}

export interface HeroProps {
  onJobSeekerClick: () => void;
  onRecruiterClick: () => void;
}

