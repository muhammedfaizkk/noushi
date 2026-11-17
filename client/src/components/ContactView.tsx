"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button } from "./ui/Button";

const WHATSAPP = "919876543210";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

const fieldClass =
  "mt-1.5 w-full min-w-0 rounded-xl border border-[#D6CCBD] bg-white px-3.5 py-2.5 text-base text-ink outline-none focus:border-accent";

export function ContactView() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const text = [
      `Hi Driftwood Stays, I'm ${name.trim()}.`,
      phone ? `My WhatsApp: +91 ${phone}` : "",
      email.trim() ? `Email: ${email.trim()}` : "",
      message.trim(),
    ]
      .filter(Boolean)
      .join(" ");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      <Navbar variant="light" />

      <main className="flex-1 max-w-[1240px] mx-auto w-full px-5 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] gap-10 lg:gap-16 items-start">
          <div className="min-w-0">
            <p className="m-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E3EFEE] text-accent text-[13px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#1E7A4C]" />
              Hosts reply on WhatsApp
            </p>

            <h1
              className="mt-5 m-0 font-medium text-[42px] sm:text-[56px] leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Write to us
              <em className="block italic text-accent">on WhatsApp.</em>
            </h1>

            <p className="mt-4 max-w-[460px] text-[15px] sm:text-lg text-[#4E585C] leading-relaxed">
              Ask about a room, dates, or the road ahead. You deal with us direct, with no platform in between.
            </p>

            <ul className="mt-8 grid gap-3 max-w-[460px]">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#D6CCBD] bg-[#FFFDF9] px-4 py-3.5 hover:border-accent"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#E3EFEE] text-accent inline-flex items-center justify-center shrink-0">
                    <WhatsAppIcon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-[#5B6468]">WhatsApp</span>
                    <span className="block text-sm font-semibold">+91 98765 43210</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@driftwood.com"
                  className="flex items-center gap-3 rounded-2xl border border-[#D6CCBD] bg-[#FFFDF9] px-4 py-3.5 hover:border-accent"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#E3EFEE] text-accent inline-flex items-center justify-center shrink-0">
                    <Mail size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-[#5B6468]">Email</span>
                    <span className="block text-sm font-semibold">hello@driftwood.com</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#D6CCBD] bg-[#FFFDF9] px-4 py-3.5 hover:border-accent"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#E3EFEE] text-accent inline-flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-[#5B6468]">Instagram</span>
                    <span className="block text-sm font-semibold">@driftwood</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <form
            onSubmit={send}
            className="rounded-2xl border border-[#D6CCBD] bg-[#FFFDF9] shadow-[0_12px_30px_rgba(31,42,46,0.08)] p-5 sm:p-7"
          >
            <h2 className="text-lg font-semibold">Send a note</h2>
            <p className="mt-1 text-sm text-[#5B6468]">It opens WhatsApp with your message ready to send.</p>

            <label className="block mt-5">
              <span className="text-[11px] text-[#5B6468]">Name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className={fieldClass}
              />
            </label>

            <label className="block mt-3">
              <span className="text-[11px] text-[#5B6468]">WhatsApp number</span>
              <div className="mt-1.5 flex rounded-xl border border-[#D6CCBD] bg-white overflow-hidden focus-within:border-accent">
                <span className="px-3 py-2.5 text-base text-[#5B6468] bg-[#F6F1EA] border-r border-[#D6CCBD]">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/[^\d]/g, "").slice(0, 10))}
                  placeholder="10-digit mobile"
                  className="flex-1 min-w-0 px-3 py-2.5 text-base text-ink outline-none"
                />
              </div>
            </label>

            <label className="block mt-3">
              <span className="text-[11px] text-[#5B6468]">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                className={fieldClass}
              />
            </label>

            <label className="block mt-3">
              <span className="text-[11px] text-[#5B6468]">Message</span>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Room, dates, or a question"
                className={`${fieldClass} resize-none`}
              />
            </label>

            <Button type="submit" block className="mt-5">
              <WhatsAppIcon />
              Send on WhatsApp
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
