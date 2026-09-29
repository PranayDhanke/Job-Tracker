'use client';

import { useAuth } from '@/features/auth/AuthContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, FileText, TrendingUp, Shield } from 'lucide-react';

export default function AdminDashboardPage() {
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

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-primary' },
    { label: 'Total Jobs', value: '5,678', icon: Briefcase, color: 'text-success' },
    { label: 'Total Applications', value: '9,012', icon: FileText, color: 'text-warning' },
    { label: 'Total Interviews', value: '345', icon: TrendingUp, color: 'text-error' },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 100 },
    { month: 'Feb', users: 120 },
    { month: 'Mar', users: 150 },
    { month: 'Apr', users: 180 },
    { month: 'May', users: 220 },
    { month: 'Jun', users: 250 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>
        <p className="text-muted-text">System overview and statistics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-text">{stat.label}</p>
                <p className="text-2xl font-bold text-text">{stat.value}</p>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} />
                <YAxis tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="users" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4 text-text">Quick Actions</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <a href="/admin/users" className="p-4 bg-secondary-card rounded-lg hover:bg-secondary-card/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text">Manage Users</p>
                  <p className="text-sm text-muted-text">View and manage all users</p>
                </div>
              </div>
            </a>
            <a href="/admin/stats" className="p-4 bg-secondary-card rounded-lg hover:bg-secondary-card/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text">View Statistics</p>
                  <p className="text-sm text-muted-text">Detailed system statistics</p>
                </div>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
