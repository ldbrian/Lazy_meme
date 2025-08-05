import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

 // 初始化Supabase客户端
 // 注意：在.env文件中配置这些变量时不需要加引号
 // 使用默认值作为后备选项，防止环境变量未配置时应用崩溃
 let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://default-project.supabase.co';
 let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'default-anon-key';
 
 // 验证Supabase配置
 const validateSupabaseConfig = () => {
   // 检查URL是否存在且格式正确
   if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.trim() === '') {
     return { 
       valid: false, 
       error: 'VITE_SUPABASE_URL环境变量未配置',
       solution: '请在项目根目录的.env文件中添加: VITE_SUPABASE_URL=你的Supabase项目URL'
     };
   }
   
   if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
     return { 
       valid: false, 
       error: 'VITE_SUPABASE_URL格式不正确',
       solution: 'Supabase URL应以https://开头且包含.supabase.co，例如：https://xxxx.supabase.co'
     };
   }
   
   // 检查Anon Key是否存在且格式正确
   if (!import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY.trim() === '') {
     return { 
       valid: false, 
       error: 'VITE_SUPABASE_ANON_KEY环境变量未配置',
       solution: '请在项目根目录的.env文件中添加: VITE_SUPABASE_ANON_KEY=你的Supabase匿名密钥'
     };
   }
   
   if (supabaseAnonKey.length < 32) {
     return { 
       valid: false, 
       error: 'VITE_SUPABASE_ANON_KEY格式不正确',
       solution: 'Supabase匿名密钥长度应至少为32个字符，请检查配置是否正确'
     };
   }
   
   return { valid: true };
 };
 
 // 检查配置并处理错误
 const configValidation = validateSupabaseConfig();
 
 // 调试环境变量加载情况
 console.log('环境变量加载状态:');
 console.log('VITE_SUPABASE_URL存在:', !!import.meta.env.VITE_SUPABASE_URL);
 console.log('VITE_SUPABASE_ANON_KEY存在:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
 
 if (!configValidation.valid) {
   const errorMessage = `${configValidation.error}\n${configValidation.solution}`;
   console.warn('Supabase配置警告:', errorMessage);
   
   // 显示友好的警告提示，而非错误提示
   toast.warning(`Supabase配置问题:\n${configValidation.error}\n\n解决方法:\n${configValidation.solution}`);
   
   // 提供额外的调试信息
   toast.info('请确保: 1) .env文件在项目根目录 2) 变量名拼写正确 3) 重启开发服务器');
 }
 
 // 显示连接信息
 console.log('正在连接到Supabase:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 添加连接测试函数
export const testSupabaseConnection = async (retries = 2, delay = 1000) => {
  try {
    console.log(`测试Supabase连接 (剩余重试次数: ${retries})...`);
    
    // 1. 环境变量检查
    if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
      const missingVars = [];
      if (!import.meta.env.VITE_SUPABASE_URL) missingVars.push('VITE_SUPABASE_URL');
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY) missingVars.push('VITE_SUPABASE_ANON_KEY');
      
      const errorMsg = `缺少必要的环境变量: ${missingVars.join(', ')}\n请检查项目根目录的.env文件`;
      console.warn('Supabase配置警告:', errorMsg);
      toast.warning(`开发环境配置提示:\n${errorMsg}`);
    }
    
    // 2. 多端点网络连接测试
    const testEndpoints = [
      { url: 'https://api.supabase.co/status', name: 'Supabase状态服务' },
      { url: 'https://supabase.com', name: 'Supabase官网' },
      { url: 'https://google.com', name: '谷歌(用于网络诊断)' }
    ];
    
    const endpointResults = [];
    let allEndpointsFailed = true;
    
    for (const endpoint of testEndpoints) {
      try {
        console.log(`测试连接到${endpoint.name}: ${endpoint.url}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8秒超时
        
        const start = Date.now();
        await fetch(endpoint.url, { 
          method: 'HEAD', 
          signal: controller.signal,
          mode: 'no-cors'
        });
        const duration = Date.now() - start;
        
        clearTimeout(timeoutId);
        endpointResults.push({
          name: endpoint.name,
          status: 'success',
          duration: `${duration}ms`
        });
        allEndpointsFailed = false;
        console.log(`${endpoint.name}连接成功，响应时间: ${duration}ms`);
      } catch (error) {
        const errorType = error.name === 'AbortError' ? '超时' : '失败';
        endpointResults.push({
          name: endpoint.name,
          status: 'failed',
          error: errorType
        });
        console.log(`${endpoint.name}连接${errorType}:`, error.message);
      }
    }
    
    // 显示网络诊断报告
    console.group('网络连接诊断报告');
    endpointResults.forEach(result => {
      console.log(`${result.name}: ${result.status}${result.duration ? ', 响应时间: ' + result.duration : ''}`);
    });
    console.groupEnd();
    
    // 如果所有端点都无法连接，说明用户网络存在问题
    if (allEndpointsFailed) {
      const errorMsg = '所有网络连接测试均失败，请检查您的网络连接';
      console.error('网络连接错误:', errorMsg);
      toast.error(`网络连接问题:\n${errorMsg}\n\n建议:检查防火墙设置/切换网络/重启路由器`);
      
      // 如果还有重试次数，等待后重试
      if (retries > 0) {
        console.log(`等待${delay}ms后重试...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return testSupabaseConnection(retries - 1, delay * 2); // 指数退避重试
      }
      return false;
    }
    
    // 3. 测试数据库连接和权限
    try {
      const { data, error, status, statusText } = await supabase
        .from('hotwords')
        .select('id')
        .limit(1)
        .single();
      
      console.log(`Supabase数据库响应: ${status} ${statusText}`);
      
      if (error) {
        let errorMsg = `数据库访问错误: ${error.message}`;
        let solution = '';
        
        if (error.code === 'PGRST116') {
          // 表为空但连接成功
          toast.info('Supabase连接成功，但hotwords表中没有数据');
          return true;
        } else if (error.message.includes('not found')) {
          solution = '\n请确保Supabase项目中已创建hotwords表并设置了正确的访问权限';
        } else if (error.message.includes('credentials')) {
          solution = '\n请检查您的Supabase匿名密钥是否正确';
        } else if (error.message.includes('connection refused')) {
          solution = '\n连接被拒绝，可能是网络防火墙阻止了连接';
        }
        
        console.error('Supabase数据库错误:', error);
        toast.error(`${errorMsg}${solution}\n\n错误代码: ${error.code}`);
        return false;
      }
      
      console.log('Supabase连接测试成功');
      toast.success('Supabase连接成功');
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '未知数据库错误';
      console.error('Supabase数据库操作失败:', error);
      toast.error(`数据库操作失败: ${errorMsg}`);
      
      // 数据库错误但网络连接正常，仍返回true允许应用部分功能使用
      return true;
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : '未知错误';
    console.error('Supabase连接测试出错:', err);
    
    // 如果还有重试次数，等待后重试
    if (retries > 0) {
      console.log(`连接测试失败，等待${delay}ms后重试...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return testSupabaseConnection(retries - 1, delay * 2); // 指数退避重试
    }
    
    toast.error(`Supabase连接错误: ${errorMsg}\n\n建议操作:1.检查网络 2.验证Supabase配置 3.稍后重试`);
    return false;
  }
}

// 添加手动重试连接函数
export const retrySupabaseConnection = async () => {
  toast.info('正在重新测试Supabase连接...');
  return testSupabaseConnection(2, 1000);
}

// 通用数据获取函数 - 添加详细错误处理
export async function fetchData<T>(table: string): Promise<T[]> {
  try {  
    console.log(`从Supabase表获取数据: ${table}`);  
    
    // 先检查Supabase连接状态
    const isConnected = await testSupabaseConnection();
    if (!isConnected) {
      console.warn(`Supabase未连接，无法获取${table}数据`);
      return [];
    }
    
    // 设置请求超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
    
    const { data, error, status, statusText } = await supabase  
      .from(table)  
      .select('*')  
      .order('id', { ascending: true })
      .abortSignal(controller.signal);
    
    clearTimeout(timeoutId);
    
    console.log(`Supabase响应状态: ${status} ${statusText}`);
    
    if (error) {
      console.error(`Supabase错误详情:`, error);
      
      // 处理不同类型的错误
      if (error.message.includes('Failed to fetch')) {
        throw new Error(`网络请求失败，请检查您的网络连接 (代码: NETWORK_ERROR)`);
      } else if (error.message.includes('aborted')) {
        throw new Error(`请求超时，请稍后重试 (代码: TIMEOUT)`);
      } else if (error.code === 'PGRST116') {
        // 没有找到数据，不抛出错误
        console.warn(`表${table}中没有找到数据`);
        return [];
      } else if (error.code === '42501') {
        throw new Error(`权限不足，无法访问${table}表 (代码: PERMISSION_DENIED)`);
      } else {
        throw new Error(`Supabase错误: ${error.message} (代码: ${error.code})`);
      }
    }
    
    // 检查是否返回了数据  
    if (!data || data.length === 0) {  
      console.warn(`表${table}中没有找到数据`);  
      // 不抛出错误，而是返回空数组，让调用者处理空数据情况  
      return [];  
    }  
    
    console.log(`成功从${table}获取${data.length}条记录`);
    return data as T[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    console.error(`获取${table}错误:`, errorMessage, error);
    toast.error(`加载${table.replace('_', ' ')}数据失败: ${errorMessage}`);
    
    // 在开发环境下显示更详细的错误信息
    if (import.meta.env.DEV) {
      toast.error(`开发环境错误详情: ${JSON.stringify(error)}`);
    }
    
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

    if (error) {
      if (error.code === 'PGRST116') {
        // 没有找到数据
        console.log(`在${table}中未找到id为${id}的数据`);
        return null;
      }
      throw error;
    }
    return data as T;
  } catch (error) {
    console.error(`获取${table}中id为${id}的数据错误:`, error);
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
    console.error(`向${table}添加数据错误:`, error);
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
    console.error(`更新${table}中id为${id}的数据错误:`, error);
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
    console.error(`删除${table}中id为${id}的数据错误:`, error);
    toast.error('删除数据失败');
    throw error;
  }
}