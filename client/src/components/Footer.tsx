import React from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#111a18] text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Address */}
          <div>
            <Logo variant="light" />
            <p className="text-xs text-stone-400 mt-4 leading-relaxed">
              Your address line 1,
              <br />
              City, State, PIN
            </p>
            <Button href="/#rooms" size="sm" className="mt-5">
              Book now
            </Button>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a
                  href="#rooms"
                  className="hover:text-white transition-colors"
                >
                  All rooms
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  className="hover:text-white transition-colors"
                >
                  Why book with us
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className="hover:text-white transition-colors"
                >
                  Terms & conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Destinations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              DESTINATIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a
                  href="#rooms"
                  className="hover:text-white transition-colors"
                >
                  Kerala
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className="hover:text-white transition-colors"
                >
                  Karnataka
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className="hover:text-white transition-colors"
                >
                  Himachal Pradesh
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className="hover:text-white transition-colors"
                >
                  Rajasthan
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              CONTACT US
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: (+91) 9876543210
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@driftwood.com"
                  className="hover:text-white transition-colors"
                >
                  hello@driftwood.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram: @driftwood
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© 2026 Driftwood Stays. Photos: Unsplash.</p>
          <p className="text-stone-600">
            Handcrafted with slow travel in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
