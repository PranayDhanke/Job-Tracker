'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const jobSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  location: z.string().optional(),
  jobUrl: z.string().url('Invalid URL').optional(),
  description: z.string().optional(),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary']).optional(),
  salaryMin: z.number().min(0, 'Salary must be positive').optional(),
  salaryMax: z.number().min(0, 'Salary must be positive').optional(),
  source: z.enum(['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'Other']).optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function NewJobPage() {
  const router = useRouter();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: '',
      jobTitle: '',
      location: '',
      jobUrl: '',
      description: '',
      employmentType: undefined,
      salaryMin: undefined,
      salaryMax: undefined,
      source: undefined,
    },
  });

  const onSubmit = async (data: JobFormValues) => {
    console.log('Creating job:', data);
    router.push('/jobs');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">New Job</h1>
        <Button variant="outline" onClick={() => router.push('/jobs')}>
          Cancel
        </Button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-text">
              Company
            </label>
            <Input
              id="company"
              placeholder="Enter company name"
              {...form.register('company')}
            />
            {form.formState.errors.company && (
              <p className="text-sm text-error">{form.formState.errors.company.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="jobTitle" className="mb-2 block text-sm font-medium text-text">
              Job Title
            </label>
            <Input
              id="jobTitle"
              placeholder="Enter job title"
              {...form.register('jobTitle')}
            />
            {form.formState.errors.jobTitle && (
              <p className="text-sm text-error">{form.formState.errors.jobTitle.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="location" className="mb-2 block text-sm font-medium text-text">
              Location
            </label>
            <Input
              id="location"
              placeholder="Enter location (e.g., New York, NY)"
              {...form.register('location')}
            />
          </div>
          <div>
            <label htmlFor="jobUrl" className="mb-2 block text-sm font-medium text-text">
              Job URL
            </label>
            <Input
              id="jobUrl"
              placeholder="Enter job URL (optional)"
              {...form.register('jobUrl')}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-text">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter job description (optional)"
            {...form.register('description')}
            className="h-48"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="employmentType" className="mb-2 block text-sm font-medium text-text">
              Employment Type
            </label>
            <Select onValueChange={(value) => form.setValue('employmentType', value as any)} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="salaryMin" className="mb-2 block text-sm font-medium text-text">
              Minimum Salary
            </label>
            <Input
              id="salaryMin"
              type="number"
              placeholder="Enter minimum salary"
              {...form.register('salaryMin', { valueAsNumber: true })}
            />
          </div>
          <div>
            <label htmlFor="salaryMax" className="mb-2 block text-sm font-medium text-text">
              Maximum Salary
            </label>
            <Input
              id="salaryMax"
              type="number"
              placeholder="Enter maximum salary"
              {...form.register('salaryMax', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="source" className="mb-2 block text-sm font-medium text-text">
              Source
            </label>
            <Select onValueChange={(value) => form.setValue('source', value as any)} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Indeed">Indeed</SelectItem>
                <SelectItem value="Company Website">Company Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Create Job
        </Button>
      </form>
    </div>
  );
}
