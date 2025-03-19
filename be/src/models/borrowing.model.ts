export type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Borrowing {
  id: number;
  userId: number;
  bookId: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type BorrowingCreateInput = Pick<Borrowing, 'userId' | 'bookId'>; 