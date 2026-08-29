import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const NotFound = () => <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6"><p className="text-sm font-bold uppercase tracking-widest text-amber-600">404</p><h1 className="mt-3 text-3xl font-bold">Page not found</h1><Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-white hover:bg-amber-600"><ArrowLeft size={17} /> Back to application</Link></div>;
export default NotFound;
