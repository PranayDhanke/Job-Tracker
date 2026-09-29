'use client';

import { useAuth } from '@/features/auth/AuthContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, TrendingUp, Users, Briefcase, FileText, Video } from 'lucide-react';

export default function AdminStatsPage() {
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

  const userGrowthData = [
    { month: 'Jan', users: 100 },
    { month: 'Feb', users: 120 },
    { month: 'Mar', users: 150 },
    { month: 'Apr', users: 180 },
    { month: 'May', users: 220 },
    { month: 'Jun', users: 250 },
  ];

  const applicationStatusData = [
    { name: 'Saved', value: 400 },
    { name: 'Applied', value: 300 },
    { name: 'Screening', value: 200 },
    { name: 'Interview', value: 150 },
    { name: 'Offer', value: 50 },
    { name: 'Rejected', value: 100 },
    { name: 'Withdrawn', value: 30 },
  ];

  const interviewTypeData = [
    { name: 'Phone Screen', value: 40 },
    { name: 'Technical', value: 30 },
    { name: 'System Design', value: 20 },
    { name: 'Behavioral', value: 10 },
  ];

  const COLORS = ['#8B5CF6', '#22C55E', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#14B8A6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">System Statistics</h1>
        <p className="text-muted-text">Detailed analytics and insights.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Total Users</p>
              <p className="text-2xl font-bold text-text">1,234</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Total Jobs</p>
              <p className="text-2xl font-bold text-text">5,678</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-success" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Applications</p>
              <p className="text-2xl font-bold text-text">9,012</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-warning" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Interviews</p>
              <p className="text-2xl font-bold text-text">345</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Video className="h-5 w-5 text-error" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} />
                <YAxis tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Application Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Interview Types</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={interviewTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {interviewTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Monthly Application Activity</h2>
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
      </div>
    </div>
  );
}
