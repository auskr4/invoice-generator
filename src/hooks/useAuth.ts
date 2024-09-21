import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { login as apiLogin, setAuthToken } from '../api/api';
import { jwtDecode } from "jwt-decode";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storeUserData = (userData: User) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const getUserData = (): User | null => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

  const storeToken = (token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setAuthToken('');
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      storeToken(response.token);
      storeUserData(response.user);
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
    const storedUserData = getUserData();

    if (!token) {
      setLoading(false);
      return;
    }

    setAuthToken(token);

    try {
      const decodedToken: { userId: string; exp: number } = jwtDecode(token);
      
      if (Date.now() >= decodedToken.exp * 1000) {
        throw new Error('Token expired');
      }

      const response = await api.get('/protected');
      const userData = response.data.user;
      
      setUser(userData);
      storeUserData(userData);
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