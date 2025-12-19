import { notFound } from 'next/navigation';
import { getNotesByTag, getAllTags, getAllNotes, getCategoryStats, getTagStats } from '@/lib/notes';
import AppLayout from '@/components/AppLayout';
import TagPageClient from './TagPageClient';

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
  const allNotes = await getAllNotes();
  const categoryStats = await getCategoryStats();
  const tagStats = await getTagStats();

  if (!tags.includes(tag)) {
    notFound();
  }

  return (
    <AppLayout notes={allNotes} categories={categoryStats} tags={tagStats}>
      <TagPageClient tag={tag} notes={notes} />
    </AppLayout>
  );
}

