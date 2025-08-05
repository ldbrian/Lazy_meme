import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { HotWord, Meme, CultureContent } from '@/data/mockData';
import { hotWordApi, memeApi, cultureApi, userApi } from './api';

// 通用数据获取Hook - 移除本地模拟数据依赖
export function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  initialData: T,
  tableName: string
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setIsEmpty(false);
    try {
      const result = await fetchFn();
      setData(result);
      setError(null);
      
      // 检查数组是否为空
      const isArrayEmpty = Array.isArray(result) && (result as any[]).length === 0;
      setIsEmpty(isArrayEmpty);
      
      if (isArrayEmpty) {
        console.log(`获取到${tableName}数据，但返回结果为空`);
        toast.info(`没有找到${tableName.replace('_', ' ')}数据，请检查数据库是否有内容`);
      } else {
        console.log(`成功获取${tableName}数据`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data from Supabase';
      setError(err instanceof Error ? err : new Error(errorMessage));
      setData(null);
      setIsEmpty(false);
      
      // 更详细的错误分类
      if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
        console.error(`获取${tableName}数据错误: 权限不足，请检查API密钥`);
        toast.error(`数据访问失败: 权限不足，请检查Supabase密钥配置`);
      } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
        console.error(`获取${tableName}数据错误: 表不存在`);
        toast.error(`数据访问失败: 表${tableName}不存在，请检查数据库结构`);
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        console.error(`获取${tableName}数据错误: 网络问题`);
        toast.error(`网络连接失败: 无法连接到Supabase服务器，请检查网络`);
      } else {
        console.error(`获取${tableName}数据错误:`, errorMessage);
        toast.error(`数据加载失败: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, isEmpty, refetch: fetchData };
}

// 热词数据Hook - 移除本地模拟数据
export const useHotWords = () => {
  return useDataFetch<HotWord[]>(
    () => hotWordApi.getAll(),
    [],
    'hotwords'
  );
}

// 使用Supabase实时订阅热词数据
export const useHotWordsRealtime = () => {
  const [data, setData] = useState<HotWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { supabase } = require('@/services/supabaseService');
  
  useEffect(() => {
    // 获取初始数据
    const fetchInitialData = async () => {
      try {
        const initialData = await hotWordApi.getAll();
        setData(initialData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch hot words data'));
        console.error('Error fetching hot words:', err);
      } finally {
        setLoading(false);  
      }
    };
    
    fetchInitialData();
    
    // 设置实时订阅
    const subscription = supabase
      .channel('hotwords-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'hotwords' },
        (payload) => {
          setData(prev => {
            // 根据事件类型更新本地数据
            switch (payload.eventType) {
              case 'INSERT':
                return [...prev, payload.new as HotWord];
              case 'UPDATE':
                return prev.map(item => 
                  item.id === payload.new.id ? (payload.new as HotWord) : item
                );
              case 'DELETE':
                return prev.filter(item => item.id !== payload.old.id);
              default:
                return prev;
            }
          });
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);
  
  return { data, loading, error };
};

// 梗图数据Hook - 移除本地模拟数据
export const useMemes = () => {
  return useDataFetch<Meme[]>(
    () => memeApi.getAll(),
    [],
    'memes'
  );
}

// 文化内容数据Hook - 移除本地模拟数据
export const useCultureContent = () => {
  return useDataFetch<CultureContent>(
     async () => {
      const data = await cultureApi.getAll();
      if (!data || data.length === 0) {
        // 返回null而不是抛出错误，让useDataFetch处理空数据情况
        return null;
      }
      return data[0];
    },
    {} as CultureContent,
    'culture_content'
  );
}

// 用户学习进度Hook
export const useLearningProgress = () => {
  return useDataFetch<any>(
    () => userApi.getLearningProgress(),
    { learningProgress: 0, learnedWords: 0 }
  );
};