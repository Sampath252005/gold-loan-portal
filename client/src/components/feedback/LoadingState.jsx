import { LoaderCircle } from "lucide-react";
const LoadingState = ({ label = "Loading…" }) => <div className="flex min-h-40 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-500"><LoaderCircle className="animate-spin text-amber-500" size={20} /> {label}</div>;
export default LoadingState;
