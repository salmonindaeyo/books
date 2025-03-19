export type BorrowStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export interface Borrowing {
    id: number;
    status: BorrowStatus;
    userId: number;
    user: User;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    quantity: number;
    available: boolean;
    createdAt: string;
    updatedAt: string;
    borrowings: Borrowing[];
}

export interface History {
    id: number;
    userId: number;
    bookId: number;
    status: BorrowStatus;
    createdAt: string;
    updatedAt: string;
    book: Book;
}
