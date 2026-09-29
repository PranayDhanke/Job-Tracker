'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, MapPin, Link, Calendar } from 'lucide-react';

export default function JobDetailsPage() {
  const { id } = useParams();

  // Mock job data
  const job = {
    id: Number(id),
    company: 'Google',
    role: 'Backend Engineer',
    location: 'Mountain View, CA',
    description: 'We are looking for a backend engineer to join our team. You will be responsible for developing and maintaining our cloud infrastructure.',
    jobUrl: 'https://careers.google.com/jobs/results/1234567890/backend-engineer',
    employmentType: 'Full-time',
    salaryMin: 120000,
    salaryMax: 160000,
    source: 'LinkedIn',
    createdAt: new Date(2026, 8, 20),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">{job.company}</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Job
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Job
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            Create Application
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-lg font-medium text-text">{job.role}</div>
        <div className="flex items-center space-x-4 text-sm text-muted-text">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
          <Link className="h-4 w-4" />
          <span>{job.source}</span>
          <Calendar className="h-4 w-4" />
          <span>{job.createdAt.toLocaleDateString()}</span>
        </div>
        <div className="mt-4">
          <label htmlFor="salary" className="mb-1 block text-sm font-medium text-text">
            Salary
          </label>
          <p className="text-lg font-medium text-text">
            ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
          </p>
        </div>
        <div className="mt-4">
          <label htmlFor="employmentType" className="mb-1 block text-sm font-medium text-text">
            Employment Type
          </label>
          <p className="text-lg font-medium text-text">{job.employmentType}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-text">
            Description
          </label>
          <p className="text-muted-text">{job.description}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="jobUrl" className="mb-1 block text-sm font-medium text-text">
            Job URL
          </label>
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View Job Posting
          </a>
        </div>
      </div>
    </div>
  );
}
