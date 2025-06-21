import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllCandidates = async () => {
  const response = await api.get('/candidates');
  return response.data;
};

export const getCandidate = async (filename) => {
  const response = await api.get(`/candidates/${filename}`);
  return response.data;
};

export const signup = async (email, password) => {
  const response = await api.post('/signup', { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const validateToken = async (token) => {
  const response = await api.get('/validate', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Resume processing endpoints
export const analyzeResumes = async (file, query) => {
  const formData = new FormData();
  formData.append('resumes_zip', file);
  formData.append('query', query);
  
  const response = await api.post('/analyze_resumes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const checkStatus = async (sessionId) => {
  const response = await api.get(`/status/${sessionId}`);
  return response.data;
};

export const getResult = async (sessionId) => {
  const response = await api.get(`/result/${sessionId}`);
  return response.data;
};

// Chat endpoints
export const chatWithSession = async (sessionId, query) => {
  const response = await api.post(`/chat/${sessionId}`, { query });
  return response.data;
};

export const getSessionResult = async (sessionId) => {
  const response = await api.get(`/result/${sessionId}`);
  return response.data;
}; 