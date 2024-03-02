import { Moon, Sun } from "react-feather";
import { useLocalStorage } from "@/utils/local-storage";
import { useState, useEffect } from "react";

export type lightOrDark = "light" | "dark";

export const DarkmodeToggle = () => {
  const [onClient, setOnClient] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage<lightOrDark>(
    "theme",
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? ("dark" as lightOrDark)
      : ("light" as lightOrDark) || ("light" as lightOrDark),
  );

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    }
  });
  // this is only necceary for the client because of SSR -.-
  useEffect(() => {
    setOnClient(true);
  }, []);

  const toggleDarkMode = () => {
    const theme: lightOrDark = darkMode === "light" ? "dark" : "light";
    setDarkMode(theme);
    //actually set the dark mode
    if (darkMode === "dark") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        onChange={toggleDarkMode}
        checked={darkMode === "dark"}
      />
      {onClient ? (
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full">
          {darkMode === "light" ? (
            <Sun className="float-right mr-1 w-4" />
          ) : (
            <Moon className="ml-1 w-4" />
          )}
        </div>
      ) : null}
    </label>
  );
};
