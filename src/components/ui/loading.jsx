import { cn } from "@/libs/utils";

export function LoadingSpinner({
  size = "default",
  className,
  text = "Memuat...",
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center space-y-2">
        <div
          className={cn(
            "border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin",
            sizeClasses[size]
          )}
        />
        {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
      </div>
    </div>
  );
}

export function PageLoader({
  text = "Memuat halaman...",
  subtitle = "Mohon tunggu sebentar",
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4 text-center">
        <LoadingSpinner size="large" />
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-1">{text}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function InlineLoader({ text = "Loading...", size = "default" }) {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size={size} text="" />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
}
