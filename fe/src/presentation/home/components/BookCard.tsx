import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Book } from "@/data/domain/book.domain";

interface BookCardProps {
  book: Book;
  onBorrow: (bookId: number) => void;
  onOpenDetails: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onBorrow,
  onOpenDetails,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          noWrap
          sx={{ fontSize: "1rem" }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          noWrap
        >
          {book.author}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mb: 1 }}
        >
          ISBN: {book.isbn}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          <Chip
            label={`${book.quantity} copies`}
            color="primary"
            size="small"
            sx={{ fontSize: "0.75rem" }}
          />
          <Chip
            label={book.available ? "Available" : "Not Available"}
            color={book.available ? "success" : "error"}
            size="small"
            sx={{ fontSize: "0.75rem" }}
          />
          <IconButton
            size="small"
            color="primary"
            onClick={() => onOpenDetails(book)}
            sx={{ ml: "auto" }}
          >
            <InfoIcon fontSize="small" />
            สถานะ
          </IconButton>
        </Box>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onBorrow(book.id)}
      >
        ขอยืมหนังสือ
      </Button>
    </Card>
  );
};
