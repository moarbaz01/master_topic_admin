import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { SidebarProvider } from "./ui/sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full  flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="md:w-[200px] w-full  fixed lg:sticky top-0 z-20 md:h-screen">
          <Sidebar />
        </div>

        {/* Main Content - Adjusts for sidebar */}
        <main
          className="flex-1 min-h-screen pt-20 sm:pt-0  lg:ml-[100px] xl:ml-[200px] p-4 md:p-6  overflow-y-auto"
          id="main-content"
        >
          <div className="  mx-auto w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
