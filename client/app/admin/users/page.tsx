'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, ChevronLeft, ChevronRight, Edit, Trash2, Shield } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminUsersPage() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto text-muted-text" />
          <h1 className="mt-4 text-2xl font-bold text-text">Access Denied</h1>
          <p className="mt-2 text-muted-text">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Mock data
  const allUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date(2026, 0, 15),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      createdAt: new Date(2026, 1, 20),
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user',
      status: 'inactive',
      createdAt: new Date(2026, 2, 10),
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      role: 'user',
      status: 'active',
      createdAt: new Date(2026, 3, 5),
    },
  ];

  const filteredUsers = allUsers
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => {
      if (filterRole === 'all') return true;
      return u.role === filterRole;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">User Management</h1>
        <p className="text-muted-text">Manage all users in the system.</p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as 'all' | 'admin' | 'user')}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {paginatedUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Name</TableHead>
                <TableHead className="w-20">Email</TableHead>
                <TableHead className="w-20">Role</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-20">Created</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.status === 'active' ? 'default' : 'secondary'}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(u.createdAt, 'PPP')}</TableCell>
                  <TableCell className="flex items-center space-x-3">
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
            <p className="text-muted-text">No users found.</p>
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
