"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'font-nunito text-[14px]',
          style: {
            borderRadius: '8px',
            background: '#fff',
            color: '#0a1413',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          },
          success: {
            iconTheme: { primary: '#3FA34D', secondary: '#fff' }
          },
          error: {
            iconTheme: { primary: '#DC2626', secondary: '#fff' }
          }
        }}
      />
    </AuthProvider>
  );
}
