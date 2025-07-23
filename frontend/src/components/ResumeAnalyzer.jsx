import React, { useState } from "react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      if (!file) {
        setError("Please upload a resume file (PDF or DOCX).");
        setLoading(false);
        return;
      }
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Failed to analyze resume");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium">Upload Resume (PDF or DOCX)</label>
      <input type="file" accept=".pdf,.docx" onChange={handleFile} className="block" />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="font-bold mb-2">Feedback</h2>
            <pre className="whitespace-pre-wrap">{result.feedback}</pre>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="font-bold mb-2">Suggested Roles</h2>
            <ul className="space-y-2">
              {result.suggestedRoles.map((role, i) => (
                <li key={i}>
                  <a href={role.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    {role.title} @ {role.company}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </form>
  );
}