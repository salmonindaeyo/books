"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import {
  Home as HomeIcon,
  Book as BookIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import authStore from "@/data/store/auth.store";
import { useRouter } from "next/navigation";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ScheduleIcon from "@mui/icons-material/Schedule";
const DRAWER_WIDTH = 240;

interface NavbarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  role: string;
}

export const Navbar = () => {
  const { user, clearAuth } = authStore();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems: NavbarItem[] = [
    {
      name: "หน้าหลัก",
      href: "/",
      icon: <HomeIcon />,
      role: "USER",
    },
    {
      name: "ประวัติการยืมหนังสือ",
      href: "/borrow-history",
      icon: <ScheduleIcon />,
      role: "USER",
    },
    {
      name: "จัดการหนังสือ",
      href: "/book-manage",
      icon: <BookIcon />,
      role: "ADMIN",
    },
    {
      name: "จัดการยืมหนังสือ",
      href: "/book-approve",
      icon: <FactCheckIcon />,
      role: "ADMIN",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth");
    clearAuth();
    router.push("/auth");
  };

  if (!isMounted) return null;
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ระบบยืมหนังสือ
        </Typography>
      </Box>

      <Divider />

      {user && (
        <Box sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Divider />

      <List>
        {navItems
          .filter((item) => {
            if (user?.role === "ADMIN") return true;
            return item.role === user?.role;
          })
          .map((item) => (
            <ListItem
              key={item.name}
              component={Link}
              href={item.href}
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          ออกจากระบบ
        </Button>
      </Box>
    </Drawer>
  );
};
