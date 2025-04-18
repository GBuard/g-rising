import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="bg-[#202020] text-white w-80 min-h-screen shadow-lg">
            <div
                className="text-6xl mb-10 text-center py-14 rounded"
                style={{
                    background:
                        "linear-gradient(180deg, #333333 0%, #262626 100%)",
                }}
            >
                G. Rising
            </div>
            <nav className="flex flex-col gap-6 items-center">
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
            </nav>
        </aside>
    );
}
