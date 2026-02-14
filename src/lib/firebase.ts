import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) return getApps()[0] as FirebaseApp;
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error("Firebase client config missing. Add NEXT_PUBLIC_FIREBASE_* to .env.local");
  }
  return initializeApp(firebaseConfig);
}

export function getFirebaseAuth(): Auth {
  getFirebaseApp();
  return getAuth();
}
