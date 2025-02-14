import { create } from "zustand";

interface AppState {
  user: { username: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  login: (username: string, password: string) => {
    if (username === "Ben" && password === "Script@123") {
      const user = { username };
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
