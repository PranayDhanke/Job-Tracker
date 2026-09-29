'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

const applicationSchema = z.object({
  jobId: z.string().min(1, 'Job is required'),
  status: z.enum(['Saved', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn']),
  appliedDate: z.date().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const jobs = [
  { id: '1', title: 'Backend Engineer at Google' },
  { id: '2', title: 'Software Engineer at Stripe' },
  { id: '3', title: 'Frontend Developer at Microsoft' },
  { id: '4', title: 'DevOps Engineer at Amazon' },
];

export default function EditApplicationPage() {
  const { id } = useParams();
  const router = useRouter();

  const application = {
    id: Number(id),
    jobId: '1',
    status: 'Interview' as const,
    appliedDate: new Date(2026, 8, 20),
  };

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      jobId: application.jobId,
      status: application.status,
      appliedDate: application.appliedDate,
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    console.log('Updating application:', data);
    router.push(`/applications/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Edit Application</h1>
        <Button variant="outline" onClick={() => router.push(`/applications/${id}`)}>Cancel</Button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="jobId" className="mb-2 block text-sm font-medium text-text">Job</label>
          <Select onValueChange={(value) => form.setValue('jobId', value)} defaultValue={application.jobId}>
            <SelectTrigger><SelectValue placeholder="Select a job" /></SelectTrigger>
            <SelectContent>
              {jobs.map((job) => <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>)}
            </SelectContent>
          </Select>
          {form.formState.errors.jobId && <p className="text-sm text-error">{form.formState.errors.jobId.message}</p>}
        </div>

        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-medium text-text">Status</label>
          <Select onValueChange={(value) => form.setValue('status', value as any)} defaultValue={application.status}>
            <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Saved">Saved</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Screening">Screening</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Withdrawn">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="appliedDate" className="mb-2 block text-sm font-medium text-text">Applied Date</label>
          <DatePicker id="appliedDate" {...form.register('appliedDate')} />
        </div>

        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </div>
  );
}
