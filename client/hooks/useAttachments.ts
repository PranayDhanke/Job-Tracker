import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useAttachments(applicationId: string) {
  return useQuery({
    queryKey: ['attachments', applicationId],
    queryFn: () => api.attachments.list(applicationId),
    enabled: !!applicationId,
  });
}

export function useUploadAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, formData }: { applicationId: string; formData: FormData }) => api.attachments.upload(applicationId, formData),
    onSuccess: (_, { applicationId }) => {
      queryClient.invalidateQueries({ queryKey: ['attachments', applicationId] });
    },
  });
}

export function useDeleteAttachment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.attachments.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attachments'] });
    },
  });
}
