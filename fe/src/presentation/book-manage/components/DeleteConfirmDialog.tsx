import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ยืนยันการลบหนังสือ</DialogTitle>
      <DialogContent>
        <Typography>คุณต้องการลบหนังสือนี้ใช่หรือไม่?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          ลบ
        </Button>
      </DialogActions>
    </Dialog>
  );
};
