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


const verifyCodeSchema = z.object({
  email: z.string().email(),
  resetCode: z.string().min(1, "Reset code is required"),
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;

function VerifyResetContent() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: emailParam,
    }
  });

  const onSubmit = async (data: VerifyCodeFormValues) => {
    setError('');
    try {
      await apiClient.post('/auth/verify-reset-code', data);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}&code=${encodeURIComponent(data.resetCode)}`);
      }, 1000);
    } catch (err: any) {
      setError(extractErrorMessage(err, 'Invalid or expired reset code.'));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl">Verify Code</CardTitle>
        <CardDescription className="text-center">Enter the code sent to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-green-600 text-sm bg-green-50 p-4 rounded border border-green-200 text-center">
            Code verified! Redirecting to set new password...
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}
            
            {/* Hidden email field to pass along the email */}
            <input type="hidden" {...register('email')} />
            
            <div className="space-y-2">
              <Label htmlFor="resetCode">Reset Code</Label>
              <Input id="resetCode" placeholder="Enter code" {...register('resetCode')} />
              {errors.resetCode && <p className="text-sm text-red-500">{errors.resetCode.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
          Didn't receive a code? <Link href="/forgot-password" className="text-blue-600 hover:underline font-medium">Try again</Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function VerifyResetPage() {
  return (
    <Suspense fallback={<Spinner size="md" centered />}>
      <VerifyResetContent />
    </Suspense>
  );
}
