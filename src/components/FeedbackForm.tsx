import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }
    // API call to submit feedback would go here
    console.log({ rating, feedback });
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback!",
    });
    setRating(0);
    setFeedback('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Your Rating</label>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <Textarea
          placeholder="Share your experience or suggestions..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
        />
        <Button onClick={handleSubmit}>Submit Feedback</Button>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
