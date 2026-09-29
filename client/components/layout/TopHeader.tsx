'use client';

import Link from 'next/link';

export function TopHeader() {
  return (
    <header className="bg-card border-b bg-opacity-50 backdrop-blur">
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-primary">
              Trackly
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/dashboard" className="text-muted-text hover:text-text">
              Dashboard
            </Link>
            <Link href="/jobs" className="text-muted-text hover:text-text">
              Jobs
            </Link>
            <Link href="/applications" className="text-muted-text hover:text-text">
              Applications
            </Link>
            <Link href="/interviews" className="text-muted-text hover:text-text">
              Interviews
            </Link>
            <Link href="/documents" className="text-muted-text hover:text-text">
              Documents
            </Link>
            <Link href="/settings" className="text-muted-text hover:text-text">
              Settings
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="flex items-center space-x-2 text-muted-text hover:text-text">
                <span className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
                  JD
                </span>
                <span className="hidden md:block">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
