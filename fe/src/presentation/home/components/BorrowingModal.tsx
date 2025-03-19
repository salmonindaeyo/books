import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { Book, Borrowing } from "@/data/domain/book.domain";

interface BorrowingModalProps {
  open: boolean;
  onClose: () => void;
  selectedBook: Book | null;
}

export const BorrowingModal: React.FC<BorrowingModalProps> = ({
  open,
  onClose,
  selectedBook,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="borrowing-details-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: "black" }}
          gutterBottom
        >
          รายละเอียดการยืม: {selectedBook?.title}
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>รหัสการยืม</TableCell>
                <TableCell>ชื่อ</TableCell>
                <TableCell>นามสกุล</TableCell>
                <TableCell>สถานะ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedBook?.borrowings.map((borrowing: Borrowing) => (
                <TableRow key={borrowing.id}>
                  <TableCell>{borrowing.id}</TableCell>
                  <TableCell>{borrowing.user.firstName}</TableCell>
                  <TableCell>{borrowing.user.lastName}</TableCell>
                  <TableCell>
                    <Chip
                      label={borrowing.status}
                      color={
                        borrowing.status === "APPROVED"
                          ? "success"
                          : borrowing.status === "PENDING"
                          ? "warning"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {selectedBook?.borrowings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    ไม่มีประวัติการยืม
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>ปิด</Button>
        </Box>
      </Box>
    </Modal>
  );
};
