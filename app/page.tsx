"use client";
import { useState } from "react";

export default function Home() {
  const [to, setTo] = useState("kumar@feelivacation.com"); // default test email
  const [subject, setSubject] = useState("Hello from Next.js + Resend");
  const [text, setText] = useState("This is a test email sent via Resend API.");
  const [status, setStatus] = useState("");

  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    setStatus("⏳ Sending...");

    try {
      const res = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, text }),
      });

      const data = await res.json();
      if (data.ok) {
        setStatus("✅ Email sent successfully!");
      } else {
        setStatus("❌ Failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      setStatus("⚠️ Error: " + err.message);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">📧 Send Test Email</h1>

      <form
        onSubmit={sendEmail}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send Email
        </button>
      </form>

      <p className="mt-4 text-lg">{status}</p>
    </main>
  );
}
