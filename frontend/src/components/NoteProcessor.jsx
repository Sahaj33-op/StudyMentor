import React, { useState } from "react";

export default function NoteProcessor() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      let res;
      if (file) {
        const form = new FormData();
        form.append("file", file);
        res = await fetch("/api/notes/process", {
          method: "POST",
          body: form,
        });
      } else if (text.trim()) {
        const blob = new Blob([text], { type: "text/plain" });
        const form = new FormData();
        form.append("file", blob, "notes.txt");
        res = await fetch("/api/notes/process", {
          method: "POST",
          body: form,
        });
      } else {
        setError("Please upload a file or enter text.");
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to process notes");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium">Upload PDF or Text</label>
      <input type="file" accept=".pdf,.txt" onChange={handleFile} className="block" />
      <div className="text-center text-gray-500">or</div>
      <textarea
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
        rows={5}
        placeholder="Paste your notes here..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setFile(null);
        }}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : "Summarize & Generate Quiz"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="font-bold mb-2">Summary</h2>
            <p>{result.summary}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="font-bold mb-2">Quiz Questions</h2>
            <ul className="space-y-2">
              {result.questions.map((q, i) => (
                <li key={i} className="border-b pb-2">
                  <div className="font-medium">Q{i + 1}: {q.question}</div>
                  <ul className="ml-4 list-disc">
                    {q.options.map((opt, j) => (
                      <li key={j} className={j === q.answerIndex ? "font-bold text-green-600" : ""}>{opt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </form>
  );
}