import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <div className="flex min-h-screen">
            {/* Bouton hamburger mobile */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden bg-[#202020] p-2 rounded shadow-lg"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
            >
                <svg
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <main className="flex-1 text-white bg-[#1D1D1D]">{children}</main>
        </div>
    );
}
