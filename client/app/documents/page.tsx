'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Trash2, FileText, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'resume' | 'cover-letter' | 'portfolio' | 'other'>('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Mock data
  const allDocuments = [
    {
      id: 1,
      name: 'Resume.pdf',
      type: 'application/pdf',
      size: 204800,
      application: 'Backend Engineer at Google',
      uploadedAt: new Date(2026, 8, 20),
    },
    {
      id: 2,
      name: 'Cover Letter.pdf',
      type: 'application/pdf',
      size: 102400,
      application: 'Backend Engineer at Google',
      uploadedAt: new Date(2026, 8, 20),
    },
    {
      id: 3,
      name: 'Portfolio.pdf',
      type: 'application/pdf',
      size: 512000,
      application: 'Frontend Developer at Microsoft',
      uploadedAt: new Date(2026, 8, 15),
    },
    {
      id: 4,
      name: 'References.pdf',
      type: 'application/pdf',
      size: 51200,
      application: 'Software Engineer at Stripe',
      uploadedAt: new Date(2026, 8, 18),
    },
  ];

  const filteredDocuments = allDocuments
    .filter((doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.application.toLowerCase().includes(search.toLowerCase())
    )
    .filter((doc) => {
      if (filterType === 'all') return true;
      // Simple filter by name for demo
      return doc.name.toLowerCase().includes(filterType);
    })
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

  const paginatedDocuments = filteredDocuments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / rowsPerPage));

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />;
    if (type.includes('image')) return <FileText className="h-8 w-8 text-green-500" />;
    return <FileText className="h-8 w-8 text-muted-text" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Documents</h1>
        <Button variant="outline" onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'resume' | 'cover-letter' | 'portfolio' | 'other')}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="resume">Resume</option>
              <option value="cover-letter">Cover Letter</option>
              <option value="portfolio">Portfolio</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {paginatedDocuments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">File</TableHead>
                <TableHead className="w-20">Type</TableHead>
                <TableHead className="w-20">Size</TableHead>
                <TableHead className="w-20">Application</TableHead>
                <TableHead className="w-20">Uploaded</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getFileIcon(doc.type)}
                      <p className="font-medium">{doc.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{doc.type.split('/')[1]?.toUpperCase() || 'FILE'}</Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(doc.size)}</TableCell>
                  <TableCell>{doc.application}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(doc.uploadedAt, { addSuffix: true })}
                  </TableCell>
                  <TableCell className="flex items-center space-x-3">
                    <a
                      href={`/api/documents/${doc.id}`}
                      download
                    >
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <Eye className="h-4 w-4" />
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
            <p className="text-muted-text">No documents yet.</p>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Upload your first document
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
