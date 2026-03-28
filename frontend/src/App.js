import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Features from "./pages/Features";
import Lessons from "./pages/Lessons";
import Speaking from "./pages/Speaking";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Games from "./pages/Games";
import AITutor from "./pages/AITutor";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Achievements from "./pages/Achievements";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || user === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (user && user !== false) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/roadmap" element={<Layout><Roadmap /></Layout>} />
      <Route path="/features" element={<Layout><Features /></Layout>} />
      
      {/* Auth routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/lessons" element={<ProtectedRoute><Layout><Lessons /></Layout></ProtectedRoute>} />
      <Route path="/lessons/:lessonId" element={<ProtectedRoute><Layout><Lessons /></Layout></ProtectedRoute>} />
      <Route path="/speaking" element={<ProtectedRoute><Layout><Speaking /></Layout></ProtectedRoute>} />
      <Route path="/listening" element={<ProtectedRoute><Layout><Listening /></Layout></ProtectedRoute>} />
      <Route path="/reading" element={<ProtectedRoute><Layout><Reading /></Layout></ProtectedRoute>} />
      <Route path="/writing" element={<ProtectedRoute><Layout><Writing /></Layout></ProtectedRoute>} />
      <Route path="/games" element={<ProtectedRoute><Layout><Games /></Layout></ProtectedRoute>} />
      <Route path="/tutor" element={<ProtectedRoute><Layout><AITutor /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><Layout><Progress /></Layout></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute><Layout><Achievements /></Layout></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
