"use client";

import { useAuth } from "@/features/auth/AuthContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuCommand,
  MenuSeparator,
  MenuShortcut,
} from "@/components/ui/menu";
import {
  ArrowRightLeft,
  Clock,
  FileText,
  Plus,
  Briefcase,
  List,
  TrendingUp,
  ArrowUpCircle,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = {
    totalJobs: 12,
    applications: 8,
    interviews: 3,
    offers: 1,
  };

  const applicationActivityData = [
    { month: "Jan", applications: 4 },
    { month: "Feb", applications: 3 },
    { month: "Mar", applications: 5 },
    { month: "Apr", applications: 2 },
    { month: "May", applications: 6 },
    { month: "Jun", applications: 4 },
  ];

  const pipelineData = [
    { stage: "Saved", count: 5 },
    { stage: "Applied", count: 8 },
    { stage: "Screening", count: 3 },
    { stage: "Interview", count: 3 },
    { stage: "Offer", count: 1 },
    { stage: "Rejected", count: 2 },
    { stage: "Withdrawn", count: 1 },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      company: "Google",
      role: "Backend Engineer",
      type: "Technical Interview",
      date: new Date(2026, 9, 15, 14, 30),
      duration: 60,
      meetingUrl: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      company: "Stripe",
      role: "Software Engineer",
      type: "System Design",
      date: new Date(2026, 9, 20, 10, 0),
      duration: 45,
      meetingUrl: "https://zoom.us/j/123456789",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      company: "Google",
      role: "Backend Engineer",
      status: "Interview",
      appliedDate: new Date(2026, 8, 20),
    },
    {
      id: 2,
      company: "Stripe",
      role: "Software Engineer",
      status: "Applied",
      appliedDate: new Date(2026, 8, 18),
    },
    {
      id: 3,
      company: "Microsoft",
      role: "Frontend Developer",
      status: "Screening",
      appliedDate: new Date(2026, 8, 15),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-text">Good morning, {user?.name ?? "User"}!</p>
        <h1 className="text-2xl font-bold text-text">
          Here's where your opportunities stand today.
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Total Jobs</p>
              <p className="text-2xl font-bold text-text">{stats.totalJobs}</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Applications</p>
              <p className="text-2xl font-bold text-text">{stats.applications}</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <List className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Interviews</p>
              <p className="text-2xl font-bold text-text">{stats.interviews}</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-text">Offers</p>
              <p className="text-2xl font-bold text-text">{stats.offers}</p>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ArrowUpCircle className="h-5 w-5 text-success" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Application Activity</h2>
              <div className="flex items-center space-x-2 text-sm">
                <ArrowRightLeft className="h-4 w-4 text-muted-text" />
                <span>Last 6 months</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={applicationActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} />
                <YAxis tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="applications" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Application Pipeline</h2>
            </div>
            <div className="space-y-3">
              {pipelineData.map((stage) => (
                <div key={stage.stage} className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-text">{stage.stage}</p>
                    <p className="text-xs text-muted-text">{stage.count} applications</p>
                  </div>
                  <div className="w-8 h-4 bg-primary/20 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Upcoming Interviews</h2>
              <Button variant="outline" size="sm" className="p-1">
                <ArrowRightLeft className="h-4 w-4" />
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-text">{interview.company}</h3>
                      <p className="text-sm text-muted-text">{interview.role}</p>
                      <div className="flex items-center space-x-2 text-xs">
                        <Badge variant="secondary">{interview.type}</Badge>
                        <span className="text-muted-text">•</span>
                        <span className="text-muted-text">
                          {format(interview.date, "PPp")} ({formatDistanceToNow(interview.date, { addSuffix: true })})
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      {interview.duration} min
                      <ArrowRightLeft className="ml-2 h-3 w-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Recent Applications</h2>
              <Button variant="outline" size="sm" className="p-1">
                <ArrowRightLeft className="h-4 w-4" />
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-text">{app.company}</h3>
                      <p className="text-sm text-muted-text">{app.role}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          app.status === "Applied"
                            ? "bg-primary/10 text-primary"
                            : app.status === "Screening"
                            ? "bg-warning/10 text-warning"
                            : app.status === "Interview"
                            ? "bg-primary/10 text-primary"
                            : app.status === "Offer"
                            ? "bg-success/10 text-success"
                            : app.status === "Rejected"
                            ? "bg-error/10 text-error"
                            : "bg-muted-text/10 text-muted-text"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="text-right text-xs">
                      {formatDistanceToNow(app.appliedDate, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>
        <Menu>
          <MenuTrigger>
            <Button variant="outline" className="flex items-center space-x-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
          </MenuTrigger>
          <MenuContent className="w-56">
            <MenuCommand onClick={() => {}}>
              <MenuShortcut>Shift+S</MenuShortcut>
              <span>Settings</span>
            </MenuCommand>
            <MenuSeparator />
            <MenuCommand onClick={() => {}}>
              <MenuShortcut>Shift+L</MenuShortcut>
              <span>Logout</span>
            </MenuCommand>
          </MenuContent>
        </Menu>
      </div>
    </div>
  );
}
