import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { SidebarProvider } from "./ui/sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full  flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="w-[200px] fixed lg:sticky top-0 z-20 h-screen">
          <Sidebar />
        </div>

        {/* Main Content - Adjusts for sidebar */}
        <main
          className="flex-1 min-h-screen lg:ml-[200px] p-4 md:p-6  overflow-y-auto"
          id="main-content"
        >
          <div className="  mx-auto w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
