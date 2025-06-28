# Toast Notification System Documentation

## Overview

This application uses a comprehensive toast notification system built on top of [Sonner](https://sonner.emilkowal.ski/) to provide user feedback for various actions throughout the application. The system is designed to be consistent, accessible, and user-friendly.

## Features

- **Multi-category notifications**: Authentication, CRUD operations, validation, file operations, and more
- **Consistent design**: All toasts follow the same design language with proper spacing, colors, and typography
- **Geist Sans font**: Toasts use the same font as the rest of the application
- **Rich content support**: Support for descriptions, icons, and custom styling
- **Promise-based toasts**: Automatic loading, success, and error states for async operations
- **Confirmation toasts**: Interactive toasts with action buttons
- **Batch operations**: Special toasts for mass operations
- **Real-time updates**: Notifications for live data changes
- **Permission management**: Toasts for access control and role changes

## Installation & Setup

The toast system is already configured in the application:

1. **Sonner dependency**: Already installed via `package.json`
2. **Provider setup**: Toaster component is added to the app layout
3. **Hook implementation**: `useToast` hook provides all functionality

## Basic Usage

```jsx
import { useToast } from "@/hooks/useToast";

function MyComponent() {
  const { system, crud, auth } = useToast();

  const handleAction = () => {
    system.success("Action completed!", "Your action was successful");
  };

  return <button onClick={handleAction}>Click me</button>;
}
```

## Toast Categories

### 1. Authentication (`auth`)

```jsx
const { auth } = useToast();

// Success messages
auth.loginSuccess("John Doe"); // Welcome message with username
auth.registerSuccess(); // Registration confirmation
auth.logoutSuccess(); // Logout confirmation

// Error messages
auth.loginError("Invalid credentials");
auth.registerError("Email already exists");
auth.logoutError();
auth.sessionExpired(); // Session timeout notification
auth.unauthorized(); // Access denied
```

### 2. CRUD Operations (`crud`)

```jsx
const { crud } = useToast();

// Success messages
crud.createSuccess("Product"); // "Product Berhasil Dibuat"
crud.updateSuccess("Category"); // "Category Berhasil Diperbarui"
crud.deleteSuccess("User"); // "User Berhasil Dihapus"
crud.restoreSuccess("Data"); // "Data Berhasil Dipulihkan"

// Error messages
crud.createError("Product");
crud.updateError("Category");
crud.deleteError("User");
crud.restoreError("Data");
```

### 3. Status Operations (`status`)

```jsx
const { status } = useToast();

status.activated("Category"); // Item activated
status.deactivated("User"); // Item deactivated
status.statusChangeError("Product"); // Status change failed
```

### 4. Loading & Errors (`loading`)

```jsx
const { loading } = useToast();

loading.fetchError("Categories"); // Data fetch failed
loading.networkError(); // Network connection error
loading.serverError(); // Server error
```

### 5. Form Validation (`validation`)

```jsx
const { validation } = useToast();

validation.required("Email"); // Required field
validation.invalid("Email format"); // Invalid format
validation.tooShort("Password", 8); // Minimum length
validation.tooLong("Description", 255); // Maximum length
validation.mismatch("Password confirmation"); // Fields don't match
```

### 6. File Operations (`file`)

```jsx
const { file } = useToast();

file.uploadSuccess("document.pdf");
file.uploadError("image.jpg");
file.fileTooBig("2MB"); // File size limit
file.invalidFileType("JPG, PNG"); // Allowed file types
```

### 7. System Messages (`system`)

```jsx
const { system } = useToast();

// Basic messages
system.success("Success!", "Operation completed");
system.error("Error!", "Something went wrong");
system.warning("Warning!", "Please check your input");
system.info("Info", "This is an information message");

// Advanced features
const loadingToast = system.loading("Processing...");
system.dismiss(loadingToast); // Dismiss specific toast
system.dismissAll(); // Dismiss all toasts

// Promise-based toasts
const promise = fetch("/api/data");
system.promise(promise, {
  loading: "Fetching data...",
  success: "Data loaded successfully!",
  error: "Failed to load data",
});

// Custom styled toasts
system.custom("Custom message", {
  duration: 10000,
  style: { background: "blue", color: "white" },
});

// Rich content with icons
system.richContent("🎉 Congratulations!", "You completed the task", "🏆");
```

### 8. Confirmation Toasts (`confirm`)

```jsx
const { confirm, crud } = useToast();

// Delete confirmation
confirm.deleteConfirm(
  "this category",
  () => crud.deleteSuccess("Category"), // On confirm
  () => system.info("Cancelled") // On cancel
);

// Logout confirmation
confirm.logoutConfirm(
  () => auth.logoutSuccess(),
  () => system.info("Staying logged in")
);

// Status toggle confirmation
confirm.statusToggleConfirm(
  "category",
  true, // new status
  () => status.activated("Category"),
  () => system.info("Status unchanged")
);
```

### 9. Batch Operations (`batch`)

```jsx
const { batch } = useToast();

batch.deleteSuccess(5, "categories"); // "5 categories berhasil dihapus"
batch.deleteError(3, "users"); // Batch delete failed
batch.exportSuccess("Product Data", "Excel"); // Export completed
batch.exportError("Category Data"); // Export failed
batch.importSuccess(25, "products"); // "25 products berhasil diimport"
batch.importError(["Row 5: Invalid date"]); // Import with errors
```

### 10. Permission Management (`permission`)

```jsx
const { permission } = useToast();

permission.accessDenied("admin page"); // Access denied
permission.roleChanged("Administrator"); // Role updated
permission.permissionGranted("full access"); // Permission granted
```

### 11. Real-time Updates (`realtime`)

```jsx
const { realtime } = useToast();

realtime.newMessage("Admin"); // New message notification
realtime.dataUpdated("Category"); // Data updated by another user
realtime.notification("System Maintenance", "Scheduled for 2:00 AM"); // General notification
```

## Configuration

### Toast Default Settings

```javascript
const toastConfig = {
  duration: 4000, // 4 seconds default
  position: "top-right", // Toast position
  closeButton: true, // Show close button
};
```

### Customizing Durations

Different toast types have different default durations:

- Success messages: 3 seconds
- Error messages: 4-5 seconds
- Warning messages: 4 seconds
- Info messages: 3 seconds
- Loading toasts: Infinite (manual dismiss)

### Global Toaster Configuration

The Toaster component is configured in `src/app/provider.js`:

```jsx
<Toaster
  position="top-right"
  toastOptions={{
    style: {
      fontFamily: "var(--font-geist-sans)",
    },
  }}
  closeButton
  richColors
/>
```

## Best Practices

### 1. Choose the Right Toast Type

- Use `crud` for database operations
- Use `auth` for authentication flows
- Use `validation` for form errors
- Use `system` for general messages

### 2. Provide Clear Messages

```jsx
// Good
crud.createSuccess("Product");
validation.required("Email address");

// Avoid generic messages
system.success("Success");
system.error("Error");
```

### 3. Handle Async Operations

```jsx
// Use promise toasts for async operations
const handleSave = async () => {
  const promise = saveData();
  system.promise(promise, {
    loading: "Saving...",
    success: "Data saved successfully!",
    error: "Failed to save data",
  });
};
```

### 4. Confirm Destructive Actions

```jsx
// Always confirm delete operations
const handleDelete = (item) => {
  confirm.deleteConfirm(
    item.name,
    () => deleteItem(item.id),
    () => {} // Cancel action
  );
};
```

### 5. Provide Context

```jsx
// Include relevant context in messages
crud.updateSuccess("Product Category"); // Specific entity
file.uploadError("profile-image.jpg"); // Specific file
loading.fetchError("User Dashboard"); // Specific data
```

## Examples in Practice

### Login Form

```jsx
const handleLogin = async (credentials) => {
  try {
    const result = await signIn("credentials", credentials);
    if (result?.error) {
      auth.loginError(result.error);
    } else {
      auth.loginSuccess(user.name);
      router.push("/dashboard");
    }
  } catch (error) {
    auth.loginError("Network error occurred");
  }
};
```

### CRUD Form

```jsx
const handleSubmit = async (formData) => {
  try {
    if (editMode) {
      await updateCategory(id, formData);
      crud.updateSuccess("Category");
    } else {
      await createCategory(formData);
      crud.createSuccess("Category");
    }
    onSuccess();
  } catch (error) {
    if (editMode) {
      crud.updateError("Category");
    } else {
      crud.createError("Category");
    }
  }
};
```

### File Upload

```jsx
const handleFileUpload = async (file) => {
  if (file.size > MAX_SIZE) {
    file.fileTooBig("2MB");
    return;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    file.invalidFileType("JPG, PNG, PDF");
    return;
  }

  try {
    await uploadFile(file);
    file.uploadSuccess(file.name);
  } catch (error) {
    file.uploadError(file.name);
  }
};
```

## Demo Page

Visit `/dashboard/toast-demo` to see all toast types in action. This page provides interactive examples of every toast category and helps developers understand the available options.

## Troubleshooting

### Toasts Not Appearing

1. Check that the Toaster component is properly rendered in the app layout
2. Verify that Sonner is installed: `npm list sonner`
3. Ensure the useToast hook is imported correctly

### Styling Issues

1. Verify that Geist Sans font is loaded
2. Check that Tailwind CSS is properly configured
3. Ensure the Toaster component has the correct style configuration

### Performance Issues

1. Use `system.dismissAll()` if too many toasts accumulate
2. Avoid creating toasts in rapid succession
3. Use appropriate durations for different message types

## Migration Guide

If upgrading from a previous notification system:

1. Replace alert/confirm dialogs with appropriate toast confirmations
2. Convert inline error messages to validation toasts
3. Update success messages to use CRUD toasts
4. Replace loading states with promise toasts

This toast system provides a comprehensive, user-friendly way to communicate with users throughout your application. Use it consistently to create a polished user experience.
