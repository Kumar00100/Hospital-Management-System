import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Feedback {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <Card key={feedback.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{feedback.patientName}</CardTitle>
                <CardDescription>{feedback.date}</CardDescription>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{feedback.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackList;
