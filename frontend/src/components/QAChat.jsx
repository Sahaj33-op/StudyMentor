import React, { useState } from "react";

export default function QAChat() {
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer(null);
    try {
      const res = await fetch("/api/qa/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, question }),
      });
      if (!res.ok) throw new Error("Failed to get answer");
      const data = await res.json();
      setAnswer(data.answer);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium">Context (summary or notes)</label>
      <textarea
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
        rows={4}
        value={context}
        onChange={(e) => setContext(e.target.value)}
        required
      />
      <label className="block font-medium">Your Question</label>
      <input
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Answering..." : "Ask"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {answer && (
        <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="font-bold mb-2">Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </form>
  );
}