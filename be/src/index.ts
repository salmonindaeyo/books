import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import borrowingRoutes from './routes/borrowing.routes';

const app = express();

console.log('🚀 Server starting...');
connectDatabase();

app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrowings', borrowingRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📝 Endpoints:');
  console.log('   POST /auth/register');
  console.log('   POST /auth/login');
  console.log('   GET /books');
  console.log('   GET /books/:id');
  console.log('   POST /books');
  console.log('   PUT /books/:id');
  console.log('   DELETE /books/:id');
  console.log('   POST /borrowings');
  console.log('   PUT /borrowings/:id/approve');  
  console.log('   GET /borrowings/history');
  console.log('=================================');
}); 