"use client";
import React, { useState } from "react";
import { useBook } from "@/data/api/book.hook";
import { Book } from "@/data/domain/book.domain";
import { Typography, Box, Button } from "@mui/material";
import {
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
} from "@/data/api/book.hook";
import { toast } from "react-toastify";
import { BookTable } from "./components/BookTable";
import { BookFormDialog } from "./components/BookFormDialog";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";

interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
}

export const BookManagePage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const { data: books, isLoading, error, refetch } = useBook();
  const { mutate: createBook } = useCreateBook();
  const { mutate: updateBook } = useUpdateBook(selectedBookId);
  const { mutate: deleteBook } = useDeleteBook(selectedBookId);

  const handleOpenCreate = () => {
    setSelectedBook(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (book: Book) => {
    setSelectedBookId(book.id);
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleOpenDelete = (id: number) => {
    setSelectedBookId(id);
    setDeleteDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setDeleteDialog(false);
    setSelectedBook(null);
    setSelectedBookId(null);
  };

  const onSubmit = (data: BookFormData) => {
    if (selectedBook) {
      updateBook(
        {
          id: selectedBook.id,
          ...data,
        },
        {
          onSuccess: () => {
            toast.success("หนังสือถูกบันทึกเรียบร้อย");
            refetch();
            handleClose();
          },
          onError: (error: any) => {
            toast.error("เกิดข้อผิดพลาดในการบันทึกหนังสือ");
            toast.error(error.response?.data.error as string);
            handleClose();
          },
        }
      );
    } else {
      createBook(data, {
        onSuccess: () => {
          toast.success("หนังสือถูกบันทึกเรียบร้อย");
          refetch();
          handleClose();
        },
        onError: (error: any) => {
          toast.error("เกิดข้อผิดพลาดในการบันทึกหนังสือ");
          toast.error(error.response?.data.error as string);
          handleClose();
        },
      });
    }
  };

  const handleDelete = () => {
    deleteBook(selectedBookId, {
      onSuccess: () => {
        toast.success("หนังสือถูกลบเรียบร้อย");
        refetch();
        handleClose();
      },
      onError: (error: any) => {
        toast.error("เกิดข้อผิดพลาดในการลบหนังสือ");
        toast.error(error.response?.data.error as string);
        handleClose();
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <Box sx={{ p: 10, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
          จัดการหนังสือ
        </Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          เพิ่มหนังสือ
        </Button>
      </Box>

      <BookTable
        books={books || []}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <BookFormDialog
        open={openDialog}
        onClose={handleClose}
        onSubmit={onSubmit}
        selectedBook={selectedBook}
      />

      <DeleteConfirmDialog
        open={deleteDialog}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </Box>
  );
};
