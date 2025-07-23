import React, { useState } from "react";

const LEVELS = ["beginner", "intermediate", "advanced"];

export default function RoadmapGenerator() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState(LEVELS[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, level }),
      });
      if (!res.ok) throw new Error("Failed to generate roadmap");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium">Learning Goal</label>
      <input
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
        placeholder="e.g. Learn Machine Learning"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />
      <label className="block font-medium">Level</label>
      <select
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        {LEVELS.map((lvl) => (
          <option key={lvl} value={lvl}>{lvl}</option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {result && (
        <div className="mt-6 space-y-4">
          {result.map((m, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="font-bold mb-2">{m.milestone}</h2>
              <p>{m.description}</p>
              <ul className="mt-2 list-disc ml-6">
                {m.resources.map((r, j) => (
                  <li key={j}>
                    <a href={r.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{r.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}