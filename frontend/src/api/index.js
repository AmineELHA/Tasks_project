import api from './axios';

// Auth API
export const authAPI = {
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/projects/${id}`);
  },

  getProgress: async (id) => {
    const response = await api.get(`/projects/${id}/progress`);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getByProject: async (projectId) => {
    const response = await api.get(`/tasks?projectId=${projectId}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/tasks/${id}`);
  },
};
