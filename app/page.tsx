import { getAllNotes, getCategoryStats, getTagStats } from '@/lib/notes';
import { BookOpen } from 'lucide-react';
import HomeClient from '@/components/HomeClient';
import { FilterProvider } from '@/components/HomeProvider';

export default async function Home() {
  const notes = await getAllNotes();
  const categories = await getCategoryStats();
  const tags = await getTagStats();

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-950 dark:via-blue-950 dark:to-indigo-950">
        {/* 背景装饰 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Header */}
        <header className="relative border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    学习笔记
                  </h1>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    记录学习路上的点点滴滴 ✨
                  </p>
                </div>
              </div>
              <HomeClient notes={notes} categories={categories} tags={tags} showSearchOnly />
            </div>
          </div>
        </header>

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HomeClient notes={notes} categories={categories} tags={tags} />
        </main>
      </div>
    </FilterProvider>
  );
}
