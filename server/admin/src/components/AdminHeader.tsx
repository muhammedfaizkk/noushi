interface AdminHeaderProps {
  title: string;
  subtitle: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-stone-200/90 px-6 py-4 shrink-0">
      <h2 className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
        {title}
      </h2>
      <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
    </header>
  );
}
