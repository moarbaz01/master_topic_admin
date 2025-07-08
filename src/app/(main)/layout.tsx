import MainLayout from "@/components/main-layout";
import { ReactNode } from "react";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
