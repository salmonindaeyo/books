import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // สร้าง users
  const hashedPassword = await bcrypt.hash('123456', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'user@mail.com' },
    update: {},
    create: {
      email: 'user@mail.com',
      password: hashedPassword,
      firstName: 'Normal',
      lastName: 'User',
      phone: '0811111111',
      role: 'USER'
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@mail.com' },
    update: {},
    create: {
      email: 'admin@mail.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '0822222222',
      role: 'ADMIN'
    },
  })

  // สร้าง books
  const book1 = await prisma.book.create({
    data: {
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      isbn: '9780747532699',
      quantity: 2,
    },
  })

  const book2 = await prisma.book.create({
    data: {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      isbn: '9780544003415',
      quantity: 1,
    },
  })

  const book3 = await prisma.book.create({
    data: {
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      quantity: 3,
    },
  })

  // สร้าง borrowings
  await prisma.borrowing.createMany({
    data: [
      {
        userId: user.id,
        bookId: book1.id,
        status: 'APPROVED',
      },
      {
        userId: user.id,
        bookId: book2.id,
        status: 'PENDING',
      },
      {
        userId: admin.id,
        bookId: book3.id,
        status: 'REJECTED',
      },
    ],
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 