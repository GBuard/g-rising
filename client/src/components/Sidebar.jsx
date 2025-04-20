import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="bg-[#202020] text-white w-80 min-h-screen shadow-lg">
            <div
                className="text-6xl mb-10 text-center py-14 rounded animate-gradient"
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
                    className={({ isActive }) =>
                        isActive ? "underline font-semibold" : "hover:underline"
                    }
                >
                    Saisie du jour
                </NavLink>
                <NavLink
                    to="/calendrier"
                    className={({ isActive }) =>
                        isActive ? "underline font-semibold" : "hover:underline"
                    }
                >
                    Calendrier
                </NavLink>
                <NavLink
                    to="/statistiques"
                    className={({ isActive }) =>
                        isActive ? "underline font-semibold" : "hover:underline"
                    }
                >
                    Statistiques
                </NavLink>
                <NavLink
                    to="/todolist"
                    className={({ isActive }) =>
                        isActive ? "underline font-semibold" : "hover:underline"
                    }
                >
                    To-Do List
                </NavLink>
            </nav>
        </aside>
    );
}
