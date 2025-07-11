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
        <div className="min-h-screen bg-[#1D1D1D] text-white flex items-center justify-center px-3 sm:px-6 md:px-10 py-6 sm:py-8">
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl">
                <h2 className="text-2xl sm:text-3xl md:text-6xl text-center mb-10 sm:mb-16 md:mb-40 mt-6 sm:mt-10 md:mt-20">
                    {"Salut boss, qu’est-ce que t’as fait aujourd’hui ?"
                        .split(" ")
                        .map((word, index) => (
                            <span
                                key={index}
                                className="word-animate"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {word}&nbsp;
                            </span>
                        ))}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* LIGNE 1 */}
                    <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
                        {/* Sport */}
                        <div className="flex flex-col space-y-2 flex-1">
                            <label className="text-xl sm:text-2xl md:text-3xl">
                                T’as fait ton sport ?
                            </label>
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="sport"
                                        value="true"
                                        checked={sport === true}
                                        onChange={() => setSport(true)}
                                    />{" "}
                                    Oui
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="sport"
                                        value="false"
                                        checked={sport === false}
                                        onChange={() => setSport(false)}
                                    />{" "}
                                    Non
                                </label>
                            </div>
                        </div>
                        {/* Repas */}
                        <div className="flex flex-col space-y-2 flex-1">
                            <label className="text-xl sm:text-2xl md:text-3xl">
                                T’as graille combien de repas ?
                            </label>
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="repas"
                                        value="1"
                                        checked={repas === "1"}
                                        onChange={(e) =>
                                            setRepas(e.target.value)
                                        }
                                    />{" "}
                                    Un seul
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="repas"
                                        value="2"
                                        checked={repas === "2"}
                                        onChange={(e) =>
                                            setRepas(e.target.value)
                                        }
                                    />{" "}
                                    Deux
                                </label>
                            </div>
                        </div>
                        {/* Compléments */}
                        <div className="flex flex-col space-y-2 flex-1">
                            <label className="text-xl sm:text-2xl md:text-3xl">
                                Et les compléments ?
                            </label>
                            <div className="flex gap-4 flex-wrap">
                                <label>
                                    <input
                                        type="radio"
                                        name="complements"
                                        value="0"
                                        checked={complements === "0"}
                                        onChange={(e) =>
                                            setComplements(e.target.value)
                                        }
                                    />{" "}
                                    Zero
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="complements"
                                        value="1"
                                        checked={complements === "1"}
                                        onChange={(e) =>
                                            setComplements(e.target.value)
                                        }
                                    />{" "}
                                    Un seul
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="complements"
                                        value="2"
                                        checked={complements === "2"}
                                        onChange={(e) =>
                                            setComplements(e.target.value)
                                        }
                                    />{" "}
                                    Deux
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* LIGNE 2 */}
                    <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 items-end">
                        {/* Cannabis */}
                        <div className="flex flex-col space-y-2 flex-1">
                            <label className="text-xl sm:text-2xl md:text-3xl">
                                Est-ce que t’as fumé ?
                            </label>
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="cannabis"
                                        value="false"
                                        checked={cannabis === false}
                                        onChange={() => setCannabis(false)}
                                    />{" "}
                                    Non
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="cannabis"
                                        value="true"
                                        checked={cannabis === true}
                                        onChange={() => setCannabis(true)}
                                    />{" "}
                                    Oui
                                </label>
                            </div>
                        </div>
                        {/* Poids */}
                        <div className="flex flex-col space-y-2 flex-1 max-w-xs">
                            <label className="text-xl sm:text-2xl md:text-3xl">
                                Poids (kg)
                            </label>
                            <input
                                type="number"
                                value={poids}
                                onChange={(e) => setPoids(e.target.value)}
                                className="bg-[#313b4f] text-white px-4 py-2 rounded-md w-full"
                            />
                        </div>
                        {/* Bouton */}
                        <button
                            type="submit"
                            className="bg-white hover:bg-white/80 px-6 py-2 rounded-md text-black transition duration-200 w-full md:w-auto mt-4 md:mt-0"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
