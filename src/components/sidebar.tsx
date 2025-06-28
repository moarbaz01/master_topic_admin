"use client";
import {
  Bell,
  CreditCard,
  GraduationCap,
  Home,
  Lightbulb,
  LogOut,
  Tags,
  UploadIcon,
  Users,
} from "lucide-react";

import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthService } from "../services/auth.service";
import { Card } from "./ui/card";

// Menu items.
const items = [
  {
    title: "Home",
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
  },
  {
    title: "Subscription",
    url: "/subscriptions",
    icon: CreditCard,
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

  return (
    <>
      {/* Sidebar */}
      <nav aria-label="Main navigation ">
        <UISidebar
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
                          <div onClick={AuthService.signOut}>
                            <item.icon className="text-lg" />
                            <span className="text-lg pl-2">{item.title}</span>
                          </div>
                        ) : (
                          <Link href={item.url}>
                            <item.icon className="text-lg" />
                            <span className="text-lg pl-2">{item.title}</span>
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
    </>
  );
}
