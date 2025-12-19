'use client';

import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import NoteCard from './NoteCard';
import { Note } from '@/types/note';

interface MasonryGridProps {
  notes: Note[];
  loadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export default function MasonryGrid({ notes, loadMore, hasMore, loading }: MasonryGridProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMore || !hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMore, hasMore, loading]);

  const breakpointColumnsObj = {
    default: 4,
    1920: 5,
    1536: 4,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id} className="mb-4">
            <NoteCard note={note} />
          </div>
        ))}
      </Masonry>

      {/* Load More Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {loading && (
            <div className="text-zinc-500 dark:text-zinc-400">加载中...</div>
          )}
        </div>
      )}

      {!hasMore && notes.length > 0 && (
        <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
          没有更多内容了
        </div>
      )}
    </>
  );
}

