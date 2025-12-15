import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// You can keep these values in NEXT_PUBLIC_* env vars if you prefer.
const firebaseConfig = {
  apiKey: "AIzaSyDXRk5tTWrRJN3yfRv581hE4xuracQBR90",
  authDomain: "job-portal-1c0ee.firebaseapp.com",
  projectId: "job-portal-1c0ee",
  storageBucket: "job-portal-1c0ee.firebasestorage.app",
  messagingSenderId: "1079197909828",
  appId: "1:1079197909828:web:5bf93f18298ca03292cd11",
  measurementId: "G-57VWFWKJ0P",
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

