import { promises as fs } from 'fs';
import path from 'path';
import { Note, NoteWithContent } from '@/types/note';

const dataDirectory = path.join(process.cwd(), 'data');

// 读取所有笔记元数据
export async function getAllNotes(): Promise<Note[]> {
  const filePath = path.join(dataDirectory, 'notes.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// 根据ID获取笔记
export async function getNoteById(id: string): Promise<NoteWithContent | null> {
  const notes = await getAllNotes();
  const note = notes.find((n) => n.id === id);
  
  if (!note) {
    return null;
  }

  const filePath = path.join(dataDirectory, note.file);
  const content = await fs.readFile(filePath, 'utf8');

  return {
    ...note,
    content,
  };
}

// 根据分类获取笔记
export async function getNotesByCategory(category: string): Promise<Note[]> {
  const notes = await getAllNotes();
  return notes.filter((note) => note.category === category);
}

// 根据标签获取笔记
export async function getNotesByTag(tag: string): Promise<Note[]> {
  const notes = await getAllNotes();
  return notes.filter((note) => note.tags.includes(tag));
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const notes = await getAllNotes();
  const categories = new Set(notes.map((note) => note.category));
  return Array.from(categories).sort();
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const notes = await getAllNotes();
  const tags = new Set(notes.flatMap((note) => note.tags));
  return Array.from(tags).sort();
}

// 获取分类统计
export async function getCategoryStats(): Promise<{ name: string; count: number }[]> {
  const notes = await getAllNotes();
  const stats: Record<string, number> = {};
  
  notes.forEach((note) => {
    stats[note.category] = (stats[note.category] || 0) + 1;
  });

  return Object.entries(stats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 获取标签统计
export async function getTagStats(): Promise<{ name: string; count: number }[]> {
  const notes = await getAllNotes();
  const stats: Record<string, number> = {};
  
  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      stats[tag] = (stats[tag] || 0) + 1;
    });
  });

  return Object.entries(stats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

