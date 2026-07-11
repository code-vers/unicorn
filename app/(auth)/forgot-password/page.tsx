"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient, extractErrorMessage } from '@/lib/api-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl">Forgot Password</CardTitle>
        <CardDescription className="text-center">Enter your email to receive a reset code.</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-green-600 text-sm bg-green-50 p-4 rounded border border-green-200 text-center">
            Reset code sent! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending code...' : 'Send reset code'}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
          Remember your password? <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
