# 腾讯云 Serverless 部署指南

## 方式一：使用 Serverless Framework（推荐）

### 1. 安装 Serverless Framework

```bash
npm install -g serverless
```

### 2. 安装腾讯云组件

```bash
npm install -g @serverless/tencent-nextjs
```

### 3. 配置腾讯云凭证

```bash
# 配置腾讯云账号信息
serverless login
```

或者手动配置环境变量：

```bash
export TENCENT_SECRET_ID=你的SecretId
export TENCENT_SECRET_KEY=你的SecretKey
```

### 4. 配置环境变量

在项目根目录创建 `.env` 文件（或使用已有的 `.env.local`）：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase URL
SUPABASE_SERVICE_KEY=你的Supabase Service Key
```

### 5. 部署

```bash
# 部署到开发环境
serverless deploy

# 部署到生产环境
serverless deploy --stage prod
```

## 方式二：使用腾讯云控制台（Web 控制台）

### 1. 构建项目

```bash
npm run build
```

### 2. 打包部署文件

```bash
# 创建部署包（排除不需要的文件）
zip -r deploy.zip .next public package.json package-lock.json -x "*.git*" -x "node_modules/*" -x ".env*"
```

### 3. 在腾讯云控制台部署

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/)
2. 进入 **云函数 SCF** 或 **Serverless Framework**
3. 创建新函数或服务
4. 上传部署包
5. 配置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
6. 配置触发器（API 网关）

## 方式三：使用腾讯云 Next.js 应用模板

腾讯云提供了专门的 Next.js 部署方案，可以：

1. 在 [Serverless 应用中心](https://console.cloud.tencent.com/sls) 选择 Next.js 模板
2. 连接 GitHub 仓库自动部署
3. 配置环境变量

## 注意事项

1. **环境变量**：确保在腾讯云控制台或 serverless.yml 中正确配置环境变量
2. **API 路由**：Next.js API 路由会自动转换为云函数
3. **静态资源**：建议使用腾讯云 COS 存储静态资源
4. **域名配置**：可以在 serverless.yml 中配置自定义域名

## 获取腾讯云凭证

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/)
2. 进入 [访问管理](https://console.cloud.tencent.com/cam/capi)
3. 创建 API 密钥
4. 获取 SecretId 和 SecretKey
