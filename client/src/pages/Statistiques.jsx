import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Statistiques() {
    const [stats, setStats] = useState(null);
    const [weights, setWeights] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch("http://localhost:5000/api/entry/stats");
            const data = await res.json();
            setStats(data);
        };

        const fetchWeights = async () => {
            const res = await fetch("http://localhost:5000/api/entry/weights");
            const data = await res.json();
            setWeights(data.poids || []);
        };

        fetchStats();
        fetchWeights();
    }, []);

    if (!stats) return <div className="text-white p-10">Chargement...</div>;

    const heures = Math.floor(stats.tempsVie / 60);
    const minutes = stats.tempsVie % 60;

    return (
        <div className="min-h-screen bg-image text-white p-10 font-[Coolvetica]">
            <h2 className="text-4xl mb-10 text-center">Voici tes stats</h2>

            {/* 🟩 CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto">
                {/* Card 1 */}
                <div className="card-glass animate-fade-in">
                    <div className="text-3xl mb-2">🧯</div>
                    <p className="text-sm text-gray-300 mb-1">Dernier joint</p>
                    <p className="text-xl font-semibold">
                        {stats.tempsDepuisDernierJoint}
                    </p>
                </div>

                {/* Card 2 */}
                <div
                    className="card-glass animate-fade-in"
                    style={{ animationDelay: "100ms" }}
                >
                    <div className="text-3xl mb-2">💰</div>
                    <p className="text-sm text-gray-300 mb-1">
                        Économie réalisée
                    </p>
                    <p className="text-xl font-semibold">{stats.economie} €</p>
                </div>

                {/* Card 3 */}
                <div
                    className="card-glass animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                >
                    <div className="text-3xl mb-2">⏱️</div>
                    <p className="text-sm text-gray-300 mb-1">
                        Temps de vie gagné
                    </p>
                    <p className="text-xl font-semibold">
                        {heures}h {minutes}m
                    </p>
                </div>
            </div>

            {/* 📉 GRAPHIQUE */}
            {weights.length > 0 && (
                <div className="bg-[#262626] rounded-xl p-6 max-w-7xl mx-auto">
                    <h3 className="text-2xl mb-4 text-center">
                        📉 Évolution du poids
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weights}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[45, 65]} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="poids"
                                stroke="#4ade80"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
