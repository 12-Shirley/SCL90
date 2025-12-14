# Cloudflare Pages 部署指南

## 部署步骤

### 1. 在 Cloudflare Pages 中创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → **Create a project**
3. 选择 **Connect to Git**
4. 连接你的 GitHub 仓库：`12-Shirley/SCL90`
5. 选择分支：`main`

### 2. 配置构建设置

**Framework preset**: Next.js (Static HTML Export) 或 Next.js

**Build command**: 
```bash
npm run build
```

**Build output directory**: 
```
.next
```

**Root directory**: 
```
/
```

### 3. 配置环境变量（重要！）

在 Cloudflare Pages 项目设置中，进入 **Settings** → **Environment variables**，添加：

**生产环境变量：**

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: 你的 Supabase 项目 URL
   - Environment: Production, Preview, Development（全部勾选）

2. **SUPABASE_SERVICE_KEY**
   - Value: 你的 Supabase Service Key
   - Environment: Production, Preview, Development（全部勾选）

### 4. 重新部署

配置完环境变量后，点击 **Retry deployment** 或触发新的部署。

## 常见问题

### 问题 1: "服务器配置错误"

**原因**: 环境变量未正确配置

**解决方案**:
1. 检查 Cloudflare Pages 的环境变量设置
2. 确保变量名称完全匹配（区分大小写）
3. 确保所有环境（Production, Preview, Development）都已配置
4. 重新部署项目

### 问题 2: API 路由不工作

**原因**: Cloudflare Pages 对 Next.js API 路由的支持可能需要特殊配置

**解决方案**:
- 确保使用 Next.js 的 Edge Runtime 或 Node.js Runtime
- 检查 Cloudflare Pages 的 Functions 设置

### 问题 3: 环境变量在构建时不可用

**原因**: 某些环境变量只在运行时可用

**解决方案**:
- `NEXT_PUBLIC_*` 前缀的变量会在构建时和运行时都可用
- 其他变量只在运行时可用（API 路由中）

## 验证部署

部署成功后，访问你的域名，测试：
1. 页面是否能正常打开
2. 兑换码验证功能是否正常
3. 查看 Cloudflare Pages 的 Functions 日志

## 获取 Supabase 凭证

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 进入 **Settings** → **API**
4. 复制：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key → `SUPABASE_SERVICE_KEY`（注意：使用 service_role，不是 anon key）
