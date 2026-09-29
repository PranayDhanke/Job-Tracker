'use client';

import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { User, Mail, Save } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Profile</h1>
        <p className="text-muted-text">Manage your personal information.</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-text">{user?.name ?? 'User'}</h3>
              <p className="text-sm text-muted-text">{user?.email ?? 'email@example.com'}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-text">
                Name
              </label>
              <Input
                id="name"
                defaultValue={user?.name ?? ''}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-text">
                Email
              </label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email ?? ''}
                placeholder="Enter your email"
                disabled
              />
              <p className="text-xs text-muted-text mt-1">Email cannot be changed.</p>
            </div>
          </div>

          <Button onClick={() => {}}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Account Status</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-text">Role</span>
            <span className="font-medium">{user?.role ?? 'User'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-text">Account Status</span>
            <span className="font-medium text-success">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-text">Member Since</span>
            <span className="font-medium">September 2026</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
