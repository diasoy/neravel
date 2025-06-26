# Authentication System Documentation

## Skema Login NextAuth

Sistem autentikasi ini menggunakan NextAuth.js dengan Laravel backend API.

### Struktur URL

- `/` - Homepage (public)
- `/auth/login` - Halaman login
- `/auth/register` - Halaman register
- `/dashboard` - Dashboard (protected)

### Middleware Protection

Middleware akan:

1. Memblokir akses ke semua halaman kecuali `/`, `/auth/login`, dan `/auth/register` jika user belum login
2. Redirect user yang sudah login dari halaman auth ke dashboard
3. Mengizinkan akses ke file static dan API routes

### Konfigurasi NextAuth

- Provider: Credentials (Laravel API)
- Strategy: JWT
- Custom pages: `/auth/login`, `/auth/register`
- Callback URL: `/dashboard`

### Components

1. **ProtectedRoute**: Wrapper untuk halaman yang membutuhkan login
2. **PublicRoute**: Wrapper untuk halaman auth yang redirect jika sudah login
3. **useAuth**: Hook untuk mengelola state authentication

### Authentication Flow

1. User mengakses halaman protected
2. Middleware check token
3. Jika tidak ada token, redirect ke login
4. User login melalui credentials
5. NextAuth memanggil Laravel API
6. Jika berhasil, user mendapat JWT token
7. Token disimpan dalam session
8. User dapat mengakses halaman protected

### Error Handling

- Invalid credentials: Tampil error di form login
- Network error: Fallback error handling
- Token expired: Auto logout dan redirect ke login

### Usage

```jsx
// Protected page
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>Content only for authenticated users</div>
    </ProtectedRoute>
  );
}

// Public page with redirect
import { PublicRoute } from "@/components/PublicRoute";

export default function AuthPage() {
  return (
    <PublicRoute>
      <div>Login/Register form</div>
    </PublicRoute>
  );
}

// Using auth hook
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      Welcome {user.name}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```
