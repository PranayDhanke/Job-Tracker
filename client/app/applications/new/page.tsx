'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

const applicationSchema = z.object({
  jobId: z.string().min(1, 'Job is required'),
  status: z.enum(['Saved', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn']),
  appliedDate: z.date().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

// Mock jobs data
const jobs = [
  { id: '1', title: 'Backend Engineer at Google' },
  { id: '2', title: 'Software Engineer at Stripe' },
  { id: '3', title: 'Frontend Developer at Microsoft' },
  { id: '4', title: 'DevOps Engineer at Amazon' },
];

export default function NewApplicationPage() {
  const router = useRouter();
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      jobId: '',
      status: 'Saved',
      appliedDate: undefined,
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    // TODO: Call API to create application
    console.log('Creating application:', data);
    router.push('/applications');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">New Application</h1>
        <Button variant="outline" onClick={() => router.push('/applications')}>
          Cancel
        </Button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="jobId" className="mb-2 block text-sm font-medium text-text">
            Job
          </label>
          <Select
            id="jobId"
            {...form.register('jobId')}
          >
            <option value="">Select a job</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </Select>
          {form.formState.errors.jobId && (
            <p className="text-sm text-error">{form.formState.errors.jobId.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-medium text-text">
            Status
          </label>
          <Select
            id="status"
            {...form.register('status')}
          >
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
          </Select>
        </div>

        <div>
          <label htmlFor="appliedDate" className="mb-2 block text-sm font-medium text-text">
            Applied Date
          </label>
          <DatePicker
            id="appliedDate"
            {...form.register('appliedDate')}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Application
        </Button>
      </form>
    </div>
  );
}
