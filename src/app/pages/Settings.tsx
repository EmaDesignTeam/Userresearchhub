import { useState, useEffect } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useApp } from '../context/AppContext';
import { User, Bell, Settings as SettingsIcon, Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Import reusable components
import { PageHeader, InfoCard } from '../components/common';

export default function Settings() {
  const { currentUser, teams, updateUser } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [selectedTeam, setSelectedTeam] = useState(currentUser?.team || '');
  const [saving, setSaving] = useState(false);

  const isAdmin = currentUser?.role === 'Admin';

  // Update local state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setSelectedTeam(currentUser.team || '');
    }
  }, [currentUser]);

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    setSaving(true);
    try {
      await updateUser(currentUser.id, {
        name,
        team: selectedTeam,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = name !== currentUser?.name || selectedTeam !== currentUser?.team;

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
              <div className="flex items-center gap-3">
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1" 
                />
                {isAdmin && (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Admin
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={currentUser?.email} 
                disabled 
                className="bg-neutral-50"
              />
              <p className="text-xs text-neutral-500">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                defaultValue={currentUser?.role} 
                disabled 
                className="bg-neutral-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSaveProfile}
              disabled={saving || !hasChanges}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
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
