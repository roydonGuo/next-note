import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNotesByTag, getAllTags } from '@/lib/notes';
import { Note } from '@/types/note';
import { BookOpen, Calendar, Tag as TagIcon, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const notes = await getNotesByTag(tag);
  const tags = await getAllTags();

  if (!tags.includes(tag)) {
    notFound();
  }

  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-zinc-950 dark:via-purple-950 dark:to-pink-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400/20 dark:bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl transition-all hover:scale-105 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">返回首页</span>
          </Link>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标签标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
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
        </div>

        {/* 笔记列表 */}
        <div className="space-y-4">
          {sortedNotes.map((note) => (
            <NoteCard key={note.id} note={note} currentTag={tag} />
          ))}
        </div>

        {sortedNotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400">
              该标签下还没有笔记
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// 笔记卡片组件 - 复用主站的NoteCard样式
function NoteCard({ note, currentTag }: { note: Note; currentTag: string }) {
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
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all">
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
              {note.tags.map((tagItem) => (
                <span
                  key={tagItem}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                    tagItem === currentTag
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                      : 'bg-white/60 dark:bg-white/10 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white/80 dark:hover:bg-white/20'
                  }`}
                >
                  <TagIcon className="w-3 h-3" />
                  {tagItem}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

