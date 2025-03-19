import { BookRepository } from '../repositories/book.repository';
import { BookCreateInput, BookUpdateInput, BookWithBorrowings } from '../models/book.model';

export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async createBook(data: BookCreateInput) {
    return this.bookRepository.create(data);
  }

  async getAllBooks() {
    const books = await this.bookRepository.findAllWithBorrowings();
    return books.map((book: BookWithBorrowings) => ({
      ...book,
      available: book.borrowings.filter(b => b.status === 'APPROVED').length < book.quantity,
      borrowings: book.borrowings.map(borrow => ({
        id: borrow.id,
        status: borrow.status,
        userId: borrow.userId,
        user: borrow.user
      }))
    }));
  }

  async getBookById(id: number) {
    const book = await this.bookRepository.findById(id) as BookWithBorrowings;
    if (!book) throw new Error('Book not found');
    
    return {
      ...book,
      available: book.borrowings.length < book.quantity
    };
  }

  async updateBook(id: number, data: BookUpdateInput) {
    await this.getBookById(id); // Verify book exists
    return this.bookRepository.update(id, data);
  }

  async deleteBook(id: number) {
    await this.getBookById(id); // Verify book exists
    return this.bookRepository.delete(id);
  }

  async getAllBooksWithBorrowStatus() {
    const books = await this.bookRepository.findAllWithBorrowings();
    return books.map(book => ({
      ...book,
      available: book.borrowings.length < book.quantity,
      borrowings: book.borrowings.map(borrow => ({
        id: borrow.id,
        status: borrow.status,
        user: borrow.user
      }))
    }));
  }
} 