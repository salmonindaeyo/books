import { Router } from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { borrowBookSchema, updateBorrowingSchema } from '../schemas/borrowing.schema';
import {
  borrowBook,
  approveBorrowing,
  getBorrowingHistory,
  getPendingBorrowings,
} from '../controllers/borrowing.controller';

const router = Router();

router.post('/', authenticate, validate(borrowBookSchema), borrowBook);
router.put('/:id/approve', authenticate, authorizeAdmin, validate(updateBorrowingSchema), approveBorrowing);
router.get('/history', authenticate, getBorrowingHistory);
router.get('/pending', authenticate, authorizeAdmin, getPendingBorrowings);

export default router; 