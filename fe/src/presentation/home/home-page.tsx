"use client";
import React, { useState } from "react";
import { Container, Alert } from "@mui/material";
import { toast } from "react-toastify";
import { Book } from "@/data/domain/book.domain";
import { useBorrowing } from "@/data/api/borrow.hook";
import { useBook } from "@/data/api/book.hook";
import { BookCard } from "@/presentation/home/components/BookCard";
import { BorrowingModal } from "@/presentation/home/components/BorrowingModal";
import { LoadingSpinner } from "@/core/components/LoadingSpinner";

export const HomePage = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data: books, isLoading, error, refetch } = useBook();
  const { mutate: borrowBook } = useBorrowing();

  const handleOpenModal = (book: Book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBook(null);
  };

  function handleBorrowBook(bookId: number) {
    borrowBook(
      { bookId },
      {
        onSuccess: () => {
          toast.success("Book borrowed successfully 🎉");
          refetch();
        },
        onError: (error: any) => {
          console.log(error.response?.data.error);
          toast.error(error.response?.data.error as string);
        },
      }
    );
  }

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Container>
    );

  return (
    <div className="w-full h-screen flex flex-col p-10">
      <div className="text-2xl font-bold text-black mb-4">Books</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books?.map((book: Book) => (
          <BookCard
            book={book}
            onBorrow={handleBorrowBook}
            onOpenDetails={handleOpenModal}
            key={book.id}
          />
        ))}
      </div>

      <BorrowingModal
        open={openModal}
        onClose={handleCloseModal}
        selectedBook={selectedBook}
      />
    </div>
  );
};
