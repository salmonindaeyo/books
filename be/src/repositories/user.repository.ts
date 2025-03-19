import { PrismaClient } from '@prisma/client';
import { UserCreateInput } from '../models/user.model';
import prisma from '../config/database';

export class UserRepository {
  async create(userData: UserCreateInput) {
    return prisma.user.create({
      data: userData,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
} 