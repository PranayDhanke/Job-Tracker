'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const routes = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/applications', label: 'Applications' },
    { href: '/interviews', label: 'Interviews' },
    { href: '/documents', label: 'Documents' },
    { href: '/settings', label: 'Settings' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <aside className="w-64 bg-secondary-card border-r flex flex-col h-screen pt-16">
      <div className="flex flex-col flex-1 space-y-2 px-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`
              flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium
              ${pathname === route.href
                ? 'bg-primary text-white'
                : 'text-muted-text hover:bg-secondary-card/50 hover:text-text'}
            `}
          >
            <span className="h-5 w-5">{route.label.charAt(0)}</span>
            <span className="whitespace-nowrap">{route.label}</span>
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-3 px-4 pt-4">
        <span className="h-5 w-5">U</span>
        <span className="text-sm text-muted-text">User</span>
      </div>
    </aside>
  );
}
