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
    const [poidsData, setPoidsData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5000/api/entry/stats"
                );
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Erreur chargement stats", err);
            }

            try {
                const resPoids = await fetch(
                    "http://localhost:5000/api/entry/all"
                );
                const dataPoids = await resPoids.json();
                const entries = dataPoids.entries;

                // On ne garde que les entrées avec un poids
                const filtered = entries
                    .filter((e) => e.poids !== null && e.poids !== undefined)
                    .map((e) => ({
                        date: new Date(e.date).toLocaleDateString("fr-FR"),
                        poids: e.poids,
                    }));

                setPoidsData(filtered);
            } catch (err) {
                console.error("Erreur chargement poids", err);
            }
        };

        fetchStats();
    }, []);

    if (!stats) return <div>Chargement...</div>;

    const heures = Math.floor(stats.tempsVie / 60);
    const minutes = stats.tempsVie % 60;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Statistiques</h2>
            <p>
                <strong>À arrêté depuis :</strong>{" "}
                {stats.tempsDepuisDernierJoint}
            </p>
            <p>
                <strong>Économie réalisée :</strong> {stats.economie} €
            </p>
            <p>
                <strong>Temps de vie gagné :</strong> {heures}h {minutes}m
            </p>

            {poidsData.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                    <h3>Évolution du poids</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={poidsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="poids"
                                stroke="#8884d8"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
