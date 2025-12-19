'use client';

import React, { useState, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) return extractText((node as any).props.children);
  return '';
}

function CodeBlock(props: any) {
  const [copied, setCopied] = useState(false);

  // children 中是带高亮 span 的 <code> 元素，直接保留以展示高亮
  const child = Array.isArray(props.children) ? props.children[0] : props.children;
  const codeText = extractText(child).replace(/\n+$/g, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('复制失败', e);
    }
  };

  const className: string = child?.props?.className || '';
  const match = /language-([\w-]+)/.exec(className);
  const language = match?.[1] || 'text';

  const lines = codeText.split('\n');

  return (
    <div className="group relative my-4 rounded-xl border border-zinc-800/80 bg-slate-950/95 overflow-hidden">
      {/* 顶部工具栏：语言 + 复制按钮 */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-slate-900/90">
        <span className="text-[11px] uppercase tracking-wide text-zinc-400">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-zinc-800 text-zinc-100 text-[11px] px-2.5 py-1 shadow-md hover:bg-zinc-700 transition-colors"
        >
          <span>{copied ? '已复制' : '复制'}</span>
        </button>
      </div>

      {/* 行号 + 高亮代码块 */}
      <div className="relative">
        {/* 行号列 */}
        <div className="pointer-events-none absolute justify-center inset-y-0 left-0 flex flex-col items-end pt-4 pb-4 pl-3 pr-2 text-[11px] text-zinc-500 select-none bg-slate-950/95">
          {lines.map((_, index) => (
            <span key={index} className="leading-relaxed" style={{ padding: '1px 0' }}>
              {index + 1}
            </span>
          ))}
        </div>

        {/* 代码区域，左侧腾出空间给行号 */}
        <pre className="m-0 pl-12 pr-3 py-3 text-xs leading-relaxed font-mono text-zinc-100 overflow-x-auto">
          {child}
        </pre>
      </div>
    </div>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: (props) => <CodeBlock {...props} />,
          code({ inline, className, children, ...props }: any) {
            if (inline) {
              return (
                <code
                  className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}