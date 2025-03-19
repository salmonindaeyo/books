import { PrismaClient } from '@prisma/client';
import { BookCreateInput, BookUpdateInput } from '../models/book.model';
import prisma from '../config/database';

export class BookRepository {
  async create(data: BookCreateInput) {
    return prisma.book.create({ data });
  }

  async findAll(params?: any) {
    return prisma.book.findMany({
      ...params,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id: number) {
    return prisma.book.findUnique({
      where: { id },
      include: {
        borrowings: {
          select: {
            id: true,
            status: true,
            userId: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        }
      }
    });
  }

  async update(id: number, data: BookUpdateInput) {
    return prisma.book.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return prisma.book.delete({
      where: { id }
    });
  }

  async findAllWithBorrowings() {
    return prisma.book.findMany({
      include: {
        borrowings: {
          select: {
            id: true,
            status: true,
            userId: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        }
      }
    });
  }
} 