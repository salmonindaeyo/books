"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { NavProvider } from "@/data/contexts/nav-context";
import { SmoothScrollProvider } from "@/core/providers/smooth-scroll-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/core/libs/react-query";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <NavProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </NavProvider>
      </ParallaxProvider>
    </QueryClientProvider>
  );
}
