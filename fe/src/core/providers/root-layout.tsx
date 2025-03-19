"use client";
import { Box, CircularProgress } from "@mui/material";
import { Navbar } from "../components/navbar";
import { useEffect } from "react";
import { initializeAuthStore } from "@/data/store/auth.store";
import authStore from "@/data/store/auth.store";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const PUBLIC_PATHS = ["/auth"];

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = authStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    initializeAuthStore();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!PUBLIC_PATHS.includes(pathname) && !user) {
        router.push("/auth");
      } else if (PUBLIC_PATHS.includes(pathname) && user) {
        router.push("/");
      }
    }
  }, [isLoading, user, pathname, router]);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <ToastContainer />
      {children}
    </Box>
  );
}
