'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, Plus, Calendar, Clock, FileText, MessageSquare, Video, ArrowRightLeft } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export default function ApplicationDetailsPage() {
  const { id } = useParams();

  const application = {
    id: Number(id),
    company: 'Google',
    role: 'Backend Engineer',
    status: 'Interview' as const,
    appliedDate: new Date(2026, 8, 20),
    updatedDate: new Date(2026, 9, 1),
    jobUrl: 'https://careers.google.com/jobs/results/1234567890/backend-engineer',
    description: 'We are looking for a backend engineer to join our team.',
    notes: [
      { id: 1, content: 'Initial phone screen scheduled for Oct 15', createdAt: new Date(2026, 9, 1) },
      { id: 2, content: 'Recruiter mentioned they are looking for someone with Go experience', createdAt: new Date(2026, 9, 5) },
    ],
    interviews: [
      { id: 1, type: 'Technical Interview', date: new Date(2026, 9, 15, 14, 30), duration: 60, meetingUrl: 'https://meet.google.com/abc-defg-hij', status: 'scheduled' as const, notes: 'Prepare for system design questions' },
    ],
    attachments: [
      { id: 1, name: 'Resume.pdf', type: 'application/pdf', size: 204800, uploadedAt: new Date(2026, 8, 20) },
      { id: 2, name: 'Cover Letter.pdf', type: 'application/pdf', size: 102400, uploadedAt: new Date(2026, 8, 20) },
    ],
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      Saved: 'secondary', Applied: 'default', Screening: 'default', Interview: 'default',
      Offer: 'default', Rejected: 'destructive', Withdrawn: 'outline',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">{application.company}</h1>
          <p className="text-lg text-muted-text">{application.role}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => {}}><Edit className="mr-2 h-4 w-4" />Edit Application</Button>
          <Button variant="outline" onClick={() => {}}><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {getStatusBadge(application.status)}
        <a href={application.jobUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">View Job Posting</a>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Job Information</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div><label className="text-sm text-muted-text">Applied Date</label><p className="font-medium">{format(application.appliedDate, 'PPP')}</p></div>
                  <div><label className="text-sm text-muted-text">Last Updated</label><p className="font-medium">{format(application.updatedDate, 'PPP')}</p></div>
                  <div><label className="text-sm text-muted-text">Status</label><p className="font-medium">{application.status}</p></div>
                </div>
                <div><label className="text-sm text-muted-text">Description</label><p className="text-muted-text mt-1">{application.description}</p></div>
              </div>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => {}}><Plus className="mr-2 h-4 w-4" />Add Note</Button>
                <Button variant="outline" onClick={() => {}}><Video className="mr-2 h-4 w-4" />Schedule Interview</Button>
                <Button variant="outline" onClick={() => {}}><FileText className="mr-2 h-4 w-4" />Upload File</Button>
                <Button variant="outline" onClick={() => {}}><ArrowRightLeft className="mr-2 h-4 w-4" />Change Status</Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="space-y-4">
            <div className="relative pl-4 border-l-2 border-border">
              <div className="relative mb-4"><div className="absolute left-[-9px] top-1 h-3 w-3 rounded-full bg-primary" /><div className="bg-secondary-card p-4 rounded-lg"><p className="font-medium">Application Created</p><p className="text-sm text-muted-text">Applied on {format(application.appliedDate, 'PPP')}</p></div></div>
              <div className="relative mb-4"><div className="absolute left-[-9px] top-1 h-3 w-3 rounded-full bg-primary" /><div className="bg-secondary-card p-4 rounded-lg"><p className="font-medium">Status Changed to Interview</p><p className="text-sm text-muted-text">Updated on {format(application.updatedDate, 'PPP')}</p></div></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="flex justify-between items-center"><h3 className="text-lg font-semibold">Notes</h3><Button variant="outline" onClick={() => {}}><Plus className="mr-2 h-4 w-4" />Add Note</Button></div>
          <div className="space-y-3">
            {application.notes.map((note) => (
              <Card key={note.id} className="p-4">
                <div className="flex justify-between"><p className="text-muted-text">{note.content}</p><div className="flex items-center space-x-2"><span className="text-xs text-muted-text">{formatDistanceToNow(note.createdAt, { addSuffix: true })}</span><Button variant="ghost" size="icon" onClick={() => {}}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => {}}><Trash2 className="h-4 w-4" /></Button></div></div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <div className="flex justify-between items-center"><h3 className="text-lg font-semibold">Interviews</h3><Button variant="outline" onClick={() => {}}><Video className="mr-2 h-4 w-4" />Schedule Interview</Button></div>
          <div className="space-y-3">
            {application.interviews.map((interview) => (
              <Card key={interview.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1"><div className="flex items-center space-x-2"><Badge variant="secondary">{interview.type}</Badge><Badge variant="outline">{interview.status}</Badge></div><p className="mt-1 text-sm text-muted-text">{interview.notes}</p><div className="flex items-center space-x-4 mt-2 text-sm text-muted-text"><span><Calendar className="h-4 w-4 inline mr-1" />{format(interview.date, 'PPP')}</span><span><Clock className="h-4 w-4 inline mr-1" />{interview.duration} min</span></div></div>
                  <div className="flex items-center space-x-2"><a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">Join</a><Button variant="ghost" size="icon" onClick={() => {}}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => {}}><Trash2 className="h-4 w-4" /></Button></div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4">
          <div className="flex justify-between items-center"><h3 className="text-lg font-semibold">Attachments</h3><Button variant="outline" onClick={() => {}}><FileText className="mr-2 h-4 w-4" />Upload File</Button></div>
          <div className="space-y-3">
            {application.attachments.map((attachment) => (
              <Card key={attachment.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3"><FileText className="h-8 w-8 text-primary" /><div><p className="font-medium">{attachment.name}</p><p className="text-sm text-muted-text">{attachment.type} {(attachment.size / 1024).toFixed(1)} KB</p></div></div>
                <div className="flex items-center space-x-2"><span className="text-xs text-muted-text">{formatDistanceToNow(attachment.uploadedAt, { addSuffix: true })}</span><Button variant="ghost" size="icon" onClick={() => {}}><Trash2 className="h-4 w-4" /></Button></div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
