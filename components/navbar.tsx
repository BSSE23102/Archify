import React from "react";
import { ArrowRight, Box, ChevronDown } from "lucide-react";

function Navbar() {
  const isSignedIn = true;
  const username = "shehroz";

  return (
    <header className="w-full flex justify-center pt-6 px-4">
      <nav
        className="relative flex w-full max-w-6xl items-center justify-between rounded-full bg-white/95 px-5 md:px-8 py-3 md:py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur"
        aria-label="Archify main navigation"
      >
        {/* Left section: primary nav links */}
        <div className="flex items-center gap-4 md:gap-6 text-sm text-slate-700">
          <button className="inline-flex items-center gap-1 font-medium text-slate-900 hover:text-slate-950 transition-colors">
            <span>Features</span>
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>

          <button className="hidden md:inline-flex text-slate-600 hover:text-slate-900 transition-colors">
            About
          </button>

          <button className="hidden md:inline-flex text-slate-600 hover:text-slate-900 transition-colors">
            Contact
          </button>
        </div>

        {/* Center: Archify brand */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 sm:flex">
          <Box className="logo"/>
          <span className="text-base font-semibold tracking-tight text-slate-900 select-none">
            Archify
          </span>
        </div>

        {/* Right section: auth + CTA */}
        <div className="flex flex-1 items-center justify-end gap-3 text-sm">
          {isSignedIn ? (
            <>
              <span className="hidden sm:inline text-slate-600">
                Hi, <span className="font-medium text-slate-900">{username}</span>
              </span>
              <button
                className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                onClick={() => {}}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                className="text-slate-700 hover:text-slate-900 transition-colors"
                onClick={() => {}}
              >
                Login
              </button>

              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 md:px-5 py-2 text-sm font-medium text-white shadow-[0_14px_35px_rgba(16,185,129,0.55)] hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
                aria-label="See a demo of how Archify converts 2D blueprints into photorealistic 3D renders with permanent hosting and persistent metadata"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;