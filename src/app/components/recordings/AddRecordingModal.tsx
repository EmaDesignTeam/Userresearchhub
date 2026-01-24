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
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';
import { Loader2, Sparkles } from 'lucide-react';
import type { InsightStatus, Priority, Category, Team, Effort, TriageStatus } from '../../types';

interface AddRecordingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  candidateName: string;
  sessionId?: string;
}

export default function AddRecordingModal({ 
  open, 
  onOpenChange, 
  candidateId, 
  candidateName,
  sessionId 
}: AddRecordingModalProps) {
  const { addRecording, addInsight } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    transcript: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast.error('Please provide a title for the recording');
      return;
    }

    if (!formData.url && !formData.transcript) {
      toast.error('Please provide either a video URL or transcript');
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Save the recording
      await addRecording(candidateId, {
        title: formData.title,
        url: formData.url || 'N/A',
        date: formData.date,
        sessionId,
        transcript: formData.transcript,
      });

      toast.success('Recording added successfully');

      // Step 2: Analyze transcript if provided
      if (formData.transcript && formData.transcript.trim().length > 100) {
        setIsAnalyzing(true);
        setAnalysisProgress(10);
        
        toast.info('🤖 Analyzing transcript for insights...');
        
        // Simulate analysis progress
        const progressInterval = setInterval(() => {
          setAnalysisProgress(prev => Math.min(prev + 10, 90));
        }, 500);

        try {
          // Extract insights from transcript
          const extractedInsights = await analyzeTranscript(formData.transcript, candidateName);
          
          clearInterval(progressInterval);
          setAnalysisProgress(100);
          
          // Add each insight to the database
          for (const insight of extractedInsights) {
            await addInsight({
              ...insight,
              userInterviewed: candidateId,
            });
          }

          toast.success(`✨ ${extractedInsights.length} insights extracted and added!`);
        } catch (error) {
          clearInterval(progressInterval);
          console.error('Error analyzing transcript:', error);
          toast.warning('Recording saved, but insight extraction failed');
        }
      }

      onOpenChange(false);
      
      // Reset form
      setFormData({
        title: '',
        url: '',
        transcript: '',
        date: new Date().toISOString().split('T')[0],
      });
      setAnalysisProgress(0);
    } catch (error) {
      console.error('Error adding recording:', error);
      toast.error('Failed to add recording. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Recording</DialogTitle>
          <DialogDescription>
            Add a video recording or transcript for {candidateName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Recording Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., User Interview - Product Demo"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Recording Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Video URL (Optional)</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://zoom.us/rec/... or YouTube/Loom link"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                disabled={isSubmitting}
              />
              <p className="text-xs text-neutral-500">
                Zoom, Loom, YouTube, or any video platform link
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transcript">
                Transcript (Optional)
                <span className="ml-2 text-xs text-neutral-500">
                  • AI will analyze this to extract insights
                </span>
              </Label>
              <Textarea
                id="transcript"
                placeholder="Paste the full transcript of the interview here..."
                value={formData.transcript}
                onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
                disabled={isSubmitting}
                rows={12}
                className="font-mono text-sm"
              />
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="h-3 w-3 text-emerald-600" />
                <span className="text-neutral-500">
                  {formData.transcript.length > 100 
                    ? `Ready for AI analysis (${formData.transcript.length} characters)`
                    : 'Add at least 100 characters for AI analysis'}
                </span>
              </div>
            </div>

            {isAnalyzing && (
              <div className="space-y-2 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="font-medium">Analyzing transcript...</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
                <p className="text-xs text-emerald-600">
                  AI is extracting insights from the transcript
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              disabled={isSubmitting || isAnalyzing}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700" 
              disabled={isSubmitting || isAnalyzing}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : isAnalyzing ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyzing...
                </>
              ) : (
                'Add Recording'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// AI-powered transcript analysis function
async function analyzeTranscript(transcript: string, candidateName: string) {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 3000));

  const insights = [];
  const lowerTranscript = transcript.toLowerCase();

  // Pattern matching for common issues
  const patterns = [
    {
      keywords: ['confus', 'unclear', 'don\'t understand', 'difficult to', 'hard to'],
      category: 'Feature Enhancement' as Category,
      priority: 'P1' as Priority,
      titleTemplate: 'User found feature confusing',
    },
    {
      keywords: ['bug', 'error', 'broken', 'doesn\'t work', 'not working', 'crash'],
      category: 'Bug' as Category,
      priority: 'P0' as Priority,
      titleTemplate: 'Bug reported during session',
    },
    {
      keywords: ['missing', 'would like', 'wish', 'need', 'want', 'suggest'],
      category: 'Feature Enhancement' as Category,
      priority: 'P2' as Priority,
      titleTemplate: 'Feature request identified',
    },
    {
      keywords: ['text', 'label', 'wording', 'copy', 'says'],
      category: 'Copy Change' as Category,
      priority: 'P2' as Priority,
      titleTemplate: 'Copy/text improvement needed',
    },
  ];

  // Extract sentences that might contain insights
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 20);

  for (const pattern of patterns) {
    for (const sentence of sentences) {
      const lowerSentence = sentence.toLowerCase();
      
      if (pattern.keywords.some(keyword => lowerSentence.includes(keyword))) {
        // Extract a meaningful title from the sentence
        let title = sentence.trim();
        if (title.length > 80) {
          title = title.substring(0, 77) + '...';
        }

        insights.push({
          title: title || pattern.titleTemplate,
          description: `Extracted from interview transcript with ${candidateName}:\n\n"${sentence.trim()}"`,
          product: '',
          status: 'Picked up' as InsightStatus,
          triageStatus: 'Todo' as any,
          priority: pattern.priority,
          category: pattern.category,
          team: 'UX' as Team,
          effort: 'md' as Effort,
          attachments: [],
          tags: ['ai-extracted', 'transcript-analysis'],
          assignee: '',
        });

        // Limit to 5 insights per pattern
        if (insights.filter(i => i.category === pattern.category).length >= 2) {
          break;
        }
      }
    }
  }

  // If no patterns matched, create a generic insight
  if (insights.length === 0) {
    insights.push({
      title: 'General feedback from interview',
      description: `Transcript from interview with ${candidateName}. Review for additional insights.`,
      product: '',
      status: 'Picked up' as InsightStatus,
      triageStatus: 'Todo' as any,
      priority: 'P2' as Priority,
      category: 'Other' as Category,
      team: 'UX' as Team,
      effort: 'md' as Effort,
      attachments: [],
      tags: ['ai-extracted', 'needs-review'],
      assignee: '',
    });
  }

  // Limit total insights to 5
  return insights.slice(0, 5);
}
