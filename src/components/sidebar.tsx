"use client";
import {
  Bell,
  BookOpen,
  GraduationCap,
  Home,
  Lightbulb,
  LogOut,
  Tags,
  UploadIcon,
  Users,
  WholeWord,
} from "lucide-react";

import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import WarnModal from "./modals/warn-modal";
import { AuthService } from "@/services/auth";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: GraduationCap,
  },
  {
    title: "Uploads",
    url: "/uploads",
    icon: UploadIcon,
  },
  {
    title: "Vocabularies",
    url: "/vocabs",
    icon: WholeWord,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: Lightbulb,
  },
  {
    title: "Tags",
    url: "/tags",
    icon: Tags,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },{
    title: "Books",
    url: "/books",
    icon: BookOpen,
  },

  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <nav aria-label="Main navigation ">
        <UISidebar
          variant="floating"
          className={`fixed lg:sticky   transform transition-transform duration-200  ease-in-out `}
        >
          <SidebarContent className="py-4 px-2   ">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-4">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        data-active={pathname === item.url}
                        className="py-4"
                      >
                        {item.title === "Logout" ? (
                          <div onClick={() => setLogoutModal(true)}>
                            <item.icon size={32} />
                            <span className="text-lg  font-semibold  pl-2">
                              {item.title}
                            </span>
                          </div>
                        ) : (
                          <Link href={item.url}>
                            <item.icon size={32} />
                            <span className="text-lg font-semibold pl-2">
                              {item.title}
                            </span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </UISidebar>
      </nav>

      <WarnModal
        title="Do you want to logout?"
        desc="Are you sure you want to logout? You will be redirected to the login page"
        open={logoutModal}
        onClose={() => setLogoutModal(false)}
        onC={() => {
          AuthService.signOut();
          setLogoutModal(false);
        }}
      />
    </>
  );
}
