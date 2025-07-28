import { useState, useEffect } from "react";

export default function SaisieDuJour() {
    const [sport, setSport] = useState(null);
    const [repas, setRepas] = useState(null);
    const [complements, setComplements] = useState(null);
    const [cannabis, setCannabis] = useState(null);
    const [poids, setPoids] = useState("");
    const [visibleWords, setVisibleWords] = useState([]);

    const sentence = "Salut boss, qu’est-ce que t’as fait aujourd’hui ?";
    const words = sentence.split(" ");

    useEffect(() => {
        setVisibleWords([]);
        const timers = words.map((_, i) =>
            setTimeout(() => {
                setVisibleWords((prev) => [...prev, i]);
            }, i * 200)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            sport === null ||
            repas === null ||
            complements === null ||
            cannabis === null ||
            poids === ""
        ) {
            alert("Merci de remplir tous les champs !");
            return;
        }

        const entry = {
            date: new Date(),
            sport,
            repas: parseInt(repas),
            complements: parseInt(complements),
            cannabis,
            poids: parseFloat(poids),
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await fetch(`${apiUrl}/api/entry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entry),
            });

            if (res.ok) {
                alert("Données envoyées !");
                setSport(null);
                setRepas(null);
                setComplements(null);
                setCannabis(null);
                setPoids("");
            } else {
                alert("Erreur lors de l'envoi.");
            }
        } catch (error) {
            alert("Erreur serveur.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#1D1D1D] text-white flex items-center justify-center px-2 sm:px-4 md:px-8 py-6 sm:py-10">
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-5xl text-center mb-8 sm:mb-14 md:mb-24 mt-4 sm:mt-8 md:mt-16">
                    {sentence.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className="inline-block opacity-90"
                            style={{
                                animation: `fadeIn 0.5s ${index * 0.07}s both`,
                            }}
                        >
                            {word}&nbsp;
                        </span>
                    ))}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* LIGNE 1 */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Sport */}
                        <div className="flex-1 bg-[#262626] rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-lg sm:text-xl md:text-2xl font-medium">
                                T’as fait ton sport ?
                            </label>
                            <div className="flex gap-3">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sport"
                                        value="true"
                                        checked={sport === true}
                                        onChange={() => setSport(true)}
                                        className="accent-green-500"
                                    />{" "}
                                    Oui
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sport"
                                        value="false"
                                        checked={sport === false}
                                        onChange={() => setSport(false)}
                                        className="accent-red-500"
                                    />{" "}
                                    Non
                                </label>
                            </div>
                        </div>
                        {/* Repas */}
                        <div className="flex-1 bg-[#262626] rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-lg sm:text-xl md:text-2xl font-medium">
                                T’as graille combien de repas ?
                            </label>
                            <div className="flex gap-3">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="repas"
                                        value="1"
                                        checked={repas === "1"}
                                        onChange={(e) =>
                                            setRepas(e.target.value)
                                        }
                                        className="accent-yellow-400"
                                    />{" "}
                                    Un seul
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="repas"
                                        value="2"
                                        checked={repas === "2"}
                                        onChange={(e) =>
                                            setRepas(e.target.value)
                                        }
                                        className="accent-yellow-400"
                                    />{" "}
                                    Deux
                                </label>
                            </div>
                        </div>
                        {/* Compléments */}
                        <div className="flex-1 bg-[#262626] rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-lg sm:text-xl md:text-2xl font-medium">
                                Et les compléments ?
                            </label>
                            <div className="flex gap-3 flex-wrap">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="complements"
                                        value="0"
                                        checked={complements === "0"}
                                        onChange={(e) =>
                                            setComplements(e.target.value)
                                        }
                                        className="accent-blue-400"
                                    />{" "}
                                    Zéro
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="complements"
                                        value="1"
                                        checked={complements === "1"}
                                        onChange={(e) =>
                                            setComplements(e.target.value)
                                        }
                                        className="accent-blue-400"
                                    />{" "}
                                    Un seul
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="complements"
                                        value="2"
                                        checked={complements === "2"}
                                        onChange={(e) =>
                                            setComplements(e.target.value)
                                        }
                                        className="accent-blue-400"
                                    />{" "}
                                    Deux
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* LIGNE 2 */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
                        {/* Cannabis */}
                        <div className="flex-1 bg-[#262626] rounded-xl p-4 flex flex-col gap-2">
                            <label className="text-lg sm:text-xl md:text-2xl font-medium">
                                Est-ce que t’as fumé ?
                            </label>
                            <div className="flex gap-3">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="cannabis"
                                        value="false"
                                        checked={cannabis === false}
                                        onChange={() => setCannabis(false)}
                                        className="accent-green-500"
                                    />{" "}
                                    Non
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="cannabis"
                                        value="true"
                                        checked={cannabis === true}
                                        onChange={() => setCannabis(true)}
                                        className="accent-red-500"
                                    />{" "}
                                    Oui
                                </label>
                            </div>
                        </div>
                        {/* Poids */}
                        <div className="flex-1 bg-[#262626] rounded-xl p-4 flex flex-col gap-2 max-w-xs mx-auto md:mx-0">
                            <label className="text-lg sm:text-xl md:text-2xl font-medium">
                                Poids (kg)
                            </label>
                            <input
                                type="number"
                                value={poids}
                                onChange={(e) => setPoids(e.target.value)}
                                className="bg-[#313b4f] text-white px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        {/* Bouton */}
                        <div className="flex-1 flex items-end justify-center md:justify-end mt-4 md:mt-0">
                            <button
                                type="submit"
                                className="bg-white hover:bg-white/80 px-8 py-3 rounded-xl text-black font-semibold transition duration-200 w-full md:w-auto shadow-md"
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
            `}</style>
        </div>
    );
}
