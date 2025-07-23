import React, { useState } from "react";
import NavTabs from "./components/NavTabs";
import NoteProcessor from "./components/NoteProcessor";
import RoadmapGenerator from "./components/RoadmapGenerator";
import QAChat from "./components/QAChat";
import ResumeAnalyzer from "./components/ResumeAnalyzer";

const TABS = [
  { label: "Notes", component: <NoteProcessor /> },
  { label: "Roadmap", component: <RoadmapGenerator /> },
  { label: "Q&A", component: <QAChat /> },
  { label: "Resume", component: <ResumeAnalyzer /> },
];

export default function App() {
  const [tab, setTab] = useState(0);
  const [dark, setDark] = useState(false);
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">StudyMentor AI</h1>
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
      <NavTabs tabs={TABS.map((t) => t.label)} current={tab} onTab={setTab} />
      <div className="p-4 max-w-3xl mx-auto">
        {TABS[tab].component}
      </div>
    </div>
  );
}