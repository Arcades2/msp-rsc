"use client";

import { SessionProvider } from "next-auth/react";
import { type ComponentProps, type ReactNode } from "react";

export type ProvidersProps = {
  children: ReactNode;
  session: ComponentProps<typeof SessionProvider>["session"];
};

export function Providers({ children, session }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
