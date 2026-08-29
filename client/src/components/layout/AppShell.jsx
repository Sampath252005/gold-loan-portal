import { Landmark, LayoutDashboard, Menu, PlusCircle, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [{ label: "Apply for Loan", to: "/", icon: PlusCircle }, { label: "Leads Dashboard", to: "/dashboard", icon: LayoutDashboard }];

const AppShell = ({ children }) => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (to) => pathname === to;
  return <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff7df_0,_transparent_26rem),linear-gradient(180deg,_#fffcf5_0,_#f8fafc_23rem)]">
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex h-16 items-center justify-between gap-4">
      <Link to="/" onClick={() => setMobileOpen(false)} className="group flex min-w-0 items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-200 transition group-hover:scale-105"><Landmark size={21} strokeWidth={2.4} /></span><span className="min-w-0"><span className="block truncate text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">Gold Loan Portal</span><span className="hidden items-center gap-1 text-xs text-slate-500 sm:flex"><ShieldCheck size={12} className="text-emerald-600" /> Secure loan applications</span></span></Link>
      <nav className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 p-1 md:flex" aria-label="Main navigation">{navigation.map(({ label, to, icon: Icon }) => <Link key={to} to={to} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive(to) ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-900"}`}><Icon size={16} />{label}</Link>)}</nav>
      <button onClick={() => setMobileOpen((open) => !open)} className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden" aria-label="Toggle navigation" aria-expanded={mobileOpen}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </div>{mobileOpen && <nav className="grid gap-1 border-t border-slate-100 py-3 md:hidden" aria-label="Mobile navigation">{navigation.map(({ label, to, icon: Icon }) => <Link key={to} to={to} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${isActive(to) ? "bg-amber-50 text-amber-800" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={18} />{label}</Link>)}</nav>}</div></header><main>{children}</main>
  </div>;
};
export default AppShell;
