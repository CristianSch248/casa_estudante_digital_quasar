import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api/ced', 
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
