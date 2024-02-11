import { getServerAuthSession } from "@/server/auth";
import { RedirectType, redirect } from "next/navigation";
import { type ReactNode } from "react";
import { FooterPlayer } from "@/app/_components/footer-player";

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

  return (
    <div className="relative pb-[100px]">
      {children}
      <FooterPlayer />
    </div>
  );
}
