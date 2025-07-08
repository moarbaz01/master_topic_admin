import { cn } from "@/lib/utils";
import Loader from "./ui/loader";

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
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray/10 backdrop-blur-sm ",
        className
      )}
    >
      <Loader label={message} />
    </div>
  );
}
