import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';
import type { ResearchStatus, UserType } from '../../types';

interface AddCandidateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCandidateModal({ open, onOpenChange }: AddCandidateModalProps) {
  const { addCandidate, products } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    title: '',
    location: '',
    dateOfJoining: '',
    researchStatus: 'To be scheduled' as ResearchStatus,
    userType: 'Builder' as UserType,
    featuresTested: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.department || !formData.title) {
      toast.error('Please fill in all required fields');
      return;
    }

    addCandidate({
      ...formData,
      recordings: [],
      notes: '',
      sessions: [],
    });

    toast.success('Candidate added successfully');
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: '',
      department: '',
      title: '',
      location: '',
      dateOfJoining: '',
      researchStatus: 'To be scheduled',
      userType: 'Builder',
      featuresTested: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogDescription>
            Add a new research participant to your candidate pool
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Candidate Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">
                  Department/Team <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department"
                  placeholder="Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Role/Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Software Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Mumbai"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfJoining">Date of Joining</Label>
                <Input
                  id="dateOfJoining"
                  type="date"
                  value={formData.dateOfJoining}
                  onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value as UserType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Builder">Builder</SelectItem>
                    <SelectItem value="End User">End User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="researchStatus">Research Status</Label>
              <Select
                value={formData.researchStatus}
                onValueChange={(value) => setFormData({ ...formData, researchStatus: value as ResearchStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To be scheduled">To be scheduled</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Skipped">Skipped</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Features to Test (Optional)</Label>
              <div className="grid grid-cols-2 gap-2">
                {products.map((product) =>
                  product.features.map((feature) => (
                    <label key={feature} className="flex items-center gap-2 p-2 border rounded hover:bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featuresTested.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              featuresTested: [...formData.featuresTested, feature],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              featuresTested: formData.featuresTested.filter((f) => f !== feature),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Add Candidate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
