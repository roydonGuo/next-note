'use client';

import { useMemo, useState, useEffect } from 'react';
import MasonryGrid from '@/components/MasonryGrid';
import { Note } from '@/types/note';
import { Tag as TagIcon } from 'lucide-react';

interface TagPageClientProps {
  tag: string;
  notes: Note[];
}

const NOTES_PER_PAGE = 20;

export default function TagPageClient({ tag, notes }: TagPageClientProps) {
  const [displayedCount, setDisplayedCount] = useState(NOTES_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [notes]);

  const displayedNotes = useMemo(() => {
    return sortedNotes.slice(0, displayedCount);
  }, [sortedNotes, displayedCount]);

  const hasMore = displayedNotes.length < sortedNotes.length;

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + NOTES_PER_PAGE);
      setLoading(false);
    }, 250);
  };

  useEffect(() => {
    setDisplayedCount(NOTES_PER_PAGE);
  }, [tag]);

  return (
    <div>
      {/* 标签标题 */}
      <div className="mb-8 flex items-center gap-4">
        <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
          <TagIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-2">
            #{tag}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            查看该标签下的所有笔记
          </p>
        </div>
        <div className="px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
          {notes.length} 篇笔记
        </div>
      </div>

      {/* 瀑布流 */}
      {displayedNotes.length > 0 ? (
        <MasonryGrid
          notes={displayedNotes}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      ) : (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          该标签下还没有笔记
        </div>
      )}
    </div>
  );
}

