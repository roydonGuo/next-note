import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNotesByCategory, getAllCategories } from '@/lib/notes';
import { Note } from '@/types/note';
import { BookOpen, Calendar, Tag as TagIcon, FolderOpen, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const notes = await getNotesByCategory(category);
  const categories = await getAllCategories();

  if (!categories.includes(category)) {
    notFound();
  }

  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-950 dark:via-blue-950 dark:to-indigo-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl transition-all hover:scale-105 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">返回首页</span>
          </Link>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* 笔记列表 */}
        <div className="space-y-4">
          {sortedNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

        {sortedNotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400">
              该分类下还没有笔记
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// 笔记卡片组件 - 复用主站的NoteCard样式
function NoteCard({ note }: { note: Note }) {
  const categoryConfig: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    frontend: {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800',
      gradient: 'from-emerald-500 to-teal-500',
    },
    backend: {
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800',
      gradient: 'from-purple-500 to-pink-500',
    },
    database: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
      text: 'text-orange-700 dark:text-orange-300',
      border: 'border-orange-200 dark:border-orange-800',
      gradient: 'from-orange-500 to-amber-500',
    },
    default: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800',
      gradient: 'from-blue-500 to-indigo-500',
    },
  };

  const config = categoryConfig[note.category] || categoryConfig.default;

  return (
    <Link href={`/note/${note.id}`}>
      <article className={`group relative overflow-hidden ${config.bg} rounded-2xl shadow-md hover:shadow-2xl border ${config.border} p-6 card-hover backdrop-blur-sm`}>
        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${config.gradient} opacity-10 dark:opacity-5 rounded-full blur-3xl group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity`}></div>
        
        <div className="relative">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all">
                {note.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                {note.description}
              </p>
            </div>
            <span className={`px-4 py-1.5 text-xs font-semibold rounded-full ${config.text} bg-white/60 dark:bg-white/10 backdrop-blur-sm border ${config.border} whitespace-nowrap shadow-sm`}>
              {note.category}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap mt-5 pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 bg-white/40 dark:bg-white/5 px-2.5 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{note.date}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white/60 dark:bg-white/10 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

