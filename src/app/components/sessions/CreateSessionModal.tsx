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
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import type { SessionStatus } from '../../types';

interface CreateSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateSessionModal({ open, onOpenChange }: CreateSessionModalProps) {
  const { addSession, candidates, products, currentUser } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    candidateId: '',
    product: '',
    featuresTested: [] as string[],
    moderator: currentUser?.name || '',
    date: '',
    time: '',
    duration: '60 min',
    status: 'Scheduled' as SessionStatus,
    objectives: '',
    sessionNotes: '',
  });

  const selectedProduct = products.find(p => p.name === formData.product);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.candidateId || !formData.product || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addSession({
        candidateId: formData.candidateId,
        product: formData.product,
        featuresTested: formData.featuresTested,
        moderator: formData.moderator,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        status: formData.status,
        sessionNotes: formData.sessionNotes,
        objectives: formData.objectives,
        observations: '',
        quotes: '',
      });

      toast.success('Session created successfully');
      onOpenChange(false);
      
      // Reset form
      setFormData({
        candidateId: '',
        product: '',
        featuresTested: [],
        moderator: currentUser?.name || '',
        date: '',
        time: '',
        duration: '60 min',
        status: 'Scheduled',
        objectives: '',
        sessionNotes: '',
      });
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Session</DialogTitle>
          <DialogDescription>
            Schedule a new research session with a candidate
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateId">
                  Candidate <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.candidateId}
                  onValueChange={(value) => setFormData({ ...formData, candidateId: value })}
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
                <Label htmlFor="product">
                  Product <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.product}
                  onValueChange={(value) => setFormData({ ...formData, product: value, featuresTested: [] })}
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

            {selectedProduct && (
              <div className="space-y-2">
                <Label>Features to Test</Label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                  {selectedProduct.features.map((feature) => (
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
                        disabled={isSubmitting}
                        className="rounded"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Session Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">
                  Session Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 min">30 min</SelectItem>
                    <SelectItem value="45 min">45 min</SelectItem>
                    <SelectItem value="60 min">60 min</SelectItem>
                    <SelectItem value="90 min">90 min</SelectItem>
                    <SelectItem value="120 min">120 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="moderator">Moderator</Label>
                <Input
                  id="moderator"
                  placeholder="Moderator name"
                  value={formData.moderator}
                  onChange={(e) => setFormData({ ...formData, moderator: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectives">Session Objectives (Optional)</Label>
              <Textarea
                id="objectives"
                placeholder="What do you want to learn from this session?"
                value={formData.objectives}
                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionNotes">Notes (Optional)</Label>
              <Textarea
                id="sessionNotes"
                placeholder="Any additional notes or preparation details"
                value={formData.sessionNotes}
                onChange={(e) => setFormData({ ...formData, sessionNotes: e.target.value })}
                disabled={isSubmitting}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Session'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
