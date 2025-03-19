import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LoginResponse, User } from "../domain/auth.domain";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  setAuth: (auth: LoginResponse) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

const authStore = create<AuthState>()(
  devtools(
    (set) => ({
      token: null,
      user: null,
      isLoading: true,
      setAuth: (auth) => set({ token: auth.token, user: auth.user }),
      clearAuth: () => set({ token: null, user: null }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'Auth Store',
    }
  )
);

// ฟังก์ชันสำหรับ initialize store จาก localStorage
export const initializeAuthStore = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const auth = JSON.parse(savedAuth) as LoginResponse;
      authStore.getState().setAuth(auth);
    }
  } catch (error) {
    console.error('Failed to initialize auth store:', error);
  } finally {
    authStore.getState().setLoading(false);
  }
};

export default authStore; 