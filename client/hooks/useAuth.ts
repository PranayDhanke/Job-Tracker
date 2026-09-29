import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useAuth as useAuthContext } from '@/features/auth/AuthContext';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: () => api.me(),
    retry: false,
    staleTime: 1000 * 60 * 10,
    // Disable during static generation
    enabled: typeof window !== 'undefined',
  });
}

export function useLogin() {
  const router = useRouter();
  const { login: contextLogin } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) => api.login(data),
    onSuccess: async (data: any) => {
      await contextLogin(data.email, data.password);
      queryClient.invalidateQueries({ queryKey: ['user', 'current'] });
      router.push('/dashboard');
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const { register: contextRegister } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string; passwordConfirm: string }) => api.register(data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'current'] });
      router.push('/dashboard');
    },
  });
}

export function useLogout() {
  const { logout } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => Promise.resolve(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      router.push('/login');
    },
  });
}
