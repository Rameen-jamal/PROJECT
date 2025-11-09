// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export const authAPI = {
//   login: (credentials) => api.post('/auth/login/', credentials),
//   logout: () => api.post('/auth/logout/'),
//   register: (userData) => api.post('/auth/register/', userData),
//   getCurrentUser: () => api.get('/auth/user/'),
// };

// export const courseAPI = {
//   getAll: () => api.get('/courses/'),
//   getById: (id) => api.get(`/courses/${id}/`),
// };

// export default api;
class APIService {
  constructor() {
    this.baseURL = 'http://localhost:8000/api';
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  auth = {
    login: (credentials) => this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    logout: () => this.request('/auth/logout/', { method: 'POST' }),
    register: (userData) => this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    getCurrentUser: () => this.request('/auth/user/'),
    updateProfile: (data) => this.request('/auth/user/', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  };

  courses = {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return this.request(`/courses/${query ? '?' + query : ''}`);
    },
    getById: (id) => this.request(`/courses/${id}/`),
    enroll: (id) => this.request(`/courses/${id}/enroll/`, { method: 'POST' }),
    unenroll: (id) => this.request(`/courses/${id}/unenroll/`, { method: 'POST' }),
    getMyCourses: () => this.request('/courses/my-courses/'),
  };

  teacher = {
    getCourses: () => this.request('/teacher/courses/'),
    createCourse: (data) => this.request('/teacher/courses/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    updateCourse: (id, data) => this.request(`/teacher/courses/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    deleteCourse: (id) => this.request(`/teacher/courses/${id}/`, { method: 'DELETE' }),
    getStudents: (courseId) => this.request(`/teacher/courses/${courseId}/students/`),
  };

  admin = {
    getUsers: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return this.request(`/admin/users/${query ? '?' + query : ''}`);
    },
    updateUser: (id, data) => this.request(`/admin/users/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    deleteUser: (id) => this.request(`/admin/users/${id}/`, { method: 'DELETE' }),
    getCourses: () => this.request('/admin/courses/'),
  };
}

export const api = new APIService();