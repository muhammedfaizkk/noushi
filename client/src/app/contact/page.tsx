import type { Metadata } from "next";
import { ContactView } from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact — Driftwood Stays",
  description: "Write to Driftwood Stays on WhatsApp. Hosts reply directly, with no booking platform in between.",
};

export default function ContactPage() {
  return <ContactView />;
}
