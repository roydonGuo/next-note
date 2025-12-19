'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-80 group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" />
        <input
          type="text"
          placeholder="搜索笔记、标签、分类..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 shadow-md hover:shadow-lg transition-all"
        />
      </div>
    </div>
  );
}

