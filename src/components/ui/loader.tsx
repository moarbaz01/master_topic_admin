import { RefreshCw } from "lucide-react";

const Loader = ({ label }: { label?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
      <span className="text-sm text-gray-500">{label || "Loading..."}</span>
    </div>
  );
};

export default Loader;
