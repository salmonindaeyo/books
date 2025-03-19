import { Router } from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createBookSchema, updateBookSchema } from '../schemas/book.schema';
import { 
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getAllBooksWithBorrowStatus
} from '../controllers/book.controller';

const router = Router();

router.get('/', authenticate, getAllBooks);
router.get('/with-status', authenticate, getAllBooksWithBorrowStatus);
router.get('/:id', authenticate, getBookById);
router.post('/', authenticate, authorizeAdmin, validate(createBookSchema), createBook);
router.put('/:id', authenticate, authorizeAdmin, validate(updateBookSchema), updateBook);
router.delete('/:id', authenticate, authorizeAdmin, deleteBook);

export default router; 