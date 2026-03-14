import React, { useContext, useEffect, useState } from "react";
import {
  ArrowRight,
  Box,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { AuthContext } from "../app/auth-context";

function Navbar() {
  const ctx = useContext(AuthContext);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("archify-theme", next);
    } catch {
      /* ignore */
    }
  };

  const isSignedIn = ctx?.isSignedIn ?? false;
  const username = ctx?.username ?? null;

  const handleAuthClick = async () => {
    if (!ctx) return;
    if (isSignedIn) {
      try {
        await ctx.signOut?.();
      } catch (e) {
        console.error(`Puter sign out failed: ${e}`);
      }
    } else {
      try {
        await ctx.signIn?.();
      } catch (e) {
        console.error(`Puter sign in failed: ${e}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 md:pt-6">
      <nav
        className="relative flex w-full max-w-6xl items-center justify-between rounded-full border border-zinc-200/80 bg-white/80 px-4 py-2.5 shadow-lg shadow-zinc-200/50 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/40 md:px-8 md:py-3"
        aria-label="Archify main navigation"
      >
        <div className="flex items-center gap-3 md:gap-6 text-sm">
          <a
            href="#features"
            className="hidden items-center gap-1 font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white md:inline-flex"
          >
            Features
            <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />
          </a>
          <a
            href="#how-it-works"
            className="hidden text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white md:inline"
          >
            How it works
          </a>
          <a
            href="#community"
            className="hidden text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white lg:inline"
          >
            Community
          </a>
        </div>

        <a
          href="/"
          className="pointer-events-auto absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
        >
          <Box
            className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
            aria-hidden
            strokeWidth={1.5}
          />
          <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
            Archify
          </span>
        </a>

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden />
            ) : (
              <Moon className="h-4 w-4" aria-hidden />
            )}
          </button>
          {isSignedIn ? (
            <>
              <span className="hidden max-w-[100px] truncate text-zinc-600 dark:text-zinc-400 sm:inline">
                <span className="font-medium text-zinc-900 dark:text-zinc-200">
                  {username ?? "there"}
                </span>
              </span>
              <button
                type="button"
                className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10 md:px-4 md:text-sm"
                onClick={handleAuthClick}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                onClick={handleAuthClick}
              >
                Login
              </button>
              <a
                href="#generate"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 md:gap-2 md:px-5 md:py-2 md:text-sm"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
