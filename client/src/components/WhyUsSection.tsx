import React from "react";
import { MessageSquareText, ShieldCheck, Compass, Clock } from "lucide-react";

export function WhyUsSection() {
  const features = [
    {
      icon: MessageSquareText,
      title: "Talk to the host",
      description:
        "Ask anything on WhatsApp before you book: room photos, directions, food.",
    },
    {
      icon: ShieldCheck,
      title: "Verified & vetted",
      description:
        "Every room is checked in person for cleanliness, hygiene and amenities.",
    },
    {
      icon: Compass,
      title: "Local guidance",
      description:
        "Hosts share their own tips on beaches, cafes, walks and day trips.",
    },
    {
      icon: Clock,
      title: "Flexible check-in",
      description:
        "Early arrival or late check-in? Coordinate directly with your host.",
    },
  ];

  const stats = [
    { number: "48+", label: "Handpicked rooms" },
    { number: "12", label: "Destinations across India" },
    { number: "2,300+", label: "Happy guests hosted" },
    { number: "4.8 / 5", label: "Average guest rating" },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#faf7f2] relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">
            WHY BOOK WITH US &mdash;
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2826] font-medium tracking-tight">
            Small details, taken care of.
          </h2>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-200 flex flex-col justify-start"
              >
                {/* Icon in subtle light teal rounded circle */}
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-5">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <h3 className="font-sans text-base font-semibold text-stone-900 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-500 mt-2.5 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Horizontal Stats Row Container */}
        <div className="mt-14 bg-white rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center flex flex-col items-center justify-center min-w-0"
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-accent tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-stone-500 mt-2 font-normal">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
