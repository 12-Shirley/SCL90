import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 确保环境变量在运行时可用
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
  // Cloudflare Pages 兼容性配置
  output: 'standalone',
};

export default nextConfig;
