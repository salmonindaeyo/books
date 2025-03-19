interface User {
    email: number;
    firstName: string;
    lastName: string;
}

export type BorrowingStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

export interface Borrowing {
    id: number;
    userId: number;
    bookId: number;
    status: BorrowingStatus;
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
