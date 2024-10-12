import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred during sign up');
    }
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred during login');
    }
    throw error;
  }
};

export const createInvoice = async (invoiceData: any) => {
  try {
    const response = await api.post('/invoices/create', invoiceData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred while creating the invoice');
    }
    throw error;
  }
};

export const updateInvoice = async (invoiceId: string, invoiceData: any) => {
  try {
    const response = await api.put(`/invoices/update/${invoiceId}`, invoiceData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred while updating the invoice');
    }
    throw error;
  }
};

export const finalizeInvoice = async (invoiceId: string) => {
  try {
    const response = await api.put(`/invoices/finalize/${invoiceId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred while finalizing the invoice');
    }
    throw error;
  }
};

export default api;