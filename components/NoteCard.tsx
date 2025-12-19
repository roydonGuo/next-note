import Link from 'next/link';
import { Note } from '@/types/note';
import { Calendar, Tag as TagIcon, ArrowRight } from 'lucide-react';

export default function NoteCard({ note }: { note: Note }) {
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
        {/* 装饰性渐变背景 */}
        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${config.gradient} opacity-10 dark:opacity-5 rounded-full blur-3xl group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity`}></div>
        
        <div className="relative">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all">
                  {note.title}
                </h3>
                <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
              </div>
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

