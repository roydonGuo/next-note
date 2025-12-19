import AppLayout from '@/components/AppLayout';
import HomeClient from '@/components/HomeClient';
import { getAllNotes, getCategoryStats, getTagStats } from '@/lib/notes';

export default async function Home() {
  const notes = await getAllNotes();
  const categories = await getCategoryStats();
  const tags = await getTagStats();

  return (
    <AppLayout notes={notes} categories={categories} tags={tags}>
      <HomeClient notes={notes} categories={categories} tags={tags} />
    </AppLayout>
  );
}
