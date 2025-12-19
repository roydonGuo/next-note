'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Note } from '@/types/note';
import { Calendar, Search, X, TrendingUp } from 'lucide-react';
import SearchBar from './SearchBar';
import StatsCards from './StatsCards';
import CategorySidebar from './CategorySidebar';
import NoteCard from './NoteCard';
import { useFilters } from './HomeProvider';

interface HomeClientProps {
  notes: Note[];
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  showSearchOnly?: boolean;
}

function HomeContent({ notes, categories, tags }: Omit<HomeClientProps, 'showSearchOnly'>) {
  const { searchQuery, selectedCategory, setSelectedCategory, setSearchQuery } = useFilters();

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  // 按日期排序（最新的在前）
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [notes]);

  // 最新3篇笔记（用于突出显示）
  const recentNotes = sortedNotes.slice(0, 3);

  // 过滤笔记
  const filteredNotes = useMemo(() => {
    let filtered = sortedNotes;

    // 按分类筛选
    if (selectedCategory) {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }

    // 按搜索关键词筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query) ||
        note.tags.some(tag => tag.toLowerCase().includes(query)) ||
        note.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [sortedNotes, searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== null;

  return (
    <>
      {/* 统计卡片 */}
      <StatsCards
        totalNotes={notes.length}
        totalCategories={categories.length}
        totalTags={tags.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <CategorySidebar
          categories={categories}
          tags={tags}
          selectedCategory={selectedCategory}
          totalNotes={notes.length}
          onCategorySelect={setSelectedCategory}
        />

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* 筛选状态和清除按钮 */}
          {hasActiveFilters && (
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  筛选结果: {filteredNotes.length} 篇笔记
                </span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                清除筛选
              </button>
            </div>
          )}

          {/* 最近更新（仅在无筛选时显示） */}
          {!hasActiveFilters && recentNotes.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl shadow-md">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent">
                  最近更新
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {recentNotes.map((note, index) => (
                  <Link key={note.id} href={`/note/${note.id}`}>
                    <article className="group relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-orange-950/30 dark:via-pink-950/30 dark:to-rose-950/30 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-orange-200/50 dark:border-orange-800/50 p-5 card-hover h-full">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-pink-400/20 dark:from-orange-500/10 dark:to-pink-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-white/60 dark:bg-white/10 px-2.5 py-1 rounded-full">
                            #{index + 1}
                          </span>
                          <span className="text-xs font-medium text-orange-500 dark:text-orange-400">NEW</span>
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 dark:group-hover:from-orange-400 dark:group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2">
                          {note.title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                          {note.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 bg-white/40 dark:bg-white/5 px-2.5 py-1 rounded-full w-fit">
                          <Calendar className="w-3 h-3" />
                          <span className="font-medium">{note.date}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              <div className="border-t border-zinc-200/50 dark:border-zinc-700/50 pt-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  所有笔记
                </h2>
              </div>
            </div>
          )}

          {/* 笔记列表 */}
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
              <p className="text-zinc-500 dark:text-zinc-400 mb-2">
                {hasActiveFilters ? '没有找到匹配的笔记' : '还没有笔记，快去添加一些吧！'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                >
                  清除筛选条件
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function HomeClient({ notes, categories, tags, showSearchOnly }: HomeClientProps) {
  // 如果只显示搜索框（在header中）
  if (showSearchOnly) {
    return <SearchBarWithContext />;
  }

  return <HomeContent notes={notes} categories={categories} tags={tags} />;
}

function SearchBarWithContext() {
  const { searchQuery, setSearchQuery } = useFilters();
  return <SearchBar value={searchQuery} onChange={setSearchQuery} />;
}
