'use client';

import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut } from 'lucide-react';

export default function AccountSettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Account</h1>
        <p className="text-muted-text">Manage your account settings.</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary-card rounded-lg">
            <div>
              <p className="font-medium text-text">Account Type</p>
              <p className="text-sm text-muted-text">Free Plan</p>
            </div>
            <Button variant="outline">Upgrade</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary-card rounded-lg">
            <div>
              <p className="font-medium text-text">Data Export</p>
              <p className="text-sm text-muted-text">Download all your data</p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary-card rounded-lg">
            <div>
              <p className="font-medium text-text">Delete Account</p>
              <p className="text-sm text-muted-text">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-error/20">
        <h2 className="text-lg font-semibold mb-4 text-error">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-error">Sign Out</p>
            <p className="text-sm text-muted-text">Sign out of your account on all devices</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
