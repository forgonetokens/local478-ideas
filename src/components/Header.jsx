import { useState } from 'react';

export function Header({
  view,
  setView,
  isAdmin,
  onAdminClick,
  onLogout,
  onSubmitClick,
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
              478
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Local 478</h1>
              <p className="text-xs text-slate-400">Ideas Pipeline</p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setView('pipeline')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'pipeline'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setView('category')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'category'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Categories
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSubmitClick}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + Submit Idea
            </button>
            {isAdmin ? (
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg transition-colors border border-red-600/30"
              >
                Exit Admin
              </button>
            ) : (
              <button
                onClick={onAdminClick}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium rounded-lg transition-colors"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
