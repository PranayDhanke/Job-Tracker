'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash2, Calendar, Clock, Video, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export default function InterviewsPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const interviewTypes = ['Phone Screen', 'Technical Interview', 'System Design', 'Behavioral', 'Final Round'];

  // Mock data
  const allInterviews = [
    {
      id: 1,
      company: 'Google',
      role: 'Backend Engineer',
      type: 'Technical Interview',
      date: new Date(2026, 9, 15, 14, 30),
      duration: 60,
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      status: 'scheduled',
    },
    {
      id: 2,
      company: 'Stripe',
      role: 'Software Engineer',
      type: 'System Design',
      date: new Date(2026, 9, 20, 10, 0),
      duration: 45,
      meetingUrl: 'https://zoom.us/j/123456789',
      status: 'scheduled',
    },
    {
      id: 3,
      company: 'Microsoft',
      role: 'Frontend Developer',
      type: 'Phone Screen',
      date: new Date(2026, 8, 25, 9, 0),
      duration: 30,
      meetingUrl: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'completed',
    },
  ];

  const now = new Date();
  const filteredInterviews = allInterviews
    .filter((interview) =>
      interview.company.toLowerCase().includes(search.toLowerCase()) ||
      interview.role.toLowerCase().includes(search.toLowerCase())
    )
    .filter((interview) => {
      if (filterType === 'upcoming') return interview.date > now;
      if (filterType === 'past') return interview.date <= now;
      return true;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const paginatedInterviews = filteredInterviews.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredInterviews.length / rowsPerPage));

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Interviews</h1>
        <Button variant="outline" onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Search interviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'upcoming' | 'past')}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {paginatedInterviews.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Company</TableHead>
                <TableHead className="w-20">Role</TableHead>
                <TableHead className="w-20">Type</TableHead>
                <TableHead className="w-20">Date</TableHead>
                <TableHead className="w-20">Time</TableHead>
                <TableHead className="w-20">Duration</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInterviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell>{interview.company}</TableCell>
                  <TableCell>{interview.role}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{interview.type}</Badge>
                  </TableCell>
                  <TableCell>{format(interview.date, 'PPP')}</TableCell>
                  <TableCell>{format(interview.date, 'p')}</TableCell>
                  <TableCell>{interview.duration} min</TableCell>
                  <TableCell>
                    <Badge variant={interview.status === 'scheduled' ? 'default' : 'secondary'}>
                      {interview.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center space-x-3">
                    <a
                      href={interview.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                    </a>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-text">No interviews yet.</p>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Schedule your first interview
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
