import { useApp } from "@/lib/app-context";

export function useTheme() {
  const { theme, toggleTheme } = useApp();

  const setTheme = (newTheme: "light" | "dark") => {
    if (newTheme !== theme) {
      toggleTheme();
    }
  };

  return {
    theme,
    setTheme,
  };
}
