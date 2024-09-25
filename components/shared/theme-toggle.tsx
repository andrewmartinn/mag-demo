"use client";

import { useEffect, useState } from "react";
import SystemIcon from "@/assets/icons/system-icon";
import SunIcon from "@/assets/icons/sun-icon";
import MoonIcon from "@/assets/icons/moon-icon";
import { Button } from "../ui/button";

type Theme = "light" | "dark" | "system";

type ThemeIcon = {
  key: Theme;
  icon: JSX.Element;
};

const iconMap: ThemeIcon[] = [
  { key: "system", icon: <SystemIcon /> },
  { key: "light", icon: <SunIcon /> },
  { key: "dark", icon: <MoonIcon /> },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const localTheme = (window.localStorage.getItem("theme") as Theme) || null;
    if (localTheme) {
      setTheme(localTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else if (theme === "light") {
      document.body.classList.remove("dark");
    } else if (theme === "system") {
      document.body.classList.remove("dark");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      };
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, [theme]);

  const toggleTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    window.localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className="relative">
      <div className="flex h-[24px] items-center justify-between gap-1 rounded-full bg-neutral-200 px-2 py-1 dark:bg-neutral-600">
        {iconMap.map(({ key, icon }) => (
          <Button
            size="icon"
            variant="outline"
            key={key}
            onClick={() => toggleTheme(key)}
            className="flex h-5 w-5 cursor-pointer items-center border-none bg-neutral-200 shadow-none hover:bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600"
          >
            {icon}
          </Button>
        ))}
      </div>
      <div
        className={`absolute bottom-1 left-0 h-[1.1px] bg-primary-400 transition-all duration-300`}
        style={{
          width: "14%",
          transform: `translateX(${theme === "light" ? "314%" : theme === "dark" ? "510%" : "100%"})`,
        }}
      />
    </div>
  );
}
