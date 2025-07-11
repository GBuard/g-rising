import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar-style.css";

export default function Calendrier() {
    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const res = await fetch(`${apiUrl}/api/entry/all`);
                const data = await res.json();
                setEntries(data.entries || []);
            } catch (err) {
                console.error("Erreur chargement entrées :", err);
            }
        };
        fetchEntries();
    }, []);

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const renderTileContent = ({ date: tileDate, view }) => {
        if (view !== "month") return null;

        const today = new Date();
        if (tileDate > today) return null;

        const entry = entries.find((e) => {
            const entryDate = new Date(e.date);
            return isSameDay(entryDate, tileDate);
        });

        if (!entry) return null;

        return (
            <div className="flex justify-center items-center gap-1 text-xl pt-1 flex-wrap">
                {entry.sport && <span>🏋️</span>}

                {entry.complements === 2 && <span>🍃</span>}
                {entry.complements === 1 && <span>½🍃</span>}

                {entry.repas === 2 && <span>🍳</span>}
                {entry.repas === 1 && <span>½🍳</span>}

                {!entry.cannabis && <span>🚭</span>}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#1D1D1D] text-white p-10 flex flex-col items-center">
            <h2 className="text-5xl mb-8">Calendrier</h2>

            <div className="w-full max-w-9xl bg-[#262626] p-12 rounded-2xl shadow-md animate-fade-in">
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileContent={renderTileContent}
                    calendarType="iso8601"
                    className="w-full custom-calendar text-white"
                />
            </div>

            <div className="flex flex-wrap justify-center gap-10 mt-10 text-3xl">
                <div className="flex items-center gap-2">
                    <span>🏋️</span> <span>Sport fait</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>🍃</span> <span>2 compléments</span>
                    <span>½🍃</span> <span>1 complément</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>🍳</span> <span>2 repas</span>
                    <span>½🍳</span> <span>1 repas</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>🚭</span> <span>Non fumé</span>
                </div>
            </div>
        </div>
    );
}
