import MainLayout from "@/components/main-layout";
import { Providers } from "@/components/providers";
import { ReactNode } from "react";

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <Providers>{children}</Providers>
    </MainLayout>
  );
}
