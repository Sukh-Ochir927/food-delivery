"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type LoginRequiredModalProps = {
  onClose: () => void;
  onLoginSuccess: () => void;
};

export function LoginRequiredModal({ onClose, onLoginSuccess }: LoginRequiredModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message ?? "Login failed. Please try again.");
        return;
      }

      onLoginSuccess();
    } catch {
      setError("Login is unavailable right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-[#171717] shadow-2xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-neutral-100 text-lg font-bold"
        >
          x
        </button>
        <h2 className="mt-2 text-center text-2xl font-black">You need to log in first</h2>
        <form onSubmit={login} className="mt-7 space-y-4">
          <label className="block text-left text-sm font-bold">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-[#ef4444]"
            />
          </label>
          <label className="block text-left text-sm font-bold">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-[#ef4444]"
            />
          </label>
          {error ? <p className="text-sm font-bold text-[#ef4444]">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-[#ef4444] text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
