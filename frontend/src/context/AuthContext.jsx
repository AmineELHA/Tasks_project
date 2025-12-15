import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    
    if (token && email) {
      setUser({ email });
    }
    setLoading(false);
  }, []);

  const register = async (email, password) => {
    try {
      const data = await authAPI.register(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      setUser({ email: data.email });
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Registration failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      setUser({ email: data.email });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
  };

  const value = {
    user,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
