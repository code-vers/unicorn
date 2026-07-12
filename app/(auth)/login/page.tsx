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
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

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
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col space-y-3 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Welcome back
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Please enter your details to sign in.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="text-red-600 text-sm bg-red-50/80 backdrop-blur-sm p-4 rounded-xl border border-red-100 flex items-center font-medium animate-in fade-in zoom-in duration-300">
            {error}
          </div>
        )}
        
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-gray-700 font-semibold text-sm ml-1">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#40A853] transition-colors duration-300" />
            <Input 
              id="email" 
              type="email" 
              placeholder="john@example.com" 
              className="h-14 pl-12 bg-gray-50/50 border-gray-200 focus-visible:border-[#40A853] focus-visible:ring-[#40A853]/20 focus-visible:ring-4 transition-all rounded-xl text-base shadow-sm"
              {...register('email')} 
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 ml-1 font-medium animate-in slide-in-from-top-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between ml-1">
            <Label htmlFor="password" className="text-gray-700 font-semibold text-sm">Password</Label>
            <Link href="/forgot-password" className="text-sm text-[#40A853] hover:text-[#2E7D32] hover:underline font-semibold transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#40A853] transition-colors duration-300" />
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="h-14 pl-12 bg-gray-50/50 border-gray-200 focus-visible:border-[#40A853] focus-visible:ring-[#40A853]/20 focus-visible:ring-4 transition-all rounded-xl text-base shadow-sm"
              {...register('password')} 
            />
          </div>
          {errors.password && <p className="text-sm text-red-500 ml-1 font-medium animate-in slide-in-from-top-1">{errors.password.message}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 bg-gradient-to-r from-[#40A853] to-[#2E7D32] hover:from-[#348e44] hover:to-[#236427] text-white font-bold text-base rounded-xl transition-all duration-300 shadow-lg shadow-[#40A853]/30 hover:shadow-[#40A853]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="relative flex items-center justify-center py-4 opacity-70 hover:opacity-100 transition-opacity">
        <div className="absolute border-t border-gray-200 w-full"></div>
        <div className="relative bg-white px-4 text-sm text-gray-500 font-medium">Or continue with</div>
      </div>

      <p className="text-center text-[15px] text-gray-600 font-medium">
        Don't have an account?{' '}
        <Link href="/register" className="text-[#40A853] hover:text-[#2E7D32] hover:underline font-bold transition-colors">
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
