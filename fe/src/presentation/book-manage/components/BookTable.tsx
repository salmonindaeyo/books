import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Book } from "@/data/domain/book.domain";

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export const BookTable: React.FC<BookTableProps> = ({
  books,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ชื่อหนังสือ</TableCell>
            <TableCell>ผู้แต่ง</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>จำนวน</TableCell>
            <TableCell>สถานะ</TableCell>
            <TableCell>จัดการ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.quantity}</TableCell>
              <TableCell>
                {book.available ? "พร้อมใช้งาน" : "ไม่พร้อมใช้งาน"}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(book)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(book.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
