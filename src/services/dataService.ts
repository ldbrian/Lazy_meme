import { useState, useEffect } from 'react';
import { HotWord, Meme, CultureContent } from '@/data/mockData';
import { hotWordApi, memeApi, cultureApi, userApi } from './api';

// 通用数据获取Hook
export function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  initialData: T
): {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// 热词数据Hook
export const useHotWords = () => {
  const { hotWords: initialData } = require('@/data/mockData');
  return useDataFetch<HotWord[]>(
    () => hotWordApi.getAll(),
    initialData);
};

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
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
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

// 梗图数据Hook
export const useMemes = () => {
  const { memes: initialData } = require('@/data/mockData');
  return useDataFetch<Meme[]>(
    () => memeApi.getAll(),
    initialData
  );
};

// 文化内容数据Hook
export const useCultureContent = () => {
  const { cultureContent: initialData } = require('@/data/mockData');
  return useDataFetch<CultureContent>(
    async () => {
      const data = await cultureApi.getAll();
      return data[0] || initialData;
    },
    initialData
  );
};

// 用户学习进度Hook
export const useLearningProgress = () => {
  return useDataFetch<any>(
    () => userApi.getLearningProgress(),
    { learningProgress: 0, learnedWords: 0 }
  );
};