# 中文学习平台

这是一个学习中文网络热词和文化的平台，包含以下功能：
- 热词学习
- 文化对比
- 梗图分享
- 学习社区
- 后台管理系统

## 本地开发

```bash
pnpm install
pnpm dev
```

## 部署到Vercel指南

### 准备工作
1. 注册Vercel账号（https://vercel.com）
2. 安装Vercel CLI（可选）：
```bash
npm install -g vercel
```

### 部署步骤
1. 将代码推送到GitHub/GitLab仓库
2. 登录Vercel控制台
3. 点击"New Project"导入你的仓库
4. 配置项目设置：
   - Framework Preset: Vite
   - Build Command: pnpm build
   - Output Directory: dist/static
   - Install Command: pnpm install
5. 点击Deploy

### 环境变量（如需）
如果添加了后端服务，需要在Vercel中设置：
- 项目设置 → Environment Variables
- 添加必要的变量如数据库连接等

### 注意事项
1. 后台管理路由(/admin)建议添加访问限制
2. 免费版有带宽和功能限制
3. 建议绑定自定义域名提升专业性

## 测试账号
- 前台用户：user / user123
- 后台管理：admin / admin123
