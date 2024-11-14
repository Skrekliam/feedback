# @skrekliam/feedback

A React component for collecting and managing user feedback with voting capabilities.

## Installation

```bash
npm install @skrekliam/feedback
```

## Features

- 🎯 Simple feedback submission
- ⬆️ Upvoting system
- 📊 Automatic sorting by votes
- 🔒 Email privacy (masking)
- 🎨 Tailwind CSS styling
- ✨ TypeScript support
- 💾 Database agnostic - works with any storage solution

## Database Flexibility

This package is designed to be database agnostic. You handle all data persistence logic externally through the provided callbacks:

- `onFeedbackCreate`: Receives the feedback message and lets you implement your own storage logic (SQL, NoSQL, localStorage, etc.)
- `onVote`: Receives the feedback ID for vote handling, allowing you to update your storage solution as needed

### Example with Different Databases

#### MongoDB Example

```typescript
const handleFeedbackCreate = async (message: string) => {
  const feedback = await mongodb.collection("feedbacks").insertOne({
    message,
    votes: 0,
    user: getCurrentUser(), // your auth logic
  });
  return feedback;
};
```

#### PostgreSQL Example using Prisma

```typescript
const handleFeedbackCreate = async (message: string) => {
  const feedback = await prisma.feedback.create({
    data: {
      message,
      votes: 0,
      userId: getCurrentUserId(),
    },
  });
  return feedback;
};
```

#### LocalStorage Example

```typescript
const handleFeedbackCreate = async (message: string) => {
  const feedback = {
    id: Date.now().toString(),
    message,
    votes: 0,
    user: {
      email: "user@example.com",
    },
  };
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  localStorage.setItem("feedbacks", JSON.stringify([...feedbacks, feedback]));
  return feedback;
};
```

## Usage

```typescript
import { FeedbackModule } from "@skrekliam/feedback";
function App() {
  // Handler for creating new feedback
  const handleFeedbackCreate = async (message: string) => {
    // Implement your feedback creation logic here
    return {
      id: "unique-id",
      message,
      votes: 0,
      hasVoted: false,
      user: {
        email: "user@example.com",
        name: "John Doe", // optional
      },
    };
  };
  // Handler for voting on feedback
  const handleVote = async (feedbackId: string) => {
    // Implement your voting logic here
  };
  return (
    <FeedbackModule
      onFeedbackCreate={handleFeedbackCreate}
      onVote={handleVote}
      initialFeedbacks={[]} // Optional: Pre-populate with existing feedback
    />
  );
}
```


## Props

| Prop | Type | Description |
|------|------|-------------|
| `onFeedbackCreate` | `(message: string) => Promise<Feedback>` | Callback function called when new feedback is submitted |
| `onVote` | `(feedbackId: string) => Promise<void>` | Callback function called when a vote is cast |
| `initialFeedbacks` | `Feedback[]` | Optional array of initial feedback items |

## Types

See [types.ts](./src/types/index.ts) for more details.

## Styling

The component comes with built-in Tailwind CSS classes. Make sure your project includes Tailwind CSS to maintain the default styling, or override the classes as needed.

## Development


### Install dependencies

```bash
npm install
```

### Build the package

```bash
npm run build
```

### Watch mode during development

```bash
npm run dev
```

## Requirements

### Peer Dependencies
- React ≥ 18.0.0
- React DOM ≥ 18.0.0

## License

MIT

## Author

skrekliam