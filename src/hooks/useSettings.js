import { useState, useEffect } from "react";
import { db, doc, onSnapshot } from "../firebase";

const DEFAULT_SETTINGS = {
  general: {
    collegeName: "Sarvadnya Vidyapeeth",
    tagline: "Affiliated to Aryabhatta Knowledge University, Patna",
    phone: "+91 99553 30733",
    email: "info@sarvadnyavidyapeeth.in",
    address: "Plot No - 2258, Beur-Betauda Road, Anishabad, Patna (Bihar) - 800002",
    website: "www.sarvadnyavidyapeeth.in",
  },
  social: {
    facebook: "https://facebook.com/sarvadnyavidyapeeth",
    instagram: "https://instagram.com/sarvadnyavidyapeeth",
    twitter: "https://twitter.com/sv_patna",
    linkedin: "https://www.linkedin.com/in/sarvadnya-vidyapeeth-patna",
    youtube: "https://youtube.com/@sarvadnyavidyapeeth",
  },
};

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "settings", "siteConfig"),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings({
            general: { ...DEFAULT_SETTINGS.general, ...(data.general || {}) },
            social: { ...DEFAULT_SETTINGS.social, ...(data.social || {}) },
          });
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore settings snapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return { settings, loading };
}
