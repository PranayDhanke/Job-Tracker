import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useNotes(applicationId: string) {
  return useQuery({
    queryKey: ['notes', applicationId],
    queryFn: () => api.notes.list(applicationId),
    enabled: !!applicationId,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, data }: { applicationId: string; data: any }) => api.notes.create(applicationId, data),
    onSuccess: (_, { applicationId }) => {
      queryClient.invalidateQueries({ queryKey: ['notes', applicationId] });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.notes.update(id, data),
    onSuccess: (_, { id }) => {
      // We don't know the applicationId here, so we invalidate all notes queries
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.notes.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
