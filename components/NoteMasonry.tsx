import Masonry from 'react-masonry-css';
import NoteCard from './NoteCard';
import { Note } from '@/types/note';

interface NoteMasonryProps {
  notes: Note[];
  breakpointCols?: Record<string, number>;
}

const defaultBreakpoints = {
  default: 5,
  1600: 4,
  1280: 3,
  900: 2,
  640: 1,
};

export default function NoteMasonry({ notes, breakpointCols = defaultBreakpoints }: NoteMasonryProps) {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </Masonry>
  );
}

