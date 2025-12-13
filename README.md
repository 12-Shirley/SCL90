# SCL-90 心理健康自评量表测评系统

一个基于 Next.js 的兑换码验证和心理健康测评系统，集成了 Supabase 数据库。

## 功能特性

- ✅ **兑换码验证系统**：通过 Supabase 验证兑换码，每个兑换码仅限使用一次
- ✅ **SCL-90 心理健康测评**：完整的 90 道题目测评流程
- ✅ **结果分析**：详细的测评结果展示和解读
- ✅ **响应式设计**：支持移动端和桌面端

## 技术栈

- **框架**：Next.js 16
- **UI 组件**：shadcn/ui + Radix UI
- **样式**：Tailwind CSS
- **数据库**：Supabase
- **语言**：TypeScript

## 环境配置

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件并添加以下变量：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
SUPABASE_SERVICE_KEY=你的Supabase服务密钥
```

### 3. Supabase 数据库配置

在 Supabase 中创建表 `SCL90`，包含以下字段：

- `code` (text) - 兑换码
- `is_used` (boolean) - 是否已使用
- `created_at` (timestamp) - 创建时间（可选）

## 开发

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
4. 部署完成

## 项目结构

```
app/
├── api/
│   └── redeem/          # 兑换码验证 API
├── components/
│   ├── RedeemForm.tsx   # 兑换码表单
│   ├── AssessmentPage.tsx # 测评页面
│   └── scl90/          # SCL-90 测评组件
└── page.tsx            # 主页面
lib/
└── scl90-data.ts       # 测评数据和计算逻辑
```

## 注意事项

- ⚠️ **不要提交 `.env.local` 文件**：该文件包含敏感信息，已在 `.gitignore` 中排除
- ⚠️ **兑换码仅限使用一次**：每个兑换码验证成功后会被标记为已使用
- ⚠️ **生产环境部署前**：确保在部署平台正确配置环境变量

## License

MIT
