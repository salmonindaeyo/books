import { Status } from './borrowing.model';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookWithBorrowings extends Book {
  borrowings: Array<{
    id: number;
    status: Status;
    userId: number;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }>;
}

export type BookCreateInput = Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'available'>;
export type BookUpdateInput = Partial<BookCreateInput>; 