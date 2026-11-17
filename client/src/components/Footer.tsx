"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { label: "All rooms", href: "/#rooms" },
  { label: "About us", href: "/#about" },
  { label: "Why book with us", href: "/#why-us" },
];

const ROOMS = [
  { label: "Kerala", href: "/#rooms" },
  { label: "Karnataka", href: "/#rooms" },
  { label: "Himachal", href: "/#rooms" },
  { label: "Rajasthan", href: "/#rooms" },
];

const MORE = [
  { label: "Contact", href: "/contact" },
  { label: "Terms & conditions", href: "/#rooms" },
];

const CONTACT = [
  { label: "WhatsApp", href: "https://wa.me/919876543210", external: true },
  { label: "Email", href: "mailto:hello@driftwood.com" },
  { label: "Instagram", href: "https://instagram.com", external: true },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">{title}</h4>
      <ul className="mt-3 space-y-2 text-[13px] text-stone-400">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-white"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="text-[13px] font-semibold tracking-[0.12em] text-stone-100">{title}</span>
        <ChevronDown
          size={18}
          className={`text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul className={`${open ? "block" : "hidden"} space-y-3 pb-4 text-sm text-stone-400`}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-white"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-[#111a18] text-stone-300">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-10 sm:px-6 lg:hidden">
        <Logo variant="light" />
        <p className="mt-3 text-sm text-stone-400">Your address line 1, City, State, PIN</p>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#22c55e] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#1eae54]"
        >
          <MessageCircle size={18} />
          Chat with us on WhatsApp
        </a>

        <div className="mt-6 border-t border-white/10">
          <MobileGroup title="QUICK LINKS" links={QUICK_LINKS} />
          <MobileGroup title="ROOMS" links={ROOMS} />
          <MobileGroup title="MORE" links={MORE} />
        </div>

        <p className="mt-5 text-sm text-stone-400">
          <a href="mailto:hello@driftwood.com" className="hover:text-white">
            hello@driftwood.com
          </a>
          <span className="px-1.5 text-stone-500">·</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            @driftwood
          </a>
        </p>
        <p className="mt-4 text-xs text-stone-500">© 2026 Driftwood Stays. Photos: Unsplash.</p>
      </div>

      <div className="mx-auto hidden max-w-7xl px-8 py-8 lg:block">
        <div className="flex items-start justify-between gap-10">
          <div className="max-w-[200px] shrink-0">
            <Logo variant="light" />
            <p className="mt-2 text-xs leading-relaxed text-stone-500">Handpicked stays across India</p>
          </div>
          <FooterColumn title="Quick links" links={QUICK_LINKS} />
          <FooterColumn title="Rooms" links={ROOMS} />
          <FooterColumn title="More" links={MORE} />
          <FooterColumn title="Contact" links={CONTACT} />
        </div>
        <p className="mt-8 border-t border-white/10 pt-4 text-xs text-stone-500">
          © 2026 Driftwood Stays. Photos: Unsplash.
        </p>
      </div>
    </footer>
  );
}
