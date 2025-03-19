import { BorrowingRepository } from '../repositories/borrowing.repository';
import { BookRepository } from '../repositories/book.repository';
import { Borrowing } from '../models/borrowing.model';
import { Status } from '@prisma/client';

export class BorrowingService {
  constructor(
    private borrowingRepository: BorrowingRepository,
    private bookRepository: BookRepository
  ) {}

  async borrowBook(userId: number, bookId: number) {
    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error('Book not found');

    const existingBorrowing = await this.borrowingRepository.findFirst({
      where: {
        userId,
        bookId,
        status: {
          in: [Status.PENDING, Status.APPROVED]
        }
      }
    });

    if (existingBorrowing) {
      throw new Error('You already have a pending or approved request for this book');
    }

    const approvedBorrowings = book.borrowings.length;
    if (approvedBorrowings >= book.quantity) {
      throw new Error('Book is not available');
    }

    return this.borrowingRepository.create({ userId, bookId });
  }

  async approveBorrowing(id: number) {
    const borrowing = await this.borrowingRepository.findById(id);
    if (!borrowing) throw new Error('Borrowing request not found');
    if (borrowing.status !== 'PENDING') throw new Error('Borrowing already processed');

    const book = await this.bookRepository.findById(borrowing.bookId);
    if (!book) throw new Error('Book not found');

    const approvedBorrowings = book.borrowings.filter(b => b.status === 'APPROVED').length;
    if (approvedBorrowings >= book.quantity) {
      const pendingRequests = await this.borrowingRepository.findPendingForBook(book.id);
      await Promise.all(
        pendingRequests.map((req: Borrowing) => 
          this.borrowingRepository.updateStatus(req.id, 'REJECTED')
        )
      );
      throw new Error('Book is no longer available');
    }

    await this.borrowingRepository.updateStatus(id, 'APPROVED');

    if (approvedBorrowings + 1 >= book.quantity) {
      const otherPendingRequests = await this.borrowingRepository.findPendingForBook(book.id);
      await Promise.all(
        otherPendingRequests
          .filter(req => req.id !== id)
          .map((req: Borrowing) => 
            this.borrowingRepository.updateStatus(req.id, 'REJECTED')
          )
      );
    }

    return borrowing;
  }

  async getBorrowingHistory(userId: number) {
    return this.borrowingRepository.findByUser(userId);
  }

  async getPendingBorrowings() {
    const books = await this.bookRepository.findAllWithBorrowings();
    return books.filter(book => book.borrowings.length > 0);
  }
} 