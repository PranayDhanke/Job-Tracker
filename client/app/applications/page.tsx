'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronLeft, ChevronRight, Search, Sliders, Plus, Eye, Edit, Trash2, ArrowRightLeft, LayoutDashboard, Kanban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ApplicationsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'company'>('newest');
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const statuses = ['Saved', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn'];

  // Mock data
  const allApplications = [
    {
      id: 1,
      company: 'Google',
      role: 'Backend Engineer',
      status: 'Interview',
      appliedDate: new Date(2026, 8, 20),
      updatedDate: new Date(2026, 9, 1),
    },
    {
      id: 2,
      company: 'Stripe',
      role: 'Software Engineer',
      status: 'Applied',
      appliedDate: new Date(2026, 8, 18),
      updatedDate: new Date(2026, 8, 18),
    },
    {
      id: 3,
      company: 'Microsoft',
      role: 'Frontend Developer',
      status: 'Screening',
      appliedDate: new Date(2026, 8, 15),
      updatedDate: new Date(2026, 8, 20),
    },
    {
      id: 4,
      company: 'Amazon',
      role: 'DevOps Engineer',
      status: 'Saved',
      appliedDate: new Date(2026, 8, 10),
      updatedDate: new Date(2026, 8, 10),
    },
  ];

  const filteredApplications = allApplications
    .filter((app) =>
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase())
    )
    .filter((app) => {
      if (filterStatus === 'all') return true;
      return app.status === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.appliedDate.getTime() - a.appliedDate.getTime();
      if (sortBy === 'oldest') return a.appliedDate.getTime() - b.appliedDate.getTime();
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });

  const paginatedApplications = filteredApplications.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / rowsPerPage));

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      Saved: 'secondary',
      Applied: 'default',
      Screening: 'default',
      Interview: 'default',
      Offer: 'default',
      Rejected: 'destructive',
      Withdrawn: 'outline',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Applications</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Search applications..."
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
                {statuses.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setFilterStatus(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
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
            <div className="flex items-center space-x-1 border rounded-md p-1">
              <Button
                variant={view === 'table' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setView('table')}
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'kanban' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setView('kanban')}
              >
                <Kanban className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {view === 'table' ? (
          <>
            {paginatedApplications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Company</TableHead>
                    <TableHead className="w-20">Role</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-20">Applied</TableHead>
                    <TableHead className="w-20">Updated</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.company}</TableCell>
                      <TableCell>{app.role}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell>{app.appliedDate.toLocaleDateString()}</TableCell>
                      <TableCell>{app.updatedDate.toLocaleDateString()}</TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-text">No applications yet.</p>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add your first application
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-4 overflow-x-auto">
            {statuses.map((status) => (
              <div key={status} className="min-w-[300px] max-w-[300px] flex flex-col">
                <div className="flex items-center justify-between px-3 py-2 bg-secondary-card rounded-t-lg">
                  <h3 className="font-medium text-sm">{status}</h3>
                  <Badge variant="secondary">
                    {filteredApplications.filter((a) => a.status === status).length}
                  </Badge>
                </div>
                <div className="flex-1 flex flex-col gap-2 p-2 bg-card border-t-0 border-b border-l border-r rounded-b-lg min-h-[400px]">
                  {filteredApplications.filter((a) => a.status === status).map((app) => (
                    <div
                      key={app.id}
                      className="p-3 bg-secondary-card/50 rounded-lg border hover:bg-secondary-card cursor-pointer"
                      onClick={() => {}}
                    >
                      <h4 className="font-medium text-sm">{app.company}</h4>
                      <p className="text-xs text-muted-text">{app.role}</p>
                      <p className="text-xs text-muted-text mt-1">{app.appliedDate.toLocaleDateString()}</p>
                    </div>
                  ))}
                  {filteredApplications.filter((a) => a.status === status).length === 0 && (
                    <div className="text-center text-muted-text py-4">Drop to add</div>
                  )}
                </div>
              </div>
            ))}
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
