"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, ChevronRight, Folder, FileText } from "lucide-react";

// Route configurations for better labeling and icons
const routeConfig = {
  "": { label: "Dashboard", icon: Home },
  courses: { label: "Courses", icon: Folder },
  quizzes: { label: "Quizzes", icon: FileText },
  vocabs: { label: "Vocabularies", icon: Folder },
  users: { label: "Users", icon: Folder },
  uploads: { label: "Media Library", icon: Folder },
  tags: { label: "Tags", icon: Folder },
  books: { label: "Books", icon: Folder },
  banners: { label: "Banners", icon: Folder },
  notifications: { label: "Notifications", icon: Folder },
  new: { label: "Create New", icon: FileText },
  edit: { label: "Edit", icon: FileText },
};

export function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const decodedSegment = decodeURIComponent(segment);

    // Get configuration or create default
    const config = routeConfig[decodedSegment as keyof typeof routeConfig] || {
      label: decodedSegment.replace(/-/g, " ").replace(/_/g, " "),
      icon: FileText,
    };

    // Handle dynamic routes (IDs, etc.)
    const isId =
      /^[a-f0-9-]{8,}$/i.test(decodedSegment) || /^\d+$/.test(decodedSegment);
    const displayLabel = isId
      ? `ID: ${decodedSegment.slice(0, 8)}...`
      : config.label;

    return {
      href,
      label: displayLabel,
      icon: config.icon,
      isLast,
      isId,
      segment: decodedSegment,
    };
  });

  return (
    <nav
      className={cn(
        "md:flex hidden items-center w-fit gap-1 text-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg px-3 py-2 shadow-sm",
        className
      )}
      aria-label="Breadcrumb"
    >
      {/* Home Link */}
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-200",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
          pathname === "/"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Home className="w-4 h-4" />
        <span className="font-medium">Home</span>
      </Link>

      {/* Breadcrumb Items */}
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1">
          {/* Separator */}
          <ChevronRight className="w-4 h-4 text-muted-foreground/50 mx-1" />

          {/* Breadcrumb Item */}
          {item.isLast ? (
            <div className="flex items-center gap-2 px-2 py-1.5 bg-muted rounded-md">
              <item.icon className="w-4 h-4 text-muted-foreground" />
              <span
                className="font-medium text-foreground capitalize truncate max-w-[150px]"
                title={item.label}
              >
                {item.label}
              </span>
            </div>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span
                className="font-medium capitalize truncate max-w-[120px]"
                title={item.label}
              >
                {item.label}
              </span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
