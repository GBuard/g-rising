import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
    return (
        <>
            {/* Overlay mobile */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setMobileOpen(false)}
            />
            <aside
                className={`fixed z-50 top-0 left-0 h-full bg-[#202020] text-white w-72 shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div
                    className="text-5xl mb-10 text-center py-10 rounded animate-gradient select-none"
                    style={{
                        background:
                            "linear-gradient(90deg, #4F46E5, #EC4899, #4F46E5)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    G. Rising
                </div>
                <style jsx>{`
                    @keyframes gradient {
                        0% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }
                    .animate-gradient {
                        animation: gradient 3s ease infinite;
                    }
                `}</style>
                <nav className="text-2xl mb-8 flex flex-col gap-6 items-center">
                    <NavLink
                        to="/"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "underline" : "hover:underline"
                        }
                    >
                        Saisie du jour
                    </NavLink>
                    <NavLink
                        to="/calendrier"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "underline" : "hover:underline"
                        }
                    >
                        Calendrier
                    </NavLink>
                    <NavLink
                        to="/statistiques"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "underline" : "hover:underline"
                        }
                    >
                        Statistiques
                    </NavLink>
                    <NavLink
                        to="/todolist"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "underline" : "hover:underline"
                        }
                    >
                        To-Do List
                    </NavLink>
                </nav>
            </aside>
        </>
    );
}
