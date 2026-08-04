"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient, extractErrorMessage } from '@/lib/api-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';


const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setError('');
    setSuccess(false);
    try {
      await apiClient.post('/auth/forgot-password', data);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/verify-reset?email=${encodeURIComponent(data.email)}`);
      }, 2000);
    } catch (err: any) {
      setError(extractErrorMessage(err, 'Failed to send reset code. Please try again.'));
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <Link href="/login" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#40A853] transition-colors w-fit group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to login
      </Link>

      <div className="flex flex-col space-y-3 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Forgot Password
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      {success ? (
        <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-green-900">Reset code sent!</h3>
          <p className="text-green-700 font-medium">Please check your email. Redirecting you shortly...</p>
        </div>
      ) : (
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

          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-[#40A853] to-[#2E7D32] hover:from-[#348e44] hover:to-[#236427] text-white font-bold text-base rounded-xl transition-all duration-300 shadow-lg shadow-[#40A853]/30 hover:shadow-[#40A853]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner size="sm" variant="white" />
            ) : (
              'Send reset instructions'
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
