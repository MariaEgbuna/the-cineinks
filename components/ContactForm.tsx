"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded border border-main/20 bg-card px-3 py-2.5 text-sm text-main outline-none focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    // Read the form values before the await, then send them as JSON
    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="max-w-125 border-l-4 border-accent bg-card p-5"
      >
        <p className="font-serif text-xl text-main mb-1">Message sent</p>
        <p className="text-sm text-main/70 mb-4">
          Thanks for reaching out. I&apos;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm text-accent underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-125">
      <input
        type="hidden"
        name="access_key"
        value="e61a8c9f-262d-48d5-9c1d-706c1d637168"
      />
      <input
        type="hidden"
        name="subject"
        value="New message from The CineInks Contact Page"
      />
      {/* Spam trap: real visitors never see or tick this */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mb-5">
        <label htmlFor="name" className="block text-sm mb-1.5">
          Name
        </label>
        <input id="name" name="name" type="text" required className={fieldClass} />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block text-sm mb-1.5">
          Email
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Changed: text-cream instead of text-teal-light */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-teal text-cream px-8 py-3 text-sm font-medium disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-main/70">
          Something went wrong and your message wasn&apos;t sent. Please try
          again, or reach me through Instagram or Twitter above.
        </p>
      )}
    </form>
  );
}