import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://your-database-api.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证信息
api.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_DB_API_KEY;
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }
    
    // 添加认证token（如果有）
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API请求错误:', error);
    // 可以添加统一的错误处理逻辑
    return Promise.reject(error);
  }
);

import { fetchData, fetchDataById, addData, updateData, deleteData } from './supabaseService';
import { db } from './dbService';
import { HotWord, Meme, CultureContent } from '@/data/mockData';

// 热词相关API
export const hotWordApi = {
  getAll: () => fetchData<HotWord>('hotwords'),
  getById: (id: number) => fetchDataById<HotWord>('hotwords', id),
  create: (data: Omit<HotWord, 'id'>) => addData<HotWord>('hotwords', data),
  update: (id: number, data: Partial<HotWord>) => updateData<HotWord>('hotwords', id, data),
  delete: (id: number) => deleteData('hotwords', id),
};

// 梗图相关API
export const memeApi = {
  getAll: () => fetchData<Meme>('memes'),
  getById: (id: number) => fetchDataById<Meme>('memes', id),
  create: (data: Omit<Meme, 'id'>) => addData<Meme>('memes', data),
  update: (id: number, data: Partial<Meme>) => updateData<Meme>('memes', id, data),
  delete: (id: number) => deleteData('memes', id),
};

// 文化内容相关API
export const cultureApi = {
  getAll: () => fetchData<CultureContent>('culture_content'),
  getById: (id: number) => fetchDataById<CultureContent>('culture_content', id),
  create: (data: Omit<CultureContent, 'id'>) => addData<CultureContent>('culture_content', data),
  update: (id: number, data: Partial<CultureContent>) => updateData<CultureContent>('culture_content', id, data),
  delete: (id: number) => deleteData('culture_content', id),
};

// 用户相关API
export const userApi = {
  getProfile: () => db.getById<any>('users', 'profile'),
  updateProfile: (data: any) => db.update<any>('users', 'profile', data),
  getLearningProgress: () => db.getById<any>('users', 'progress'),
};

export default api;