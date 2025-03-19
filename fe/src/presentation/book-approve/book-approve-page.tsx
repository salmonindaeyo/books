"use client";
import React, { useState } from "react";
import { useBorrowingList, useBorrowApprove } from "@/data/api/borrow.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { Book, Borrowing } from "@/data/domain/book.domain";
import { toast } from "react-toastify";

export const BookApprovePage = () => {
  const { data: books, isLoading, error, refetch } = useBorrowingList();
  const [selectedBorrowingId, setSelectedBorrowingId] = useState<number | null>(
    null
  );
  const { mutate: approveBorrowing } = useBorrowApprove(selectedBorrowingId);
  const handleApprove = async (borrowing: Borrowing) => {
    setSelectedBorrowingId(borrowing.id);
    console.log("Approved:", borrowing.id);

    approveBorrowing(
      {
        status: "APPROVED",
      },
      {
        onSuccess: () => {
          toast.success("Borrowing approved successfully");
          refetch();
        },
        onError: () => {
          toast.error("Borrowing approval failed");
        },
      }
    );
  };

  const handleReject = async (borrowing: Borrowing) => {
    setSelectedBorrowingId(borrowing.id);
    console.log("Rejected:", borrowing.id);
    approveBorrowing(
      {
        status: "REJECTED",
      },
      {
        onSuccess: () => {
          toast.success("Borrowing rejected successfully");
          refetch();
        },
        onError: () => {
          toast.error("Borrowing rejection failed");
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading borrowings</div>;

  const booksWithPending = books?.filter((book) =>
    book.borrowings.some((borrowing) => borrowing.status === "PENDING")
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book Information</TableCell>
            <TableCell>Pending Requests</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booksWithPending?.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ISBN: {book.isbn}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available: {book.quantity} copies
                </Typography>
              </TableCell>
              <TableCell>
                <Stack spacing={2}>
                  {book.borrowings
                    .filter((borrowing) => borrowing.status === "PENDING")
                    .map((borrowing, index, array) => (
                      <React.Fragment key={borrowing.id}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <div>
                            <Typography variant="body1">
                              {borrowing.user.firstName}{" "}
                              {borrowing.user.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {borrowing.user.email}
                            </Typography>
                          </div>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleApprove(borrowing)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleReject(borrowing)}
                            >
                              Reject
                            </Button>
                          </Stack>
                        </Stack>
                        {index < array.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
