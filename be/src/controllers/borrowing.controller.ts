import { Request, Response } from 'express';
import { BorrowingService } from '../services/borrowing.service';
import { BorrowingRepository } from '../repositories/borrowing.repository';
import { BookRepository } from '../repositories/book.repository';

const borrowingRepository = new BorrowingRepository();
const bookRepository = new BookRepository();
const borrowingService = new BorrowingService(borrowingRepository, bookRepository);

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.body;
    const userId = req.user!.userId;
    
    const borrowing = await borrowingService.borrowBook(userId, bookId);
    res.status(201).json(borrowing);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Failed to borrow book' });
    }
  }
};

export const approveBorrowing = async (req: Request, res: Response) => {
  try {
    const borrowing = await borrowingService.approveBorrowing(Number(req.params.id));
    res.json(borrowing);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to approve borrowing' });
    }
  }
};

export const getBorrowingHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const history = await borrowingService.getBorrowingHistory(userId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch borrowing history' });
  }
};

export const getPendingBorrowings = async (req: Request, res: Response) => {
  try {
    const pendingBooks = await borrowingService.getPendingBorrowings();
    res.json(pendingBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending borrowings' });
  }
}; 