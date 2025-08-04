import axios from 'axios';
import { toast } from 'sonner';

/**
 * 数据库服务模块 - 已被Supabase替代
 * 
 * 当前项目已集成Supabase作为主要数据库解决方案，
 * 请使用src/services/supabaseService.ts中的方法进行数据库操作。
 * 
 * Supabase配置方法:
 * 1. 在项目根目录创建.env文件，添加以下配置:
 *    VITE_SUPABASE_URL=你的Supabase项目URL
 *    VITE_SUPABASE_ANON_KEY=你的Supabase匿名密钥
 * 
 * 2. 导入Supabase服务:
 *    import { supabase, fetchData } from '@/services/supabaseService';
 * 
 * 3. 使用示例:
 *    const fetchHotWords = async () => {
 *      try {
 *        const data = await fetchData<HotWord>('hotwords');
 *        console.log('热词数据:', data);
 *      } catch (error) {
 *        console.error('获取热词失败:', error);
 *      }
 *    };
 *  */
// 创建数据库服务实例
const dbService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://your-database-api.com',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_DB_API_KEY || '',
    'X-DB-User': import.meta.env.VITE_DB_USER || '',
    'X-DB-Name': import.meta.env.VITE_DB_NAME || ''
  },
  timeout: 10000
});

// 请求拦截器
dbService.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('请求准备失败');
    return Promise.reject(error);
  }
);

// 响应拦截器
dbService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('数据库服务错误:', error);
    
    // 根据错误状态码显示不同提示
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('认证失败，请重新登录');
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('没有权限访问该资源');
          break;
        case 404:
          toast.error('请求的资源不存在');
          break;
        case 500:
          toast.error('服务器内部错误');
          break;
        default:
          toast.error(`请求错误: ${error.response.status}`);
      }
    } else if (error.request) {
      toast.error('无法连接到服务器，请检查网络');
    } else {
      toast.error('请求错误');
    }
    
    return Promise.reject(error);
  }
);

// 通用CRUD操作
export const db = {
  // 获取所有数据
  getAll: async <T>(collection: string): Promise<T[]> => {
    try {
      return await dbService.get(`/${collection}`);
    } catch (error) {
      console.error(`获取${collection}数据失败`, error);
      throw error;
    }
  },
  
  // 获取单个数据
  getById: async <T>(collection: string, id: string | number): Promise<T> => {
    try {
      return await dbService.get(`/${collection}/${id}`);
    } catch (error) {
      console.error(`获取${collection} ${id}失败`, error);
      throw error;
    }
  },
  
  // 创建数据
  create: async <T>(collection: string, data: Omit<T, 'id'>): Promise<T> => {
    try {
      return await dbService.post(`/${collection}`, data);
    } catch (error) {
      console.error(`创建${collection}数据失败`, error);
      throw error;
    }
  },
  
  // 更新数据
  update: async <T>(collection: string, id: string | number, data: Partial<T>): Promise<T> => {
    try {
      return await dbService.put(`/${collection}/${id}`, data);
    } catch (error) {
      console.error(`更新${collection} ${id}失败`, error);
      throw error;
    }
  },
  
  // 删除数据
  delete: async (collection: string, id: string | number): Promise<boolean> => {
    try {
      await dbService.delete(`/${collection}/${id}`);
      return true;
    } catch (error) {
      console.error(`删除${collection} ${id}失败`, error);
      throw error;
    }
  }
};

export default dbService;