export function AdminSidebar() {
  return (
    <aside className="w-full md:w-64 bg-[#111a18] text-stone-300 flex flex-col p-5 border-r border-stone-800 shrink-0">
      <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
        <div className="w-8 h-8 rounded-full border border-stone-400 text-stone-200 flex items-center justify-center font-serif text-sm">
          DS
        </div>
        <div>
          <h1 className="font-sans font-medium text-white text-sm tracking-tight">
            Driftwood Stays
          </h1>
          <span className="text-[10px] text-stone-400 tracking-wider uppercase font-semibold block">
            Admin
          </span>
        </div>
      </div>
    </aside>
  );
}
