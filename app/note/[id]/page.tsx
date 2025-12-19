import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getNoteById, getAllNotes } from '@/lib/notes';
import {
  ArrowLeft,
  Calendar,
  Tag as TagIcon,
  FolderOpen,
  Heart,
  Bookmark,
  MessageCircle,
  Share2,
} from 'lucide-react';
import 'highlight.js/styles/github-dark.css';

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({
    id: note.id,
  }));
}

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    frontend: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    backend: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    database: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    default: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  };

  const categoryColor = categoryColors[note.category] || categoryColors.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-950 dark:via-blue-950 dark:to-indigo-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <main className="relative max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-10 items-start">
          {/* 左侧操作栏：返回 + 竖向操作按钮，透明背景 */}
          <aside className="lg:sticky lg:top-20 self-start">
            <div className="flex flex-col items-center gap-6">
              {/* 顶部返回按钮（圆形图标） */}
              <Link
                href="/"
                className="group inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all"
                aria-label="返回首页"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>

              {/* 竖向操作按钮，灰色底色 */}
              <div className="flex flex-col items-center gap-3 mt-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-pink-500 dark:text-pink-300 bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-pink-500/15 dark:hover:bg-pink-400/20 hover:scale-105 transition-all border border-zinc-200/70 dark:border-zinc-700/70 shadow-sm"
                  aria-label="点赞"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-amber-500 dark:text-amber-300 bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-amber-500/15 dark:hover:bg-amber-400/20 hover:scale-105 transition-all border border-zinc-200/70 dark:border-zinc-700/70 shadow-sm"
                  aria-label="收藏"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-blue-500 dark:text-blue-300 bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-blue-500/15 dark:hover:bg-blue-400/20 hover:scale-105 transition-all border border-zinc-200/70 dark:border-zinc-700/70 shadow-sm"
                  aria-label="评论"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-emerald-500 dark:text-emerald-300 bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-emerald-500/15 dark:hover:bg-emerald-400/20 hover:scale-105 transition-all border border-zinc-200/70 dark:border-zinc-700/70 shadow-sm"
                  aria-label="分享"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </aside>

          {/* 右侧内容 */}
          <article className="relative overflow-hidden bg-white/85 dark:bg-zinc-900/85 backdrop-blur-sm rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-8 md:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl"></div>

            <header className="relative mb-8 pb-6 border-b border-zinc-200/50 dark:border-zinc-700/50">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 leading-tight">
                {note.title}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                {note.description}
              </p>

              {/* 元信息：分类、日期、标签 */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/category/${note.category}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl ${categoryColor} hover:scale-105 transition-all shadow-sm`}
                >
                  <FolderOpen className="w-4 h-4" />
                  {note.category}
                </Link>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-100/60 dark:bg-zinc-800/60 px-3 py-2 rounded-xl">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{note.date}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/50 dark:hover:to-pink-800/50 transition-all hover:scale-105 shadow-sm hover:shadow-md border border-purple-200/50 dark:border-purple-800/50"
                    >
                      <TagIcon className="w-3.5 h-3.5" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </header>

            <div className="markdown max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

