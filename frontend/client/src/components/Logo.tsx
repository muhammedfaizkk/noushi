import React from "react";

export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isLight = variant === "light";
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Handcrafted organic curved icon matching the screenshot */}
      <div
        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-transform hover:scale-105 ${
          isLight
            ? "border-white/80 text-white"
            : "border-[#144e47] text-[#144e47]"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          {/* Stylized organic rings / wave ripple icon */}
          <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
          <path d="M7 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5" />
          <path d="M10 12c0-1.1.9-2 2-2s2 .9 2 2" />
        </svg>
      </div>

      <span
        className={`font-sans tracking-tight text-base font-medium ${
          isLight ? "text-white" : "text-[#1c2826]"
        }`}
      >
        Driftwood Stays
      </span>
    </div>
  );
}
