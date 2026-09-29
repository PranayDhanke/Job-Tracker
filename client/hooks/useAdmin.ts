import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useAdminUsers(params?: Record<string, any>) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => api.admin.users(params),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => api.admin.stats(),
  });
}
