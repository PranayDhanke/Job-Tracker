'use client';

import * as React from 'react';
import { X } from 'lucide-react';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
}

const Toast = ({ className, variant = 'default', children, ...props }: ToastProps) => {
  const baseClass = 'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all';
  const variantClasses = {
    default: 'border-border bg-card text-text',
    destructive: 'border-error/50 bg-error/10 text-error dark:border-error dark:bg-error/20',
    success: 'border-success/50 bg-success/10 text-success dark:border-success dark:bg-success/20',
  };
  const combinedClass = `${baseClass} ${variantClasses[variant] || variantClasses.default} ${className || ''}`;

  return (
    <div className={combinedClass} {...props}>
      <div className="flex-1">{children}</div>
      <span className="h-4 w-4 text-muted-text">✕</span>
    </div>
  );
};

const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      data-toast-root
      className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4"
      role="region"
      aria-label="Notifications"
    >
      {children}
    </div>
  );
};

export { Toast, ToastContainer };
