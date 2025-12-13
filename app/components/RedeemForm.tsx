// app/components/RedeemForm.tsx

'use client';

import { useState } from 'react';
import React from 'react';

interface RedeemFormProps {
  onSuccess?: () => void;
}

export default function RedeemForm({ onSuccess }: RedeemFormProps) {
  const [code, setCode] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('验证中...');

    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const responseData = await response.json().catch(() => ({ message: '无法解析服务器响应。' }));
      
      if (response.status === 200) {
        setStatusMessage(responseData.message || '兑换成功！');
        // 延迟一下再调用回调，让用户看到成功消息
        setTimeout(() => {
          onSuccess?.();
        }, 1000);
      } else {
        // 显示服务器返回的详细错误信息
        setStatusMessage(responseData.message || '兑换失败，请检查兑换码。');
      }
    } catch (error) {
      console.error('兑换请求失败:', error);
      setStatusMessage('网络错误，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-2 text-card-foreground">
          兑换码仅限用1次
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          （如有疑问请联系小红书客服）
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="code" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              兑换码
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
              placeholder="请输入兑换码"
              className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? '验证中...' : '验证'}
          </button>
        </form>

        {statusMessage && (
          <div className={`mt-4 p-3 rounded-md text-center ${
            statusMessage === '兑换成功！' 
              ? 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20' 
              : 'bg-destructive/10 text-destructive border border-destructive/20'
          }`}>
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}