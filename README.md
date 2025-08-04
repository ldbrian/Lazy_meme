# 中文学习平台 - 数据库配置指南

## 外部数据库配置步骤

### 1. 选择数据库服务提供商
推荐使用以下任一托管数据库服务:
- MongoDB Atlas (文档数据库，适合本项目)
- Supabase (PostgreSQL，带REST API)
- Firebase Firestore (文档数据库)
- PlanetScale (MySQL兼容)

### 2. 环境变量配置
1. 复制环境变量示例文件创建实际环境变量文件:
   ```bash
   cp .env.example .env
   ```

2. 编辑.env文件，填入你的数据库连接信息:
   ```
   VITE_API_URL=你的API基础URL
   VITE_DB_API_KEY=你的数据库API密钥
   ```

### 3. 数据库结构设计
推荐创建以下集合/表:

#### hotwords (热词)
```json
{
  "id": "number",
  "chinese": "string",
  "pinyin": "string",
  "english": "string",
  "videoUrl": "string",
  "scenarios": ["string"],
  "usages": ["string"],
  "difficulty": "number",
  "relatedWords": ["number"]
}
```

#### memes (梗图)
```json
{
  "id": "number",
  "imageUrl": "string",
  "title": "string",
  "chineseDesc": "string",
  "englishDesc": "string",
  "culturalAnalysis": "string",
  "relatedWords": ["number"]
}
```

#### culture (文化内容)
```json
{
  "id": "number",
  "title": "string",
  "summary": "string",
  "imageUrl": "string"
}
```

### 4. API服务部署
如果使用MongoDB或其他没有直接REST API的数据库，需要部署中间层API:

1. 可以使用以下服务快速部署API:
   - MongoDB Atlas App Services
   - Supabase Edge Functions
   - Vercel Functions
   - Cloudflare Workers

2. API端点应与src/services/api.ts中定义的接口匹配

### 5. 数据迁移
将mockData.ts中的示例数据导入到你的数据库中:
- 使用数据库提供商的导入工具
- 编写简单的脚本导入数据
- 使用API批量创建接口导入

## 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 部署到Vercel
```bash
# 安装Vercel CLI
npm install -g vercel

# 部署
vercel
```

在Vercel部署设置中，需要配置相应的环境变量以匹配.env文件中的配置。

## 故障排除
- 如果遇到数据库连接问题，请检查环境变量配置
- API请求失败时，系统会自动使用本地备份数据
- 查看浏览器控制台和Vercel日志获取详细错误信息
