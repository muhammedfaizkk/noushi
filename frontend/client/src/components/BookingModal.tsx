"use client";

import React, { useState } from "react";
import { X, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { createBooking } from "@/lib/api";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: "Varkala, Kerala",
    dates: "",
    guests: "2 guests",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking({
        roomTitle: formData.destination,
        guestName: formData.name,
        guestPhone: formData.phone,
        checkIn:
          formData.dates.split("-")[0]?.trim() ||
          new Date().toISOString().slice(0, 10),
        checkOut: formData.dates.split("-")[1]?.trim() || "",
        guests: formData.guests,
        notes:
          formData.notes || `Storefront direct inquiry for ${formData.destination}`,
      });
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  const whatsappInquiry = encodeURIComponent(
    `Hello Driftwood Stays, I would like to book a stay.\nDestination: ${formData.destination}\nGuests: ${formData.guests}\nDates: ${formData.dates || "Flexible"}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Inquiry Sent!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto">
              Your host will connect with you on WhatsApp shortly to confirm availability.
            </p>
            <div className="pt-4">
              <a
                href={`https://wa.me/919876543210?text=${whatsappInquiry}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#144e47] text-white text-xs font-medium px-5 py-2.5 rounded-lg shadow-sm"
              >
                <MessageCircle size={15} /> Open WhatsApp Directly
              </a>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-xs uppercase tracking-widest text-[#144e47] font-semibold block mb-1">
              DIRECT BOOKING &mdash;
            </span>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Start your stay in India
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Connect directly with verified boutique hosts. No middleman fees.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Destination of Interest
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                >
                  <option value="Varkala, Kerala">Varkala, Kerala (Cliffside Sea-View)</option>
                  <option value="Manali, Himachal Pradesh">Manali, Himachal Pradesh (Cedar Loft)</option>
                  <option value="Jaipur, Rajasthan">Jaipur, Rajasthan (Haveli Suite)</option>
                  <option value="Coorg, Karnataka">Coorg, Karnataka (Plantation Cottage)</option>
                  <option value="Fontainhas, Goa">Fontainhas, Goa (Old Quarter Studio)</option>
                  <option value="Gokarna, Karnataka">Gokarna, Karnataka (Beach Hut)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="E.g. Rohan"
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    value={formData.dates}
                    onChange={(e) =>
                      setFormData({ ...formData, dates: e.target.value })
                    }
                    placeholder="E.g. Nov 24 - Nov 28"
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  >
                    <option value="1 guest">1 guest</option>
                    <option value="2 guests">2 guests</option>
                    <option value="3 guests">3 guests</option>
                    <option value="4+ guests">4+ guests</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#144e47] hover:bg-[#0e3b35] text-white py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Send size={14} /> Send Booking Request
                </button>
              </div>

              <div className="text-center">
                <a
                  href={`https://wa.me/919876543210?text=${whatsappInquiry}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#144e47] font-medium hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <MessageCircle size={14} /> Or chat with us directly on WhatsApp
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
