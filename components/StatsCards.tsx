import { FileText, FolderOpen, Tag as TagIcon } from 'lucide-react';

interface StatsCardsProps {
  totalNotes: number;
  totalCategories: number;
  totalTags: number;
}

export default function StatsCards({ totalNotes, totalCategories, totalTags }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {/* 笔记数卡片 */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-950/50 dark:via-blue-900/30 dark:to-indigo-900/50 rounded-2xl shadow-lg hover:shadow-xl border border-blue-200/50 dark:border-blue-800/50 p-6 card-hover">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">总笔记数</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {totalNotes}
            </p>
          </div>
          <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl shadow-md group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* 分类数卡片 */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100 to-teal-100 dark:from-emerald-950/50 dark:via-green-900/30 dark:to-teal-900/50 rounded-2xl shadow-lg hover:shadow-xl border border-emerald-200/50 dark:border-emerald-800/50 p-6 card-hover">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">分类数</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              {totalCategories}
            </p>
          </div>
          <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl shadow-md group-hover:scale-110 transition-transform">
            <FolderOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 标签数卡片 */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-100 to-rose-100 dark:from-purple-950/50 dark:via-pink-900/30 dark:to-rose-900/50 rounded-2xl shadow-lg hover:shadow-xl border border-purple-200/50 dark:border-purple-800/50 p-6 card-hover">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">标签数</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {totalTags}
            </p>
          </div>
          <div className="p-3 bg-white/60 dark:bg-white/10 rounded-xl shadow-md group-hover:scale-110 transition-transform">
            <TagIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

