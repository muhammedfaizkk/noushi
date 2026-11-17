import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-stone-800 flex flex-col md:flex-row font-sans">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader title="Admin" subtitle="Driftwood Stays" />
      </main>
    </div>
  );
}
