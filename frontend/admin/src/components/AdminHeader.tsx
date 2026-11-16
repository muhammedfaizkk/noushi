import React from "react";
import { RefreshCw } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  loading?: boolean;
  actionButton?: React.ReactNode;
}

export function AdminHeader({
  title,
  subtitle,
  onRefresh,
  loading = false,
  actionButton,
}: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-stone-200/90 px-6 py-4 flex items-center justify-between shrink-0">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
          {title}
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 text-stone-500 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition cursor-pointer"
            title="Reload data"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        )}
        {actionButton}
      </div>
    </header>
  );
}
