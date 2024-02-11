"use client";

import { SessionProvider } from "next-auth/react";
import { type ComponentProps, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export type ProvidersProps = {
  children: ReactNode;
  Session: Omit<ComponentProps<typeof SessionProvider>, "children">;
  Theme: Omit<ComponentProps<typeof NextThemesProvider>, "children">;
};

export function Providers({ children, Session, Theme }: ProvidersProps) {
  return (
    <SessionProvider {...Session}>
      <NextThemesProvider {...Theme}>{children}</NextThemesProvider>
    </SessionProvider>
  );
}
