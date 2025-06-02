import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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