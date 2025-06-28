"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Loader2,
  X,
} from "lucide-react";

// Toast icons mapping
const toastIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  loading: Loader2,
};

// Toast colors mapping
const toastColors = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
  loading: "text-gray-600",
};

/**
 * Custom Toast Component
 *
 * This component can be used to create custom toast notifications
 * with consistent styling and behavior.
 */
export const CustomToast = ({
  type = "info",
  title,
  description,
  action,
  onClose,
  icon: CustomIcon,
  className,
  ...props
}) => {
  const Icon = CustomIcon || toastIcons[type];
  const iconColor = toastColors[type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 bg-white rounded-lg border shadow-lg max-w-md",
        className
      )}
      {...props}
    >
      {/* Icon */}
      <div className={cn("flex-shrink-0 mt-0.5", iconColor)}>
        <Icon className={cn("h-5 w-5", type === "loading" && "animate-spin")} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        {title && (
          <div className="font-semibold text-gray-900 text-sm leading-5">
            {title}
          </div>
        )}
        {description && (
          <div className="text-gray-600 text-sm leading-5">{description}</div>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

/**
 * Toast notification functions
 *
 * Alternative way to create toasts without using the useToast hook
 */
export const toastNotifications = {
  /**
   * Show a success toast
   */
  success: (title, description, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast
          type="success"
          title={title}
          description={description}
          onClose={() => toast.dismiss(t)}
          {...options}
        />
      ),
      {
        duration: 4000,
        ...options,
      }
    );
  },

  /**
   * Show an error toast
   */
  error: (title, description, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast
          type="error"
          title={title}
          description={description}
          onClose={() => toast.dismiss(t)}
          {...options}
        />
      ),
      {
        duration: 5000,
        ...options,
      }
    );
  },

  /**
   * Show a warning toast
   */
  warning: (title, description, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast
          type="warning"
          title={title}
          description={description}
          onClose={() => toast.dismiss(t)}
          {...options}
        />
      ),
      {
        duration: 4000,
        ...options,
      }
    );
  },

  /**
   * Show an info toast
   */
  info: (title, description, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast
          type="info"
          title={title}
          description={description}
          onClose={() => toast.dismiss(t)}
          {...options}
        />
      ),
      {
        duration: 3000,
        ...options,
      }
    );
  },

  /**
   * Show a loading toast
   */
  loading: (title, description, options = {}) => {
    return toast.custom(
      (t) => (
        <CustomToast
          type="loading"
          title={title}
          description={description}
          onClose={() => toast.dismiss(t)}
          {...options}
        />
      ),
      {
        duration: Infinity,
        ...options,
      }
    );
  },

  /**
   * Show a custom toast with action buttons
   */
  withAction: (title, description, actionConfig, options = {}) => {
    const { label, onClick, variant = "primary" } = actionConfig;

    return toast.custom(
      (t) => (
        <CustomToast
          type={options.type || "info"}
          title={title}
          description={description}
          action={
            <button
              onClick={() => {
                onClick();
                toast.dismiss(t);
              }}
              className={cn(
                "px-3 py-1.5 rounded text-sm font-medium transition-colors",
                variant === "primary" &&
                  "bg-blue-600 text-white hover:bg-blue-700",
                variant === "secondary" &&
                  "bg-gray-200 text-gray-900 hover:bg-gray-300",
                variant === "destructive" &&
                  "bg-red-600 text-white hover:bg-red-700"
              )}
            >
              {label}
            </button>
          }
          onClose={() => toast.dismiss(t)}
          {...options}
        />
      ),
      {
        duration: 8000,
        ...options,
      }
    );
  },

  /**
   * Dismiss a specific toast
   */
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },
};

// Export individual functions for convenience
export const {
  success: toastSuccess,
  error: toastError,
  warning: toastWarning,
  info: toastInfo,
  loading: toastLoading,
  withAction: toastWithAction,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
} = toastNotifications;

export default CustomToast;
