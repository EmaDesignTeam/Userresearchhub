import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Plus, Users as UsersIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { UserRole, Team } from '../types';

export default function Admin() {
  const { users, products, addUser } = useApp();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    role: 'Researcher' as UserRole,
    team: 'UX' as Team
  });

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      ...inviteData,
      status: 'Invited'
    });
    toast.success('User invitation sent');
    setIsInviteModalOpen(false);
    setInviteData({
      name: '',
      email: '',
      role: 'Researcher',
      team: 'UX'
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Admin</h1>
        <p className="text-neutral-600">Manage users, products, and team settings</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products & Features</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-600">{users.length} users</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsInviteModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-neutral-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.team}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-600">{products.length} products</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="mb-4">{product.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add feature
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-neutral-600">3 teams</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Team
            </Button>
          </div>

          <div className="grid gap-4">
            {(['FE', 'PM', 'UX'] as Team[]).map((team) => {
              const teamUsers = users.filter(u => u.team === team);
              return (
                <div key={team} className="bg-white rounded-lg border border-neutral-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>{team}</h3>
                    <Badge variant="secondary">{teamUsers.length} members</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {teamUsers.map((user) => (
                      <Badge key={user.id} variant="outline">
                        {user.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Send an invitation to join your research workspace
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteUser}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={inviteData.role}
                  onValueChange={(value) => setInviteData({ ...inviteData, role: value as UserRole })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Researcher">Researcher</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select
                  value={inviteData.team}
                  onValueChange={(value) => setInviteData({ ...inviteData, team: value as Team })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FE">FE</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                    <SelectItem value="UX">UX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
