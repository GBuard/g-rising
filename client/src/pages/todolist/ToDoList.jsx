import { useEffect, useState } from "react";

export default function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [link, setLink] = useState("");

    // Récupérer les todos
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        fetch(`${apiUrl}/api/todo`)
            .then((res) => res.json())
            .then(setTodos);
    }, []);

    const addTodo = async () => {
        if (!text.trim()) return;

        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await fetch(`${apiUrl}/api/todo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, link }),
        });

        const newTodo = await res.json();
        setTodos([newTodo, ...todos]);
        setText("");
        setLink("");
    };

    const toggleDone = async (id) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await fetch(`${apiUrl}/api/todo/${id}`, {
            method: "PATCH",
        });
        const updated = await res.json();
        setTodos(todos.map((t) => (t._id === id ? updated : t)));
    };

    const deleteTodo = async (id) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        await fetch(`${apiUrl}/api/todo/${id}`, {
            method: "DELETE",
        });
        setTodos(todos.filter((t) => t._id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1D1D1D] to-black text-white p-10">
            <h1 className="text-5xl text-center mb-10">🧠 To-Do List</h1>

            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 shadow-lg">
                <input
                    type="text"
                    placeholder="Nouvelle tâche"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-white/10 text-white outline-none"
                />
                <input
                    type="text"
                    placeholder="Lien (optionnel)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-white/10 text-white outline-none"
                />
                <button
                    onClick={addTodo}
                    className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded"
                >
                    Ajouter
                </button>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
                {todos.map((todo) => (
                    <div
                        key={todo._id}
                        className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex justify-between items-center"
                    >
                        <div
                            className={`text-lg ${
                                todo.done ? "line-through text-gray-400" : ""
                            }`}
                        >
                            {todo.link ? (
                                <a
                                    href={todo.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-green-400"
                                >
                                    {todo.text}
                                </a>
                            ) : (
                                todo.text
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleDone(todo._id)}
                                className={`px-3 py-1 rounded ${
                                    todo.done
                                        ? "bg-yellow-500 hover:bg-yellow-600"
                                        : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            >
                                {todo.done ? "Annuler" : "Fait"}
                            </button>
                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
