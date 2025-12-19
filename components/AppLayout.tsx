'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';
import CategorySidebar from './CategorySidebar';
import { FilterProvider, useFilters } from './HomeProvider';
import { Note } from '@/types/note';

interface AppLayoutProps {
  children: React.ReactNode;
  notes: Note[];
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

function AppLayoutContent({ children, notes, categories, tags }: AppLayoutProps) {
  const { searchQuery, setSearchQuery } = useFilters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-950 dark:via-blue-950 dark:to-indigo-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Nav */}
      <nav className="relative border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  学习笔记
                </h1>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </nav>

      <main className="relative w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8 xl:gap-10 max-w-[1920px] mx-auto">
          {/* 左侧分类标签区域 */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CategorySidebar
              categories={categories}
              tags={tags}
              totalNotes={notes.length}
            />
          </div>

          {/* 右侧主内容 */}
          <div className="min-h-[calc(100vh-8rem)] w-full overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AppLayout({ children, notes, categories, tags }: AppLayoutProps) {
  return (
    <FilterProvider>
      <AppLayoutContent notes={notes} categories={categories} tags={tags}>
        {children}
      </AppLayoutContent>
    </FilterProvider>
  );
}

