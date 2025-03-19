"use client";
import { useScrollSmooth } from "@/core/libs/useScrollSmooth";

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useScrollSmooth();
  return <>{children}</>;
};
