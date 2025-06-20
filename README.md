# Simple Task API

A simple API for managing tasks, built with Express and MongoDB.

# Features

- Create, read, update, and delete tasks
- Task completion status
- Task due dates
- Task filtering by completion status
- Logging with Morgan and Winston

# Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ideateGudy/simple-task-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd simple-task-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```bash
   PORT=3000
   MONGO_URL=<your-mongodb-url>
   NODE_ENV=development
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Logs

Logs are stored in the `src/logs` directory. You can view them by navigating to the directory or stream them in real-time using the following commands:

- combined logs:

```bash
tail -f src/logs/%DATE%/combined-%DATE%.log
```

- error logs:

```bash
tail -f src/logs/%DATE%/error-%DATE%.log
```

- exception logs:

```bash
tail -f src/logs/%DATE%/exception-%DATE%.log
```

- rejected logs:

```bash
tail -f src/logs/%DATE%/rejected-%DATE%.log
```

# Usage

### API Endpoints

- **Base URL**: `http://localhost:3000`

### Tasks Endpoints

---

- **Create a task**:

  ```bash
  POST /tasks
  ```

  Headers:

  ```plaintext
  Content-Type: application/json
  ```

  Body:

  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "completed": false,
    "dueDate": "2025-12-31T23:59:59.999Z" # ISO String format
  }
  ```

  Response Status Code:

  ```json
  201 Created
  ```

  Response:

  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "task": {
        "_id": "6855748f72ba29ff32f8bc9e",
        "title": "New Task",
        "description": "Task description",
        "dueDate": "2025-12-31T23:59:59.999Z",
        "completed": false,
        "createdAt": "2025-06-20T14:47:43.202Z",
        "updatedAt": "2025-06-20T14:47:43.202Z",
        "__v": 0
      }
    }
  }
  ```

  Error Response:

  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": {
      "title": "Title is required",
      "dueDate": "Date must be in ISO format"
    }
  }
  ```

- **Get all tasks**:

  ```bash
  GET /tasks
  ```

  Query Parameters (optional):

  ```bash
  ?completed=true
  ```

  Headers:

  ```plaintext
  Content-Type: application/json
  ```

  Response Status:

  ```json
  200 OK
  ```

  Response:

  ```json
  {
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": {
      "total": 2,
      "tasks": [
        {
          "_id": "60c72b2f9b1e8b001c8e4d1a",
          "title": "Sample Task",
          "description": "This is a sample task",
          "completed": false,
          "dueDate": "2025-12-31T23:59:59.999Z",
          "createdAt": "2025-12-01T00:00:00.000Z",
          "updatedAt": "2025-12-01T00:00:00.000Z",
          "__v": 0
        },
        {
          "_id": "60c72b2f9b1e8b001c8e4d1b",
          "title": "Another Task",
          "description": "This is another task",
          "completed": true,
          "dueDate": "2025-11-30T23:59:59.999Z",
          "createdAt": "2025-11-01T00:00:00.000Z",
          "updatedAt": "2025-11-01T00:00:00.000Z",
          "__v": 0
        }
      ]
    }
  }
  ```

- **Update a task completion status**:

  ```bash
  PATCH /tasks/:taskId
  ```

  Replace `:taskId` with the actual task ID.

  Response Status:

  ```json
    200 OK
  ```

Response:

```json
{
  "success": true,
  "message": "Task status updated successfully",
  "data": {
    "task": {
      "_id": "68556b59c91b2a2e5240765d",
      "completed": true,
      "updatedAt": "2025-06-20T14:52:24.848Z",
      "__v": 0
    }
  }
}
```

- **Delete a task**:

  ```bash
  DELETE /tasks/:taskId
  ```

  Replace `:taskId` with the actual task ID.

  Response Status:

```json
  204 No Content
```
