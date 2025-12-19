import { notFound } from 'next/navigation';
import { getNotesByCategory, getAllCategories, getAllNotes, getCategoryStats, getTagStats } from '@/lib/notes';
import CategoryPageClient from './CategoryPageClient';
import AppLayout from '@/components/AppLayout';

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
  const allNotes = await getAllNotes();
  const categoryStats = await getCategoryStats();
  const tagStats = await getTagStats();

  if (!categories.includes(category)) {
    notFound();
  }

  return (
    <AppLayout notes={allNotes} categories={categoryStats} tags={tagStats}>
      <CategoryPageClient category={category} notes={notes} />
    </AppLayout>
  );
}
