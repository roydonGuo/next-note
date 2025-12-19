export interface Note {
  id: string;
  title: string;
  category: string;
  tags: string[];
  file: string;
  date: string;
  description: string;
}

export interface NoteWithContent extends Note {
  content: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface Tag {
  name: string;
  count: number;
}

