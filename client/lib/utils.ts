import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    Saved: 'text-muted-text',
    Applied: 'text-primary',
    Screening: 'text-warning',
    Interview: 'text-primary',
    Offer: 'text-success',
    Rejected: 'text-error',
    Withdrawn: 'text-muted-text',
    scheduled: 'text-primary',
    completed: 'text-success',
    cancelled: 'text-error',
  };
  return colors[status] || 'text-muted-text';
}

export function getStatusBgColor(status: string): string {
  const colors: Record<string, string> = {
    Saved: 'bg-muted-text/10',
    Applied: 'bg-primary/10',
    Screening: 'bg-warning/10',
    Interview: 'bg-primary/10',
    Offer: 'bg-success/10',
    Rejected: 'bg-error/10',
    Withdrawn: 'bg-muted-text/10',
    scheduled: 'bg-primary/10',
    completed: 'bg-success/10',
    cancelled: 'bg-error/10',
  };
  return colors[status] || 'bg-muted-text/10';
}
