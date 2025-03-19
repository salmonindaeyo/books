import { z } from 'zod';
import { Status } from '../models/borrowing.model';

export const borrowBookSchema = z.object({
  bookId: z.number().positive('รหัสหนังสือไม่ถูกต้อง')
});

export const updateBorrowingSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED'] as const)
}); 