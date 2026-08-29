import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import { ToastProvider } from "./components/feedback/ToastProvider";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return <ToastProvider><BrowserRouter><AppShell><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes></AppShell></BrowserRouter></ToastProvider>;
}

export default App;
