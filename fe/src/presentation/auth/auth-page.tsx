"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginBody } from "@/data/domain/auth.domain";
import { useLogin } from "@/data/api/user.hook";
import { useRouter } from "next/navigation";
import authStore from "@/data/store/auth.store";

export function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>();
  const login = useLogin();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: LoginBody) => {
    try {
      const response = await login.mutateAsync(data);
      localStorage.setItem("auth", JSON.stringify(response.data));
      authStore.getState().setAuth(response.data);
      router.push("/");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  if (!isMounted) return null;
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box textAlign="center">
            <Typography variant="h4" color="primary" gutterBottom>
              ระบบยืมหนังสือ
            </Typography>
            <Typography variant="h5" color="text.secondary">
              เข้าสู่ระบบ
            </Typography>
          </Box>

          {login.isError && (
            <Alert severity="error">
              เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง
            </Alert>
          )}

          <TextField
            label="อีเมล"
            fullWidth
            {...register("email", { required: "กรุณากรอกอีเมล" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="รหัสผ่าน"
            type="password"
            fullWidth
            {...register("password", { required: "กรุณากรอกรหัสผ่าน" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={login.isPending}
          >
            {login.isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
