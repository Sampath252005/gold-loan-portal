import { ArrowUpRight, Banknote, CircleDollarSign, Scale } from "lucide-react";

const formatCurrency = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

const LoanCalculator = ({ loanDetails, maxLtv }) => {
  const cards = [
    { label: "Pure gold", value: `${loanDetails.pureGoldWeight} g`, icon: Scale },
    { label: "Gold value", value: formatCurrency(loanDetails.totalGoldValue), icon: CircleDollarSign },
    { label: "Eligible amount", value: formatCurrency(loanDetails.maximumEligibleLoan), icon: Banknote, highlight: true },
  ];
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_-24px_rgba(15,23,42,0.35)]"><div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-500" /><h2 className="text-base font-bold text-slate-900">Live loan estimate</h2></div><p className="mt-1 text-xs text-slate-500">Updates automatically as you enter details.</p></div><span className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800">{maxLtv}% LTV</span></div><div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">{cards.map(({ label, value, icon: Icon, highlight }) => <div key={label} className={`relative p-4 ${highlight ? "bg-gradient-to-br from-amber-50 to-orange-50" : "bg-white"}`}><Icon size={18} className={highlight ? "text-amber-600" : "text-slate-400"} /><p className="mt-3 text-xs font-medium text-slate-500">{label}</p><p className="mt-1 text-lg font-extrabold tracking-tight text-slate-900">{value}</p>{highlight && <ArrowUpRight size={16} className="absolute right-4 top-4 text-amber-600" />}</div>)}</div></section>;
};
export default LoanCalculator;
