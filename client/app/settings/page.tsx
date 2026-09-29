'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { User, Key, Palette, Database, Settings } from 'lucide-react';

export default function SettingsPage() {
  const settingsCategories = [
    {
      title: 'Profile',
      description: 'Manage your name, email, and avatar.',
      icon: User,
      href: '/settings/profile',
    },
    {
      title: 'Account',
      description: 'Manage your account settings and preferences.',
      icon: Settings,
      href: '/settings/account',
    },
    {
      title: 'Security',
      description: 'Manage password, two-factor authentication, and sessions.',
      icon: Key,
      href: '/settings/security',
    },
    {
      title: 'Appearance',
      description: 'Customize theme, density, and display options.',
      icon: Palette,
      href: '/settings/appearance',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Settings</h1>
      <p className="text-muted-text">Manage your Trackly account and preferences.</p>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsCategories.map((category) => (
          <Card key={category.title} className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
            <Link href={category.href}>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text">{category.title}</h3>
                  <p className="text-sm text-muted-text">{category.description}</p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
