// app/page.tsx

'use client'; 

import { useState } from 'react';
import RedeemForm from './components/RedeemForm';
import AssessmentPage from './components/AssessmentPage';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);

  const handleRedeemSuccess = () => {
    setIsVerified(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {!isVerified ? (
        // 显示兑换码表单
        <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
          <div className="z-10 w-full max-w-md">
            <RedeemForm onSuccess={handleRedeemSuccess} />
          </div>
        </div>
      ) : (
        // 显示测评页面
        <AssessmentPage />
      )}
    </main>
  );
}
