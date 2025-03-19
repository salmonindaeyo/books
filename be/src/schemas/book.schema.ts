import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, 'กรุณากรอกชื่อหนังสือ'),
  author: z.string().min(1, 'กรุณากรอกชื่อผู้แต่ง'),
  isbn: z.string().min(10, 'ISBN ไม่ถูกต้อง'),
  quantity: z.number().min(1, 'จำนวนหนังสือต้องมากกว่า 0')
});

export const updateBookSchema = createBookSchema.partial(); 