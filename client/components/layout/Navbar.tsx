'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItemLabel } from '@/components/ui/radio-group';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'light') root.classList.remove('dark');
    else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [theme]);

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Trackly
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/#features" className="text-sm font-medium text-muted-text hover:text-text">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-muted-text hover:text-text">
              How it works
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-text hover:text-text">
              Dashboard
            </Link>
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button>Get started</Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <RadioGroup value={theme} onValueChange={(value: string) => setTheme(value as 'light' | 'dark' | 'system')} className="flex items-center space-x-1 p-1 bg-secondary-card rounded-lg">
              {themeOptions.map((option) => (
                <RadioGroupItemLabel key={option.value} value={option.value} className="flex items-center space-x-1 rounded-md px-2 py-1 text-xs font-medium text-muted-text hover:text-text focus:bg-primary focus:text-primary-foreground">
                  <option.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </RadioGroupItemLabel>
              ))}
            </RadioGroup>
            <button
              className="p-2 rounded-md text-muted-text hover:text-text hover:bg-secondary-card"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/#features" className="text-sm font-medium text-muted-text hover:text-text px-2 py-2">
                Features
              </Link>
              <Link href="/#how-it-works" className="text-sm font-medium text-muted-text hover:text-text px-2 py-2">
                How it works
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-muted-text hover:text-text px-2 py-2">
                Dashboard
              </Link>
              <Link href="/login" className="text-sm font-medium text-muted-text hover:text-text px-2 py-2">
                Sign in
              </Link>
              <Link href="/register" className="text-sm font-medium text-text px-2 py-2">
                Get started
              </Link>
              <div className="pt-4 border-t">
                <RadioGroup value={theme} onValueChange={(value: string) => setTheme(value as 'light' | 'dark' | 'system')} className="flex items-center space-x-2">
                  {themeOptions.map((option) => (
                    <RadioGroupItemLabel key={option.value} value={option.value} className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-text hover:text-text focus:bg-primary focus:text-primary-foreground">
                      <option.icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </RadioGroupItemLabel>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
