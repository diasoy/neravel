"use client";

import { toast } from "sonner";

// Toast configuration
const toastConfig = {
  duration: 4000,
  position: "top-right",
  closeButton: true,
};

export const useToast = () => {
  // Authentication Toasts
  const auth = {
    loginSuccess: (username = "User") => {
      toast.success(`Selamat datang, ${username}!`, {
        ...toastConfig,
        description: "Anda berhasil masuk ke dashboard",
        duration: 3000,
      });
    },

    loginError: (message = "Email atau password salah") => {
      toast.error("Login Gagal", {
        ...toastConfig,
        description: message,
        duration: 5000,
      });
    },

    registerSuccess: () => {
      toast.success("Registrasi Berhasil!", {
        ...toastConfig,
        description: "Akun Anda telah dibuat. Silakan login",
        duration: 4000,
      });
    },

    registerError: (message = "Gagal membuat akun") => {
      toast.error("Registrasi Gagal", {
        ...toastConfig,
        description: message,
        duration: 5000,
      });
    },

    logoutSuccess: () => {
      toast.success("Logout Berhasil", {
        ...toastConfig,
        description: "Anda telah keluar dari aplikasi",
        duration: 3000,
      });
    },

    logoutError: () => {
      toast.error("Gagal Logout", {
        ...toastConfig,
        description: "Silakan coba lagi",
        duration: 4000,
      });
    },

    sessionExpired: () => {
      toast.warning("Sesi Berakhir", {
        ...toastConfig,
        description: "Silakan login kembali untuk melanjutkan",
        duration: 5000,
      });
    },

    unauthorized: () => {
      toast.error("Akses Ditolak", {
        ...toastConfig,
        description: "Anda tidak memiliki izin untuk mengakses halaman ini",
        duration: 4000,
      });
    },
  };

  // CRUD Operations Toasts
  const crud = {
    createSuccess: (entity = "Data") => {
      toast.success(`${entity} Berhasil Dibuat`, {
        ...toastConfig,
        description: `${entity} baru telah ditambahkan`,
        duration: 3000,
      });
    },

    createError: (entity = "Data") => {
      toast.error(`Gagal Membuat ${entity}`, {
        ...toastConfig,
        description: "Silakan periksa input dan coba lagi",
        duration: 4000,
      });
    },

    updateSuccess: (entity = "Data") => {
      toast.success(`${entity} Berhasil Diperbarui`, {
        ...toastConfig,
        description: `Perubahan ${entity.toLowerCase()} telah disimpan`,
        duration: 3000,
      });
    },

    updateError: (entity = "Data") => {
      toast.error(`Gagal Memperbarui ${entity}`, {
        ...toastConfig,
        description: "Silakan coba lagi",
        duration: 4000,
      });
    },

    deleteSuccess: (entity = "Data") => {
      toast.success(`${entity} Berhasil Dihapus`, {
        ...toastConfig,
        description: `${entity} telah dihapus dari sistem`,
        duration: 3000,
      });
    },

    deleteError: (entity = "Data") => {
      toast.error(`Gagal Menghapus ${entity}`, {
        ...toastConfig,
        description: "Silakan coba lagi",
        duration: 4000,
      });
    },

    restoreSuccess: (entity = "Data") => {
      toast.success(`${entity} Berhasil Dipulihkan`, {
        ...toastConfig,
        description: `${entity} telah dikembalikan`,
        duration: 3000,
      });
    },

    restoreError: (entity = "Data") => {
      toast.error(`Gagal Memulihkan ${entity}`, {
        ...toastConfig,
        description: "Silakan coba lagi",
        duration: 4000,
      });
    },
  };

  // Status Operations Toasts
  const status = {
    activated: (entity = "Item") => {
      toast.success(`${entity} Diaktifkan`, {
        ...toastConfig,
        description: `${entity} sekarang aktif`,
        duration: 2500,
      });
    },

    deactivated: (entity = "Item") => {
      toast.warning(`${entity} Dinonaktifkan`, {
        ...toastConfig,
        description: `${entity} sekarang tidak aktif`,
        duration: 2500,
      });
    },

    statusChangeError: (entity = "Item") => {
      toast.error(`Gagal Mengubah Status ${entity}`, {
        ...toastConfig,
        description: "Silakan coba lagi",
        duration: 4000,
      });
    },
  };

  // Data Loading Toasts
  const loading = {
    fetchError: (entity = "Data") => {
      toast.error(`Gagal Memuat ${entity}`, {
        ...toastConfig,
        description: "Periksa koneksi internet dan coba lagi",
        duration: 4000,
      });
    },

    networkError: () => {
      toast.error("Koneksi Bermasalah", {
        ...toastConfig,
        description: "Periksa koneksi internet Anda",
        duration: 5000,
      });
    },

    serverError: () => {
      toast.error("Server Bermasalah", {
        ...toastConfig,
        description: "Silakan coba beberapa saat lagi",
        duration: 5000,
      });
    },
  };

  // Form Validation Toasts
  const validation = {
    required: (field = "Field") => {
      toast.error("Input Wajib", {
        ...toastConfig,
        description: `${field} harus diisi`,
        duration: 3000,
      });
    },

    invalid: (field = "Field") => {
      toast.error("Input Tidak Valid", {
        ...toastConfig,
        description: `Format ${field.toLowerCase()} tidak benar`,
        duration: 3000,
      });
    },

    tooShort: (field = "Field", minLength = 3) => {
      toast.error("Input Terlalu Pendek", {
        ...toastConfig,
        description: `${field} minimal ${minLength} karakter`,
        duration: 3000,
      });
    },

    tooLong: (field = "Field", maxLength = 255) => {
      toast.error("Input Terlalu Panjang", {
        ...toastConfig,
        description: `${field} maksimal ${maxLength} karakter`,
        duration: 3000,
      });
    },

    mismatch: (field = "Field") => {
      toast.error("Input Tidak Cocok", {
        ...toastConfig,
        description: `${field} tidak cocok`,
        duration: 3000,
      });
    },
  };

  // File Operations Toasts
  const file = {
    uploadSuccess: (fileName = "File") => {
      toast.success("Upload Berhasil", {
        ...toastConfig,
        description: `${fileName} berhasil diunggah`,
        duration: 3000,
      });
    },

    uploadError: (fileName = "File") => {
      toast.error("Upload Gagal", {
        ...toastConfig,
        description: `Gagal mengunggah ${fileName}`,
        duration: 4000,
      });
    },

    fileTooBig: (maxSize = "2MB") => {
      toast.error("File Terlalu Besar", {
        ...toastConfig,
        description: `Ukuran file maksimal ${maxSize}`,
        duration: 4000,
      });
    },

    invalidFileType: (allowedTypes = "JPG, PNG") => {
      toast.error("Tipe File Tidak Valid", {
        ...toastConfig,
        description: `Hanya file ${allowedTypes} yang diizinkan`,
        duration: 4000,
      });
    },
  };

  // Enhanced system toasts with more customization
  const systemEnhanced = {
    info: (message, description = null) => {
      toast.info(message, {
        ...toastConfig,
        description,
        duration: 3000,
      });
    },

    success: (message, description = null) => {
      toast.success(message, {
        ...toastConfig,
        description,
        duration: 3000,
      });
    },

    warning: (message, description = null) => {
      toast.warning(message, {
        ...toastConfig,
        description,
        duration: 4000,
      });
    },

    error: (message, description = null) => {
      toast.error(message, {
        ...toastConfig,
        description,
        duration: 4000,
      });
    },

    loading: (message = "Memproses...") => {
      return toast.loading(message, {
        ...toastConfig,
        duration: Infinity, // Manual dismiss
      });
    },

    dismiss: (toastId) => {
      toast.dismiss(toastId);
    },

    dismissAll: () => {
      toast.dismiss();
    },

    promise: (promise, messages) => {
      return toast.promise(promise, {
        loading: messages.loading || "Memproses...",
        success: (data) => messages.success || "Berhasil!",
        error: (error) => messages.error || "Terjadi kesalahan",
        ...toastConfig,
      });
    },

    custom: (message, options = {}) => {
      return toast(message, {
        ...toastConfig,
        ...options,
      });
    },

    richContent: (title, description, icon = null) => {
      toast.success(title, {
        ...toastConfig,
        description,
        icon,
        richColors: true,
      });
    },
  };

  // Action confirmation toasts
  const confirm = {
    deleteConfirm: (entity = "item", onConfirm, onCancel) => {
      toast.warning("Konfirmasi Hapus", {
        ...toastConfig,
        description: `Yakin ingin menghapus ${entity}?`,
        duration: 8000,
        action: {
          label: "Hapus",
          onClick: onConfirm,
        },
        cancel: {
          label: "Batal",
          onClick: onCancel,
        },
      });
    },

    logoutConfirm: (onConfirm, onCancel) => {
      toast.warning("Konfirmasi Logout", {
        ...toastConfig,
        description: "Yakin ingin keluar dari aplikasi?",
        duration: 6000,
        action: {
          label: "Logout",
          onClick: onConfirm,
        },
        cancel: {
          label: "Batal",
          onClick: onCancel,
        },
      });
    },

    statusToggleConfirm: (entity = "item", newStatus, onConfirm, onCancel) => {
      const action = newStatus ? "mengaktifkan" : "menonaktifkan";
      toast.warning("Konfirmasi Perubahan Status", {
        ...toastConfig,
        description: `Yakin ingin ${action} ${entity}?`,
        duration: 6000,
        action: {
          label: "Ya",
          onClick: onConfirm,
        },
        cancel: {
          label: "Batal",
          onClick: onCancel,
        },
      });
    },
  };

  // Batch operations toasts
  const batch = {
    deleteSuccess: (count = 1, entity = "item") => {
      toast.success("Hapus Massal Berhasil", {
        ...toastConfig,
        description: `${count} ${entity} berhasil dihapus`,
        duration: 3000,
      });
    },

    deleteError: (count = 1, entity = "item") => {
      toast.error("Hapus Massal Gagal", {
        ...toastConfig,
        description: `Gagal menghapus ${count} ${entity}`,
        duration: 4000,
      });
    },

    exportSuccess: (entity = "Data", format = "Excel") => {
      toast.success("Export Berhasil", {
        ...toastConfig,
        description: `${entity} berhasil diexport ke format ${format}`,
        duration: 3000,
      });
    },

    exportError: (entity = "Data") => {
      toast.error("Export Gagal", {
        ...toastConfig,
        description: `Gagal mengexport ${entity}`,
        duration: 4000,
      });
    },

    importSuccess: (count = 0, entity = "data") => {
      toast.success("Import Berhasil", {
        ...toastConfig,
        description: `${count} ${entity} berhasil diimport`,
        duration: 3000,
      });
    },

    importError: (errors = []) => {
      toast.error("Import Gagal", {
        ...toastConfig,
        description:
          errors.length > 0 ? errors[0] : "Terjadi kesalahan saat import",
        duration: 5000,
      });
    },
  };

  // Permission and role toasts
  const permission = {
    accessDenied: (resource = "halaman") => {
      toast.error("Akses Ditolak", {
        ...toastConfig,
        description: `Anda tidak memiliki izin untuk mengakses ${resource}`,
        duration: 4000,
      });
    },

    roleChanged: (newRole = "role") => {
      toast.info("Role Berubah", {
        ...toastConfig,
        description: `Role Anda telah berubah menjadi ${newRole}`,
        duration: 3000,
      });
    },

    permissionGranted: (permission = "akses") => {
      toast.success("Izin Diberikan", {
        ...toastConfig,
        description: `Anda telah diberikan ${permission}`,
        duration: 3000,
      });
    },
  };
  // Real-time updates toasts
  const realtime = {
    newMessage: (sender = "User") => {
      toast.info("Pesan Baru", {
        ...toastConfig,
        description: `Pesan baru dari ${sender}`,
        duration: 4000,
      });
    },

    dataUpdated: (entity = "Data") => {
      toast.info(`${entity} Diperbarui`, {
        ...toastConfig,
        description: `${entity} telah diperbarui oleh pengguna lain`,
        duration: 3000,
      });
    },

    notification: (title, message) => {
      toast.info(title, {
        ...toastConfig,
        description: message,
        duration: 4000,
      });
    },
  };

  return {
    auth,
    crud,
    status,
    loading,
    validation,
    file,
    system: systemEnhanced,
    confirm,
    batch,
    permission,
    realtime,
  };
};
