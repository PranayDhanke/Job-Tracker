'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between mb-4">
          <a href="/" className="text-xl font-bold text-primary">
            Trackly
          </a>
          <a href="/register" className="text-sm text-muted-text hover:text-text">
            Create account
          </a>
        </div>
        <h2 className="text-2xl font-bold text-text">
          Sign in to Trackly
        </h2>
        <p className="text-muted-text">
          Every great career starts somewhere.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-text">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-error">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-text">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-error">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
        <p className="text-center text-muted-text">
          Don't have an account?{' '}
          <a href="/register" className="text-text hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
