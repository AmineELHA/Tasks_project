import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import { Toaster } from "@/components/ui/sonner";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Public Route Component for Auth pages (redirect to /projects if already logged in)
function AuthRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }
  
  return children;
}

// Home Route Component (redirect to /projects if already logged in)
function HomeRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Home Route */}
      <Route 
        path="/" 
        element={
          <HomeRoute>
            <Home />
          </HomeRoute>
        } 
      />
      
      {/* Public Auth Routes */}
      <Route 
        path="/login" 
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/projects" 
        element={
          <ProtectedRoute>
            <ProjectList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/projects/new" 
        element={
          <ProtectedRoute>
            <NewProject />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/projects/:id" 
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
