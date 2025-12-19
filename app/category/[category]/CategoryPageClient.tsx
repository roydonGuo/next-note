'use client';

import { useState, useMemo, useEffect } from 'react';
import MasonryGrid from '@/components/MasonryGrid';
import { Note } from '@/types/note';
import { FolderOpen } from 'lucide-react';

interface CategoryPageClientProps {
  category: string;
  notes: Note[];
}

const NOTES_PER_PAGE = 20;

export default function CategoryPageClient({ category, notes }: CategoryPageClientProps) {
  const [displayedCount, setDisplayedCount] = useState(NOTES_PER_PAGE);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [notes]);

  const displayedNotes = useMemo(() => {
    return sortedNotes.slice(0, displayedCount);
  }, [sortedNotes, displayedCount]);

  const hasMore = displayedNotes.length < sortedNotes.length;
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => prev + NOTES_PER_PAGE);
      setLoading(false);
    }, 300);
  };

  const categoryConfig: Record<string, { bg: string; text: string; gradient: string; iconBg: string }> = {
    frontend: {
      bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      gradient: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    },
    backend: {
      bg: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
      text: 'text-purple-700 dark:text-purple-300',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
    database: {
      bg: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
      text: 'text-orange-700 dark:text-orange-300',
      gradient: 'from-orange-500 to-amber-500',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    },
    default: {
      bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
      text: 'text-blue-700 dark:text-blue-300',
      gradient: 'from-blue-500 to-indigo-500',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    },
  };

  const config = categoryConfig[category] || categoryConfig.default;

  return (
    <div>
      {/* 分类标题 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 ${config.iconBg} rounded-2xl shadow-lg`}>
            <FolderOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-2">
              {category}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              查看该分类下的所有笔记
            </p>
          </div>
          <div className={`px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
            {notes.length} 篇笔记
          </div>
        </div>
      </div>

      {/* 笔记瀑布流 */}
      {displayedNotes.length > 0 ? (
        <MasonryGrid
          notes={displayedNotes}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400">
            该分类下还没有笔记
          </p>
        </div>
      )}
    </div>
  );
}

