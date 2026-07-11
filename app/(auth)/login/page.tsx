"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient, extractErrorMessage } from '@/lib/api-client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError('');
    try {
      const response = await apiClient.post('/auth/login', data);
      const { token, user } = response.data.data || response.data;
      login(token, user);
    } catch (err: any) {
      setError(extractErrorMessage(err, 'Failed to login. Please try again.'));
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
        <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 flex items-center font-medium">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@example.com" 
            className="h-12 bg-gray-50/50 border-gray-200 focus-visible:border-[#40A853] focus-visible:ring-[#40A853] transition-all rounded-xl"
            {...register('email')} 
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Link href="/forgot-password" className="text-sm text-[#40A853] hover:text-[#2E7D32] hover:underline font-medium transition-colors">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            className="h-12 bg-gray-50/50 border-gray-200 focus-visible:border-[#40A853] focus-visible:ring-[#40A853] transition-all rounded-xl"
            {...register('password')} 
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-[#40A853] hover:bg-[#348e44] text-white font-semibold text-[15px] rounded-xl transition-all shadow-lg shadow-[#40A853]/20" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="text-[#40A853] hover:text-[#2E7D32] hover:underline font-semibold transition-colors">
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
