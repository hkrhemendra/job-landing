import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// You can keep these values in NEXT_PUBLIC_* env vars if you prefer.
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

let analyticsInstance: Analytics | null = null;

// Safe, client-only initializer for Analytics
export async function initAnalytics() {
  if (typeof window === "undefined") {
    return null;
  }
  if (analyticsInstance) {
    return analyticsInstance;
  }
  const supported = await isSupported().catch(() => false);
  if (!supported) {
    return null;
  }
  analyticsInstance = getAnalytics(app);
  return analyticsInstance;
}

