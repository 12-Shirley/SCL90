// app/api/redeem/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// 创建 Supabase 客户端的辅助函数
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  try {
    // 检查环境变量（添加详细日志）
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    
    console.log('环境变量检查:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '已设置' : '未设置');
    console.log('SUPABASE_SERVICE_KEY:', supabaseKey ? '已设置' : '未设置');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
      console.error('SUPABASE_SERVICE_KEY:', supabaseKey ? '***已设置***' : '未设置');
      
      return NextResponse.json({ 
        success: false, 
        message: '服务器配置错误，请联系管理员。',
        debug: process.env.NODE_ENV === 'development' ? {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        } : undefined
      }, { status: 500 });
    }

    // 在函数内部初始化 Supabase 客户端（避免构建时错误）
    const supabase = getSupabaseClient();

    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ success: false, message: '请输入兑换码。' }, { status: 400 });
    }

    const redeemCode = String(code).trim();
    console.log('验证兑换码（原始）:', redeemCode);
    
    // 尝试多种大小写组合查询
    const codeVariants = [
      redeemCode,                    // 原始输入
      redeemCode.toUpperCase(),      // 全大写
      redeemCode.toLowerCase(),      // 全小写
    ];
    
    console.log('尝试查询的兑换码变体:', codeVariants);

    // 1. 查询兑换码是否存在（尝试不同大小写）
    let redeemData = null;
    let checkError = null;
    
    for (const codeVariant of codeVariants) {
      const { data, error } = await supabase
        .from('SCL90') 
        .select('code, is_used')
        .eq('code', codeVariant)
        .maybeSingle();
      
      if (error) {
        console.error(`查询兑换码 "${codeVariant}" 时出错:`, error);
        checkError = error;
        break;
      }
      
      if (data) {
        console.log(`找到兑换码: "${codeVariant}"`, data);
        redeemData = data;
        break;
      }
    }

    if (checkError) {
      console.error('查询兑换码时出错:', checkError);
      return NextResponse.json({ 
        success: false, 
        message: '查询兑换码时出错，请稍后重试。' 
      }, { status: 500 });
    }

    // 2. 检查兑换码是否存在
    if (!redeemData) {
      console.log('兑换码不存在，尝试过的变体:', codeVariants);
      // 额外查询：列出所有兑换码（仅用于调试）
      const { data: allCodes } = await supabase
        .from('SCL90')
        .select('code')
        .limit(5);
      console.log('数据库中的前5个兑换码示例:', allCodes);
      
      return NextResponse.json({ 
        success: false, 
        message: '兑换码不存在，请检查输入是否正确。' 
      }, { status: 400 });
    }

    // 3. 检查是否已使用
    if (redeemData.is_used) {
      console.log('兑换码已使用:', redeemCode);
      return NextResponse.json({ 
        success: false, 
        message: '该兑换码已被使用，每个兑换码仅限使用一次。' 
      }, { status: 400 });
    }

    // 4. 找到有效码，执行更新操作（使用数据库中实际存储的 code 值）
    const { error: updateError } = await supabase
      .from('SCL90') 
      .update({ is_used: true })
      .eq('code', redeemData.code); 

    if (updateError) {
      console.error('更新兑换码状态时出错:', updateError);
      return NextResponse.json({ 
        success: false, 
        message: '标记兑换码为已使用失败，请稍后重试。' 
      }, { status: 500 });
    }

    console.log('兑换码验证成功:', redeemCode);
    // 5. 成功返回
    return NextResponse.json({ success: true, message: '兑换成功！' }, { status: 200 });

  } catch (error) {
    console.error('API 处理错误:', error);
    return NextResponse.json({ 
      success: false, 
      message: '服务器内部错误，请稍后重试。' 
    }, { status: 500 });
  }
}