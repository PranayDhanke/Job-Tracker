'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronLeft, ChevronRight, Search, Sliders, Plus, Eye, Edit, Trash2, ArrowRightLeft } from 'lucide-react';

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'company'>('newest');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Mock data
  const allJobs = [
    {
      id: 1,
      company: 'Google',
      role: 'Backend Engineer',
      location: 'Mountain View, CA',
      source: 'LinkedIn',
      createdAt: new Date(2026, 8, 20),
    },
    {
      id: 2,
      company: 'Stripe',
      role: 'Software Engineer',
      location: 'Remote',
      source: 'Indeed',
      createdAt: new Date(2026, 8, 18),
    },
    {
      id: 3,
      company: 'Microsoft',
      role: 'Frontend Developer',
      location: 'Seattle, WA',
      source: 'Company Website',
      createdAt: new Date(2026, 8, 15),
    },
    {
      id: 4,
      company: 'Amazon',
      role: 'DevOps Engineer',
      location: 'New York, NY',
      source: 'Referral',
      createdAt: new Date(2026, 8, 10),
    },
  ];

  const filteredJobs = allJobs
    .filter((job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())
    )
    .filter((job) => {
      if (filterStatus === 'active') return true; // Simplified
      if (filterStatus === 'archived') return false; // Simplified
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt.getTime() - a.createdAt.getTime();
      if (sortBy === 'oldest') return a.createdAt.getTime() - b.createdAt.getTime();
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });

  const paginatedJobs = filteredJobs.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / rowsPerPage));

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">My Jobs</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 rounded-md border py-2 px-3 text-sm">
                <Sliders className="h-4 w-4" />
                <span className="text-muted-text">Filter</span>
                <ChevronDown className="ml-2 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('archived')}>
                  Archived
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={false}
                  onCheckedChange={() => {}}
                >
                  Show archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 rounded-md border py-2 px-3 text-sm">
                <ArrowRightLeft className="h-4 w-4" />
                <span className="text-muted-text">Sort by: {sortBy}</span>
                <ChevronDown className="ml-2 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setSortBy('newest')}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                  Oldest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('company')}>
                  Company
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {paginatedJobs.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Company</TableHead>
                <TableHead className="w-20">Role</TableHead>
                <TableHead className="w-20">Location</TableHead>
                <TableHead className="w-20">Source</TableHead>
                <TableHead className="w-20">Created</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.role}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.source}</TableCell>
                  <TableCell>
                    {job.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex items-center space-x-3">
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-text">No jobs yet.</p>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add your first job
            </Button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-text">
            Page {page} of {totalPages}
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
