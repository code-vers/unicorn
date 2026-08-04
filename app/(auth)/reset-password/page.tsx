"use client";

import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient, extractErrorMessage } from '@/lib/api-client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';


const resetPasswordSchema = z.object({
  email: z.string().email(),
  resetCode: z.string().min(1),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const codeParam = searchParams.get('code') || '';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailParam,
      resetCode: codeParam,
    }
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setError('');
    try {
      await apiClient.post('/auth/reset-password', data);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(extractErrorMessage(err, 'Failed to reset password. The code might be expired.'));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl">Set New Password</CardTitle>
        <CardDescription className="text-center">Enter your new secure password.</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-green-600 text-sm bg-green-50 p-4 rounded border border-green-200 text-center">
            Password reset successfully! Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}
            
            <input type="hidden" {...register('email')} />
            <input type="hidden" {...register('resetCode')} />
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" {...register('newPassword')} />
              {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/login" className="text-sm text-blue-600 hover:underline font-medium">Return to login</Link>
      </CardFooter>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Spinner size="md" centered />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
