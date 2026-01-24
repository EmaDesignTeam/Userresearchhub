import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { useApp } from '../context/AppContext';
import { User, Bell, Settings as SettingsIcon } from 'lucide-react';

// Import reusable components
import { PageHeader, InfoCard } from '../components/common';

export default function Settings() {
  const { currentUser } = useApp();

  return (
    <div className="p-8 max-w-4xl space-y-8">
      {/* Use PageHeader component */}
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="space-y-6">
        {/* Use InfoCard component */}
        <InfoCard title="Profile Information" icon={User}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={currentUser.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={currentUser.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={currentUser.role} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Input id="team" defaultValue={currentUser.team} disabled />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </div>
        </InfoCard>

        <InfoCard title="Notifications" icon={Bell}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p>Email notifications</p>
                <p className="text-sm text-neutral-600">Receive email updates about research activity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p>Session reminders</p>
                <p className="text-sm text-neutral-600">Get reminders before scheduled sessions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p>Insight updates</p>
                <p className="text-sm text-neutral-600">Notify when insights are resolved or updated</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Preferences" icon={SettingsIcon}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p>Dark mode</p>
                <p className="text-sm text-neutral-600">Use dark theme throughout the app</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p>Compact view</p>
                <p className="text-sm text-neutral-600">Show more data in table views</p>
              </div>
              <Switch />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
