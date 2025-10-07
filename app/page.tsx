"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending"); setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <h1>Lead Router — Demo</h1>
      <p>Fill this form to send a lead email via Resend.</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Your email" required />
        <textarea name="message" placeholder="Message" required rows={5} />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </form>

      {status === "sent" && <p style={{ color: "green" }}>✅ Sent!</p>}
      {status === "error" && <p style={{ color: "crimson" }}>❌ {error}</p>}
    </main>
  );
}
