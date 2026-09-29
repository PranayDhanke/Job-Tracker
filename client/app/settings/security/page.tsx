'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, Smartphone, X } from 'lucide-react';

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Security</h1>
        <p className="text-muted-text">Manage your security settings.</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Password</h2>
        <div className="flex items-center justify-between p-4 bg-secondary-card rounded-lg">
          <div>
            <p className="font-medium text-text">Change Password</p>
            <p className="text-sm text-muted-text">Your password was last changed 30 days ago</p>
          </div>
          <Button variant="outline">Change Password</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
        <div className="flex items-center justify-between p-4 bg-secondary-card rounded-lg">
          <div>
            <p className="font-medium text-text">Authenticator App</p>
            <p className="text-sm text-muted-text">Not enabled</p>
          </div>
          <Button variant="outline">Enable</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Active Sessions</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-secondary-card rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-text">Current Session</p>
                <p className="text-sm text-muted-text">Chrome on MacOS • Active now</p>
              </div>
            </div>
            <Badge variant="secondary">Current</Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary-card rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-text">Mobile App</p>
                <p className="text-sm text-muted-text">iOS • 2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => {}}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
