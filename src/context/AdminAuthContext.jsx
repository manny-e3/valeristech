import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

const STORAGE_KEY = 'valeris_admin_auth';

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.token && parsed?.admin) {
          setAdmin(parsed.admin);
          setToken(parsed.token);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login handler
  const login = async (identifier, password) => {
    const endpoints = [
      '/api/admin-auth.php?action=login',
      'http://localhost/safi/valeristechltd/api/admin-auth.php?action=login',
    ];

    let lastError = null;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            username: identifier.trim(),
            password,
          }),
        });

        const data = await res.json().catch(() => null);

        if (res.ok && data?.success) {
          const authData = {
            admin: data.admin,
            token: data.token,
          };
          setAdmin(data.admin);
          setToken(data.token);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
          } catch {}
          return { success: true, admin: data.admin, message: data.message };
        } else if (data?.message) {
          return { success: false, message: data.message };
        } else {
          lastError = `Server responded with HTTP ${res.status}`;
        }
      } catch (err) {
        lastError = err.message || 'Network connection failed.';
      }
    }

    return {
      success: false,
      message: lastError || 'Unable to connect to authentication server.',
    };
  };

  // Logout handler
  const logout = () => {
    setAdmin(null);
    setToken(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}

    // Optionally notify server in background
    fetch('/api/admin-auth.php?action=logout', { method: 'POST' }).catch(() => {});
  };

  // Change password handler
  const changePassword = async (currentPassword, newPassword) => {
    const endpoints = [
      '/api/admin-auth.php?action=change_password',
      'http://localhost/safi/valeristechltd/api/admin-auth.php?action=change_password',
    ];

    let lastError = null;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Admin-Token': token || '',
          },
          body: JSON.stringify({
            admin_id: admin?.id || 1,
            current_password: currentPassword,
            new_password: newPassword,
          }),
        });

        const data = await res.json().catch(() => null);
        if (res.ok && data?.success) {
          return { success: true, message: data.message };
        } else if (data?.message) {
          return { success: false, message: data.message };
        } else {
          lastError = `Server returned HTTP ${res.status}`;
        }
      } catch (err) {
        lastError = err.message || 'Network error';
      }
    }

    return { success: false, message: lastError || 'Failed to update password.' };
  };

  const value = {
    admin,
    token,
    isAuthenticated: Boolean(token && admin),
    isLoading,
    login,
    logout,
    changePassword,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
