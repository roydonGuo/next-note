'use client';

import Link from 'next/link';
import { FolderOpen, Tag as TagIcon } from 'lucide-react';

interface CategorySidebarProps {
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  selectedCategory: string | null;
  totalNotes: number;
  onCategorySelect: (category: string | null) => void;
}

export default function CategorySidebar({
  categories,
  tags,
  selectedCategory,
  totalNotes,
  onCategorySelect,
}: CategorySidebarProps) {
  return (
    <aside className="lg:col-span-1 space-y-6">
      {/* 分类 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50 dark:from-zinc-800 dark:to-blue-950/30 rounded-2xl shadow-lg border border-blue-100/50 dark:border-blue-900/50 p-6 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-md">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              分类
            </h2>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => onCategorySelect(null)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:scale-105'
              }`}
            >
              <span className="font-medium">全部</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                selectedCategory === null
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}>
                {totalNotes}
              </span>
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategorySelect(category.name)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:scale-105'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  selectedCategory === category.name
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 标签云 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-zinc-800 dark:to-purple-950/30 rounded-2xl shadow-lg border border-purple-100/50 dark:border-purple-900/50 p-6 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-2xl"></div>
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md">
              <TagIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              标签
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tag/${tag.name}`}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/50 dark:hover:to-pink-800/50 transition-all hover:scale-105 shadow-sm hover:shadow-md border border-purple-200/50 dark:border-purple-800/50"
              >
                <TagIcon className="w-3.5 h-3.5" />
                {tag.name}
                <span className="text-xs opacity-70 bg-white/50 dark:bg-white/10 px-1.5 py-0.5 rounded-full">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

