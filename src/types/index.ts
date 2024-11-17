export interface Feedback {
  id: string;
  message: string;
  votes: number;
  hasVoted?: boolean;
  name?: string;
}

export interface FeedbackModuleProps {
  onFeedbackCreate: (message: string) => Promise<Feedback>;
  onVote: (feedbackId: string) => Promise<void>;
  initialFeedbacks?: Feedback[];
}
