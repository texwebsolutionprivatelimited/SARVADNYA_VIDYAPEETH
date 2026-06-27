import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Shield, Mail, Lock, AlertCircle, Loader, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Login failed:", err);
      // Auto-create user if they are using the requested default credentials
      if (
        (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") &&
        email === "admin@gmail.com" &&
        password === "admin@147"
      ) {
        try {
          // Attempt to register the admin account if it does not exist in the new Firebase project
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (createErr) {
          console.error("Auto-registration failed:", createErr);
          setError("Invalid admin credentials or connection error.");
        }
      } else {
        if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
          setError("Invalid email or password.");
        } else if (err.code === "auth/too-many-requests") {
          setError("Too many login attempts. Please try again later.");
        } else {
          setError("Failed to sign in. Please check your credentials or firebase config.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-900/5"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 shadow-md shadow-purple-500/20">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tight font-heading">
            Admin Control Panel
          </h2>
          <p className="mt-1.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Sarvadnya Vidyapeeth
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-[12px] font-semibold text-red-700"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] font-extrabold text-slate-600 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-slate-600 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white text-[13px] font-bold shadow-lg shadow-purple-500/25 transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
