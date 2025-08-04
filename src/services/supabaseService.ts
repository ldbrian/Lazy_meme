import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// 初始化Supabase客户端
// 注意：在.env文件中配置这些变量时不需要加引号
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  toast.error('Supabase环境变量未配置，请检查.env文件');
  console.error('请在.env文件中添加以下配置：');
  console.error('VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.error('VITE_SUPABASE_ANON_KEY=your-anon-key-here');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 通用数据获取函数
export async function fetchData<T>(table: string): Promise<T[]> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data as T[];
  } catch (error) {
    console.error(`Error fetching ${table}:`, error);
    toast.error(`获取${table}数据失败`);
    throw error;
  }
}

// 获取单个数据
export async function fetchDataById<T>(table: string, id: number): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as T;
  } catch (error) {
    console.error(`Error fetching ${table} with id ${id}:`, error);
    toast.error(`获取数据失败`);
    throw error;
  }
}

// 添加数据
export async function addData<T>(table: string, data: Omit<T, 'id'>): Promise<T> {
  try {
    const { data: newData, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    toast.success('数据添加成功');
    return newData as T;
  } catch (error) {
    console.error(`Error adding data to ${table}:`, error);
    toast.error('添加数据失败');
    throw error;
  }
}

// 更新数据
export async function updateData<T>(table: string, id: number, data: Partial<T>): Promise<T> {
  try {
    const { data: updatedData, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    toast.success('数据更新成功');
    return updatedData as T;
  } catch (error) {
    console.error(`Error updating ${table} with id ${id}:`, error);
    toast.error('更新数据失败');
    throw error;
  }
}

// 删除数据
export async function deleteData(table: string, id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
    toast.success('数据删除成功');
    return true;
  } catch (error) {
    console.error(`Error deleting ${table} with id ${id}:`, error);
    toast.error('删除数据失败');
    throw error;
  }
}