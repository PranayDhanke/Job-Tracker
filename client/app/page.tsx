'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { ChevronRight, ArrowRight, Check, Zap, FileText, Video, MessageSquare, BarChart, Shield, Database, Search, Clock, Calendar, Upload, Edit, Trash2, Plus, Eye, ArrowRightLeft, Sliders, LayoutDashboard, Kanban, MapPin, Link as LinkIcon, CalendarIcon, ClockIcon, FileTextIcon, VideoIcon, MessageSquareIcon, BarChartIcon, ShieldIcon, DatabaseIcon, Users, Briefcase, FileText as FileTextIcon2, TrendingUp, Sun, Moon, Monitor } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: 'Application Pipeline',
      description: 'Visualize your entire job search journey with a beautiful Kanban board. Drag and drop applications between stages.',
      icon: LayoutDashboard,
    },
    {
      title: 'Job Tracking',
      description: 'Save and organize job opportunities with all details: company, role, location, salary, source, and description.',
      icon: Briefcase,
    },
    {
      title: 'Interview Planner',
      description: 'Schedule and manage interviews with calendar integration, meeting links, and preparation notes.',
      icon: CalendarIcon,
    },
    {
      title: 'Notes',
      description: 'Add contextual notes to any application. Track conversations, follow-ups, and important details.',
      icon: MessageSquareIcon,
    },
    {
      title: 'Documents',
      description: 'Upload and manage resumes, cover letters, portfolios, and other documents in one place.',
      icon: FileTextIcon2,
    },
    {
      title: 'Dashboard Analytics',
      description: 'Get insights into your job search with charts showing application activity, pipeline health, and interview stats.',
      icon: BarChartIcon,
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Save the opportunity',
      description: 'Found an interesting job? Save it with one click. We capture all the details so you don\'t have to.',
    },
    {
      number: '02',
      title: 'Track the application',
      description: 'Move applications through your pipeline: Saved → Applied → Screening → Interview → Offer.',
    },
    {
      number: '03',
      title: 'Prepare for what\'s next',
      description: 'Schedule interviews, add notes, upload documents, and get ready to land your dream role.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                Your career journey, beautifully organized.
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text mb-6">
                Less tracking. More landing.
              </h1>
              <p className="text-lg md:text-xl text-muted-text mb-8 max-w-2xl mx-auto">
                Track every application, interview, opportunity, and next step in one beautifully organized workspace.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Tracking Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none h-32 bottom-0 top-auto" />
              <div className="rounded-xl border border-border overflow-hidden shadow-2xl bg-card">
                <div className="flex items-center px-4 py-3 bg-secondary-card border-b border-border">
                  <div className="flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm text-muted-text font-mono">trackly.app/dashboard</div>
                </div>
                <div className="p-6 h-96 overflow-hidden">
                  <div className="space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: 'Total Jobs', value: '12', icon: Briefcase },
                        { label: 'Applications', value: '8', icon: FileTextIcon2 },
                        { label: 'Interviews', value: '3', icon: VideoIcon },
                        { label: 'Offers', value: '1', icon: TrendingUp },
                      ].map((stat) => (
                        <div key={stat.label} className="p-4 bg-secondary-card/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-text">{stat.label}</span>
                            <stat.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-2xl font-bold text-text">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pipeline */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text">Application Pipeline</span>
                      </div>
                      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                        {[
                          { stage: 'Saved', count: 5, color: 'text-muted-text' },
                          { stage: 'Applied', count: 8, color: 'text-text' },
                          { stage: 'Screening', count: 3, color: 'text-warning' },
                          { stage: 'Interview', count: 3, color: 'text-primary' },
                          { stage: 'Offer', count: 1, color: 'text-success' },
                          { stage: 'Rejected', count: 2, color: 'text-error' },
                        ].map((stage) => (
                          <div key={stage.stage} className="flex-shrink-0 w-32 space-y-2">
                            <div className="h-16 bg-secondary-card/50 rounded-lg flex items-end justify-center p-2">
                              <div className="w-full h-full bg-primary/20 rounded" style={{ height: `${stage.count * 12}%` }} />
                            </div>
                            <span className="text-xs font-medium text-text text-center block">{stage.stage}</span>
                            <span className="text-xs text-muted-text text-center block">{stage.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Interviews */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-text">Upcoming Interviews</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { company: 'Google', role: 'Backend Engineer', date: 'Oct 15, 2:30 PM', type: 'Technical' },
                          { company: 'Stripe', role: 'Software Engineer', date: 'Oct 20, 10:00 AM', type: 'System Design' },
                        ].map((interview, i) => (
                          <div key={i} className="p-3 bg-secondary-card/50 rounded-lg border">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-text">{interview.company}</span>
                                <span className="text-xs text-muted-text ml-2">{interview.role}</span>
                              </div>
                              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">{interview.type}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1 text-xs text-muted-text">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{interview.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-secondary-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Your job search deserves a better system.
              </h2>
              <p className="text-lg text-muted-text max-w-2xl mx-auto">
                Everything you need to organize, track, and win your next opportunity.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="p-6 hover:border-primary/50 transition-colors">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
                  <p className="text-muted-text">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Three steps to your next role
              </h2>
              <p className="text-lg text-muted-text max-w-2xl mx-auto">
                Simple, powerful, and designed for how you actually work.
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              <div className="grid gap-12 lg:grid-cols-3">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative lg:pl-12">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">{step.number}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className="hidden lg:block absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-text mb-2">{step.title}</h3>
                        <p className="text-muted-text">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your next opportunity starts with clarity.
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have organized their search with Trackly. Free to start, no credit card required.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Your Workspace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="text-xl font-bold text-primary">
                Trackly
              </Link>
              <p className="mt-4 text-muted-text max-w-sm">
                Less tracking. More landing. The job application tracker that helps you organize your career journey.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><Link href="/dashboard" className="hover:text-text">Dashboard</Link></li>
                <li><Link href="/jobs" className="hover:text-text">Jobs</Link></li>
                <li><Link href="/applications" className="hover:text-text">Applications</Link></li>
                <li><Link href="/interviews" className="hover:text-text">Interviews</Link></li>
                <li><Link href="/documents" className="hover:text-text">Documents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><Link href="#" className="hover:text-text">About</Link></li>
                <li><Link href="#" className="hover:text-text">Blog</Link></li>
                <li><Link href="#" className="hover:text-text">Careers</Link></li>
                <li><Link href="#" className="hover:text-text">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-text">© 2026 Trackly. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-text hover:text-text">Privacy</Link>
              <Link href="#" className="text-sm text-muted-text hover:text-text">Terms</Link>
              <Link href="#" className="text-sm text-muted-text hover:text-text">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
