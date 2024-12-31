export interface Book {
  title: string;
  author: string;
  publishedYear: number | string;
  rating: number | string;
  firstSentence: string;
}

export interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}
