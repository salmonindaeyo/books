"use client";
import React from "react";
import { useBorrowHistory } from "@/data/api/borrow.hook";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { format } from "date-fns";

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "error";
    default:
      return "warning";
  }
};

export const BorrowHistoryPage = () => {
  const { data: borrowHistory, isLoading, error } = useBorrowHistory();

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box p={2}>
        <Alert severity="error">Error loading borrow history</Alert>
      </Box>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Borrowing History
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requested Date</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowHistory?.map((history) => (
              <TableRow key={history.id} hover>
                <TableCell>{history.book.title}</TableCell>
                <TableCell>{history.book.author}</TableCell>
                <TableCell>{history.book.isbn}</TableCell>
                <TableCell>
                  <Chip
                    label={history.status}
                    color={getStatusColor(history.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {format(new Date(history.createdAt), "PPp")}
                </TableCell>
                <TableCell>
                  {format(new Date(history.updatedAt), "PPp")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
