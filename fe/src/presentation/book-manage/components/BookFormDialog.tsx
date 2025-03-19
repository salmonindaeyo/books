import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Book } from "@/data/domain/book.domain";

interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
}

interface BookFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookFormData) => void;
  selectedBook: Book | null;
}

export const BookFormDialog: React.FC<BookFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  selectedBook,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    defaultValues: selectedBook
      ? {
          title: selectedBook.title,
          author: selectedBook.author,
          isbn: selectedBook.isbn,
          quantity: selectedBook.quantity,
        }
      : undefined,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {selectedBook ? "แก้ไขหนังสือ" : "เพิ่มหนังสือ"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            {...register("title", {
              required: "กรุณากรอกชื่อหนังสือ",
            })}
            label="ชื่อหนังสือ"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            {...register("author", {
              required: "กรุณากรอกชื่อผู้แต่ง",
            })}
            label="ผู้แต่ง"
            fullWidth
            margin="normal"
            error={!!errors.author}
            helperText={errors.author?.message}
          />
          <TextField
            {...register("isbn", {
              required: "กรุณากรอก ISBN",
              minLength: {
                value: 10,
                message: "ISBN ไม่ถูกต้อง ต้องมีอย่างน้อย 10 หลัก",
              },
            })}
            type="number"
            label="ISBN"
            fullWidth
            margin="normal"
            error={!!errors.isbn}
            helperText={errors.isbn?.message}
          />
          <TextField
            {...register("quantity", {
              required: "กรุณากรอกจำนวน",
              min: {
                value: 1,
                message: "จำนวนหนังสือต้องมากกว่า 0",
              },
              valueAsNumber: true,
            })}
            label="จำนวน"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button type="submit" variant="contained">
            {selectedBook ? "แก้ไข" : "เพิ่ม"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
