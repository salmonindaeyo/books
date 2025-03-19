import { PrismaClient, Status } from '@prisma/client';
import { BorrowingCreateInput } from '../models/borrowing.model';
import prisma from '../config/database';

export class BorrowingRepository {
  async create(data: BorrowingCreateInput) {
    return prisma.borrowing.create({ data });
  }

  async findById(id: number) {
    return prisma.borrowing.findUnique({
      where: { id },
      include: {
        book: true
      }
    });
  }

  async findByUser(userId: number) {
    return prisma.borrowing.findMany({
      where: { userId },
      include: {
        book: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async updateStatus(id: number, status: Status) {
    return prisma.borrowing.update({
      where: { id },
      data: { status }
    });
  }

  async findPendingForBook(bookId: number) {
    return prisma.borrowing.findMany({
      where: {
        bookId,
        status: Status.PENDING
      }
    });
  }

  async findFirst(params: { where: { userId: number; bookId: number; status: { in: Status[] } } }) {
    return prisma.borrowing.findFirst(params);
  }
} 