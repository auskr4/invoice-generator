import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { login as apiLogin } from '../api/api'; // Import the api instance and login function

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storeToken = (token: string) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token for all future requests
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization']; // Remove token from future requests
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      storeToken(response.token);
      setUser(response.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/protected');
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };
};