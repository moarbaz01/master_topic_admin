"use client";

import {
  Bell,
  BookOpen,
  GraduationCap,
  Home,
  Images,
  Lightbulb,
  LogOut,
  Menu,
  Tags,
  UploadIcon,
  Users,
  WholeWord,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import WarnModal from "./modals/warn-modal";
import { AuthService } from "@/services/auth";
import { useGetSession, useGetUserById } from "@/queries/user";

// Menu items with notification counts and descriptions
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Overview & Analytics",
    badge: null,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: GraduationCap,
    description: "Manage your courses",
    badge: null,
  },
  {
    title: "Uploads",
    url: "/uploads",
    icon: UploadIcon,
    description: "File management",
    badge: null,
  },
  {
    title: "Vocabularies",
    url: "/vocabs",
    icon: WholeWord,
    description: "Word collections",
    badge: null,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: Lightbulb,
    description: "Interactive assessments",
    badge: "3",
  },
  {
    title: "Tags",
    url: "/tags",
    icon: Tags,
    description: "Content organization",
    badge: null,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    description: "Recent updates",
    badge: "12",
  },
  {
    title: "Books",
    url: "/books",
    icon: BookOpen,
    description: "Digital library",
    badge: null,
  },
  {
    title: "Banners",
    url: "/banners",
    icon: Images,
    description: "Promotional content",
    badge: null,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    description: "User management",
    badge: null,
  },
];

// Mobile Navbar Component
function MobileNavbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <div className="sticky top-0 z-50 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Master ToPik</h1>
          </div>
        </div>
        {/* 
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative h-10 w-10 p-0">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              3
            </Badge>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div> */}
      </div>
    </div>
  );
}

// Animated Menu Item Component
function AnimatedMenuItem({
  item,
  isActive,
  onClick,
}: {
  item: (typeof items)[0];
  isActive: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={item.url} onClick={onClick}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl p-3 transition-all duration-300 ease-out cursor-pointer",
          "hover:bg-accent hover:text-accent-foreground hover:shadow-md ",
          " active:transition-transform active:duration-100",
          isActive
            ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]"
            : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center w-full">
          <div
            className={cn(
              "relative flex items-center justify-center transition-transform duration-300",
              isHovered && "scale-110 rotate-3"
            )}
          >
            <item.icon
              size={20}
              className={cn(
                "transition-colors duration-300",
                isActive ? "text-primary-foreground" : ""
              )}
            />
            {item.badge && (
              <Badge
                className={cn(
                  "absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs transition-transform duration-300",
                  isHovered && "scale-110",
                  isActive
                    ? "bg-primary-foreground text-primary"
                    : "bg-destructive text-destructive-foreground"
                )}
              >
                {item.badge}
              </Badge>
            )}
          </div>

          <div className="ml-3 flex-1 min-w-0">
            <div
              className={cn(
                "text-sm font-semibold transition-colors duration-300",
                isActive ? "text-primary-foreground" : ""
              )}
            >
              {item.title}
            </div>
            <div
              className={cn(
                "text-xs opacity-70 transition-colors duration-300",
                isActive ? "text-primary-foreground/80" : ""
              )}
            >
              {item.description}
            </div>
          </div>

          <ChevronRight
            className={cn(
              "h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1",
              isActive ? "opacity-100 text-primary-foreground" : ""
            )}
          />

          {/* Animated background gradient */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent",
              "translate-x-[-100%] transition-transform duration-700 ease-out",
              isHovered && "translate-x-[100%]"
            )}
          />
        </div>
      </div>
    </Link>
  );
}

// Main Sidebar Component
export function Sidebar() {
  const pathname = usePathname();
  const [logoutModal, setLogoutModal] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useGetSession();
  const { data: user, isLoading } = useGetUserById(session?.id ?? "");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleItemClick = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <MobileNavbar onToggleSidebar={toggleSidebar} />

      {/* Mobile Backdrop */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Base styles with proper height constraints
          "fixed top-0 left-0 z-50 w-80 bg-background border-r shadow-xl transition-transform duration-300 ease-in-out",
          // Height constraints - key fix here
          "h-screen max-h-screen overflow-hidden",
          // Desktop positioning
          "lg:sticky lg:top-0 lg:translate-x-0 lg:z-30 lg:h-screen",
          // Mobile positioning
          isMobile
            ? isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        )}
      >
        {/* Sidebar Layout Container */}
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 border-b lg:hidden flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-lg font-semibold">Master ToPik</h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Sidebar Header - Desktop Only */}
          <div className="hidden lg:block p-4 border-b bg-gradient-to-r from-red-50 to-orange-50 dark:from-blue-950/20 dark:to-purple-950/20 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-400 to-orange-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
                  Master Topic
                </h2>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Sidebar Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {items.map((item) => (
                <AnimatedMenuItem
                  key={item.title}
                  item={item}
                  isActive={pathname == item.url}
                  onClick={handleItemClick}
                />
              ))}

              {/* Logout Button */}
              <div
                className={cn(
                  "group relative overflow-hidden rounded-xl p-3 transition-all duration-300 ease-out cursor-pointer",
                  "hover:bg-destructive hover:text-destructive-foreground hover:shadow-md hover:scale-[1.02]",
                  "active:scale-[0.98] active:transition-transform active:duration-100"
                )}
                onClick={() => setLogoutModal(true)}
              >
                <div className="flex items-center w-full">
                  <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <LogOut
                      size={20}
                      className="transition-colors duration-300"
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="text-sm font-semibold transition-colors duration-300">
                      Logout
                    </div>
                    <div className="text-xs opacity-70 transition-colors duration-300">
                      Sign out of account
                    </div>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Section - Fixed at bottom */}
          <div className="p-3 border-t bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 flex-shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.phone}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>
      </aside>

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
