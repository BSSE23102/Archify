import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "../components/navbar";
import {
  getCurrentUser,
  signIn as puterSignInAction,
  signOut as puterSignOutAction,
} from "../lib/puter.action";
import { useEffect, useState } from "react";
import {
  AuthContext,
  type AuthContextValue,
} from "./auth-context";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const DEFAULT_AUTH_STATE: AuthState = {
  isSignedIn: false,
  username: null,
  userId: null,
};

export default function App() {
  const [authState, setAuthState] = useState<AuthState>(DEFAULT_AUTH_STATE);

  const refreshAuth = async () => {
    try {
      const user = await getCurrentUser();
      const u = user as { username?: string; id?: string; uuid?: string } | null;
      setAuthState({
        isSignedIn: !!user,
        username: u?.username ?? null,
        userId: u?.id ?? u?.uuid ?? null,
      });
      return !!user;
    } catch {
      setAuthState(DEFAULT_AUTH_STATE);
      return false;
    }
  };

  useEffect(() => {
    void refreshAuth();
  }, []);

  const signIn = async () => {
    try {
      await puterSignInAction();
      await refreshAuth();
    } catch {
      return false;
    }
  };

  const signOut = async () => {
    try {
      await puterSignOutAction();
      await refreshAuth();
    } catch {
      return false;
    }
  };

  const authValue: AuthContextValue = {
    ...authState,
    refreshAuth,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Archify</h1>
        <Outlet context={authValue} />
      </main>
    </AuthContext.Provider>
  );
}
