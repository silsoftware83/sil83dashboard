import React from 'react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();
  
  const cardBg = darkMode ? 'bg-slate-900/50' : 'bg-white';
  const borderColor = darkMode ? 'border-slate-800' : 'border-slate-200';
  const textPrimary = darkMode ? 'text-slate-100' : 'text-slate-900';
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600';
  const hoverBg = darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50';

  return (
    <header className={`${cardBg} backdrop-blur-xl border-b ${borderColor} px-6 py-4 sticky top-0 z-10`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`flex items-center gap-3 bg-slate-800/30 border ${borderColor} rounded-xl px-4 py-3 flex-1 max-w-md hover:border-blue-500/50 transition-all`}>
            <Search size={20} className={textSecondary} />
            <input
              type="text"
              placeholder="Buscar cualquier cosa..."
              className={`bg-transparent outline-none flex-1 ${textPrimary} placeholder:${textSecondary}`}
            />
            <kbd className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-slate-700' : 'bg-slate-200'} ${textSecondary}`}>
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl ${hoverBg} transition-all hover:scale-110`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`p-2.5 rounded-xl ${hoverBg} relative transition-all hover:scale-110`}>
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold ml-2 cursor-pointer hover:scale-110 transition-transform ring-2 ring-blue-500/20">
            A
          </div>
        </div>
      </div>
    </header>
  );
};