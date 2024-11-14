"use client";

import React, { useState } from "react";
import { Feedback, FeedbackModuleProps } from "../types";
// Helper function to mask email
const maskEmail = (email: string) => {
  const [username, domain] = email?.split("@");
  const maskedUsername =
    username.charAt(0) +
    "*".repeat(username.length - 2) +
    username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};

export default function FeedbackModule({
  onFeedbackCreate,
  onVote,
  initialFeedbacks = [],
}: FeedbackModuleProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newFeedback = await onFeedbackCreate(message);
    setFeedbacks((prev: Feedback[]) =>
      [...prev, newFeedback].sort((a, b) => b.votes - a.votes)
    );
    setMessage("");
  };

  const handleVote = async (feedbackId: string) => {
    await onVote(feedbackId);
    setFeedbacks((prev: Feedback[]) =>
      prev
        .map((f) =>
          f.id === feedbackId
            ? {
                ...f,
                votes: f.votes + (f.hasVoted ? -1 : 1),
                hasVoted: !f.hasVoted,
              }
            : f
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            autoFocus
            placeholder="Enter your feedback..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {feedbacks.map((feedback: Feedback) => (
          <div
            key={feedback.id}
            className="bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4 p-4">
              <button
                onClick={() => handleVote(feedback.id)}
                className={`flex flex-col gap-1 items-center px-2 py-2 rounded-md ${
                  feedback.hasVoted
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
                <span>{feedback.votes}</span>
              </button>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">
                  {feedback?.user?.name || maskEmail(feedback?.user?.email)}
                </p>
                <p>{feedback.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
