import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const TOKEN_KEY = 'frenchquest_token';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const formatApiErrorDetail = (detail) => {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
};

// Single global interceptor — reads token from localStorage every request
let interceptorId = null;
if (interceptorId === null) {
  interceptorId = axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setUser(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/auth/me`);
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const authToken = response.data.access_token;
      if (authToken) {
        localStorage.setItem(TOKEN_KEY, authToken);
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
      const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      const authToken = response.data.access_token;
      if (authToken) {
        localStorage.setItem(TOKEN_KEY, authToken);
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
      await axios.post(`${API_URL}/api/auth/logout`);
    } catch (error) {
      // ignore
    } finally {
      localStorage.removeItem(TOKEN_KEY);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
