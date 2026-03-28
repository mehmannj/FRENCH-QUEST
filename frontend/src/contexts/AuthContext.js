import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to format API errors
const formatApiErrorDetail = (detail) => {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
};

// Configure axios interceptor for auth token
const setupAxiosInterceptors = (getToken) => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = checking, false = not authenticated, object = authenticated
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('frenchquest_token'));

  const getToken = useCallback(() => token, [token]);

  // Setup axios interceptors
  useEffect(() => {
    setupAxiosInterceptors(getToken);
  }, [getToken]);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem('frenchquest_token');
    if (!storedToken) {
      setUser(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        withCredentials: true
      });
      setUser(response.data);
      setToken(storedToken);
    } catch (error) {
      localStorage.removeItem('frenchquest_token');
      setUser(false);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      
      // Extract token from response if provided
      const authToken = response.data.access_token || response.headers['x-access-token'];
      if (authToken) {
        localStorage.setItem('frenchquest_token', authToken);
        setToken(authToken);
      }
      
      setUser(response.data);
      return { success: true };
    } catch (error) {
      const errorMessage = formatApiErrorDetail(error.response?.data?.detail) || error.message;
      return { success: false, error: errorMessage };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );
      
      // Extract token from response if provided
      const authToken = response.data.access_token || response.headers['x-access-token'];
      if (authToken) {
        localStorage.setItem('frenchquest_token', authToken);
        setToken(authToken);
      }
      
      setUser(response.data);
      return { success: true };
    } catch (error) {
      const errorMessage = formatApiErrorDetail(error.response?.data?.detail) || error.message;
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('frenchquest_token');
      setToken(null);
      setUser(false);
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user && user !== false,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
