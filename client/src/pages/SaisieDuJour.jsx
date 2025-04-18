// SaisieDuJour.jsx
import { useState } from "react";

export default function SaisieDuJour() {
    const [form, setForm] = useState({
        sport: "",
        repas: "",
        complements: "",
        cannabis: "",
        poids: "",
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ici tu envoies ton form avec fetch ou axios
        console.log(form);
    };

    return (
        <div className="min-h-screen bg-[#1D1D1D] text-white p-10 flex flex-col items-center font-[Coolvetica]">
            <h1 className="text-4xl mb-10 text-center">
                Salut boss, qu’est-ce que t’as fait aujourd’hui ?
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 text-lg mt-12"
            >
                {/* SPORT */}
                <div>
                    <p className="mb-2">T’as fait ton sport ?</p>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                name="sport"
                                value="true"
                                checked={form.sport === "true"}
                                onChange={() => handleChange("sport", "true")}
                                className="mr-2"
                            />
                            Oui
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sport"
                                value="false"
                                checked={form.sport === "false"}
                                onChange={() => handleChange("sport", "false")}
                                className="mr-2"
                            />
                            Non
                        </label>
                    </div>
                </div>

                {/* REPAS */}
                <div>
                    <p className="mb-2">T’as graille combien de repas ?</p>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                name="repas"
                                value="1"
                                checked={form.repas === "1"}
                                onChange={() => handleChange("repas", "1")}
                                className="mr-2"
                            />
                            Un seul
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="repas"
                                value="2"
                                checked={form.repas === "2"}
                                onChange={() => handleChange("repas", "2")}
                                className="mr-2"
                            />
                            Deux
                        </label>
                    </div>
                </div>

                {/* COMPLÉMENTS */}
                <div>
                    <p className="mb-2">Et les compléments ?</p>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                name="complements"
                                value="1"
                                checked={form.complements === "1"}
                                onChange={() =>
                                    handleChange("complements", "1")
                                }
                                className="mr-2"
                            />
                            Un seul
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="complements"
                                value="2"
                                checked={form.complements === "2"}
                                onChange={() =>
                                    handleChange("complements", "2")
                                }
                                className="mr-2"
                            />
                            Deux
                        </label>
                    </div>
                </div>

                {/* CANNABIS */}
                <div>
                    <p className="mb-2">Est-ce que t’as fumé ?</p>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                name="cannabis"
                                value="false"
                                checked={form.cannabis === "false"}
                                onChange={() =>
                                    handleChange("cannabis", "false")
                                }
                                className="mr-2"
                            />
                            Non
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="cannabis"
                                value="true"
                                checked={form.cannabis === "true"}
                                onChange={() =>
                                    handleChange("cannabis", "true")
                                }
                                className="mr-2"
                            />
                            Oui
                        </label>
                    </div>
                </div>

                {/* POIDS */}
                <div className="md:col-span-2">
                    <p className="mb-2">Poids (kg)</p>
                    <input
                        type="number"
                        name="poids"
                        value={form.poids}
                        onChange={(e) => handleChange("poids", e.target.value)}
                        className="p-2 rounded-2xl bg-gray-700 text-white"
                    />
                </div>

                {/* BOUTON */}
                <div className="md:col-span-2 flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-white hover:bg-white/80 transition-colors px-6 py-2 rounded-lg text-black"
                    >
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    );
}
