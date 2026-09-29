'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirm: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between mb-4">
          <a href="/" className="text-xl font-bold text-primary">
            Trackly
          </a>
          <a href="/login" className="text-sm text-muted-text hover:text-text">
            Already have an account? Sign in
          </a>
        </div>
        <h2 className="text-2xl font-bold text-text">
          Create your account
        </h2>
        <p className="text-muted-text">
          Every great career starts somewhere.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-text">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-error">{form.formState.errors.name.message}</p>
            )}
          </div>
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
          <div>
            <label htmlFor="passwordConfirm" className="mb-2 block text-sm font-medium text-text">
              Confirm Password
            </label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm your password"
              {...form.register('passwordConfirm')}
            />
            {form.formState.errors.passwordConfirm && (
              <p className="text-sm text-error">{form.formState.errors.passwordConfirm.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <p className="text-center text-muted-text">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
