import { useState, useEffect } from 'react';
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
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import type { InsightStatus, Priority, Category, Team, Effort, TriageStatus } from '../../types';

interface CreateInsightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCandidateId?: string;
}

export default function CreateInsightModal({ open, onOpenChange, defaultCandidateId }: CreateInsightModalProps) {
  const { addInsight, candidates, products } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userInterviewed: defaultCandidateId || '',
    product: '',
    status: 'Picked up' as InsightStatus,
    triageStatus: 'Todo' as TriageStatus,
    priority: 'P2' as Priority,
    category: 'Other' as Category,
    team: 'FE' as Team,
    effort: 'md' as Effort,
    assignee: '',
    tags: [] as string[],
    attachments: [] as string[],
  });

  // Update userInterviewed when defaultCandidateId changes
  useEffect(() => {
    if (defaultCandidateId) {
      setFormData(prev => ({ ...prev, userInterviewed: defaultCandidateId }));
    }
  }, [defaultCandidateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.priority || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addInsight({
        title: formData.title,
        description: formData.description,
        userInterviewed: formData.userInterviewed,
        product: formData.product,
        status: formData.status,
        triageStatus: formData.triageStatus,
        priority: formData.priority,
        category: formData.category,
        team: formData.team,
        effort: formData.effort,
        assignee: formData.assignee,
        tags: formData.tags,
        attachments: formData.attachments,
      });

      toast.success('Insight created successfully');
      onOpenChange(false);
      
      // Reset form (keep defaultCandidateId if provided)
      setFormData({
        title: '',
        description: '',
        userInterviewed: defaultCandidateId || '',
        product: '',
        status: 'Picked up',
        triageStatus: 'Todo',
        priority: 'P2',
        category: 'Other',
        team: 'FE',
        effort: 'md',
        assignee: '',
        tags: [],
        attachments: [],
      });
    } catch (error) {
      console.error('Error creating insight:', error);
      toast.error('Failed to create insight. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Insight</DialogTitle>
          <DialogDescription>
            Document a research finding or issue from user interviews
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Issue/Finding Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Describe the issue or finding"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the insight"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userInterviewed">User Interviewed</Label>
                <Select
                  value={formData.userInterviewed}
                  onValueChange={(value) => setFormData({ ...formData, userInterviewed: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={formData.product}
                  onValueChange={(value) => setFormData({ ...formData, product: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">
                  Priority <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as Priority })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P0">P0 - Critical</SelectItem>
                    <SelectItem value="P1">P1 - High</SelectItem>
                    <SelectItem value="P2">P2 - Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Category })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Feature Enhancement">Feature Enhancement</SelectItem>
                    <SelectItem value="Copy Change">Copy Change</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="effort">Effort</Label>
                <Select
                  value={formData.effort}
                  onValueChange={(value) => setFormData({ ...formData, effort: value as Effort })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS - Quick fix</SelectItem>
                    <SelectItem value="sm">SM - Small</SelectItem>
                    <SelectItem value="md">MD - Medium</SelectItem>
                    <SelectItem value="lg">LG - Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as InsightStatus })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Picked up">Picked up</SelectItem>
                    <SelectItem value="Under development">Under development</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Skipped">Skipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="triageStatus">Triage Status</Label>
                <Select
                  value={formData.triageStatus}
                  onValueChange={(value) => setFormData({ ...formData, triageStatus: value as TriageStatus })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In progress">In progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select
                  value={formData.team}
                  onValueChange={(value) => setFormData({ ...formData, team: value as Team })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FE">FE - Frontend</SelectItem>
                    <SelectItem value="PM">PM - Product</SelectItem>
                    <SelectItem value="UX">UX - Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee (Optional)</Label>
              <Input
                id="assignee"
                placeholder="Who is working on this?"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Insight'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
