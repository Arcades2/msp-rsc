import { getServerAuthSession } from "@/server/auth";
import { RedirectType, redirect } from "next/navigation";
import { type ReactNode } from "react";

export type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login", RedirectType.replace);
  }

  return <>{children}</>;
}
