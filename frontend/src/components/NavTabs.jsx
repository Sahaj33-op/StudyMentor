import React from "react";

export default function NavTabs({ tabs, current, onTab }) {
  return (
    <div className="flex space-x-2 border-b dark:border-gray-700 mb-4">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium rounded-t transition-colors focus:outline-none ${
            i === current
              ? "bg-white dark:bg-gray-800 border-x border-t border-b-0 border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400"
              : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          }`}
          onClick={() => onTab(i)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}