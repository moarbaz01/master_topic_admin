import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TransparentLoader({
  className,
  message = "Loading...",
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm text-white",
        className
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin mb-2" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
