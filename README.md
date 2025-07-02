# Todo List App

A full-stack Todo List application with a modern, responsive React frontend and a Node.js/Express backend. Easily manage your daily tasks with a beautiful UI and seamless API integration.

## Live Demo

[Website](https://todo-list-app-harsh.vercel.app/)

## Features

- Add, complete, and delete tasks
- Responsive design with a white-purple-blue gradient background
- Poppins font for a modern look
- Tasks display horizontally when the list gets too tall
- Backend API with validation and in-memory storage (MVC architecture)
- Axios for frontend API requests

## Tech Stack

- **Frontend:** React, Axios, TailwindCSS (with custom CSS)
- **Backend:** Node.js, Express

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node app.js
   ```
   The backend will run on `http://localhost:8080` by default.

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` by default.

### API Endpoints

- `GET    /tasks` - Fetch all tasks
- `POST   /tasks` - Add a new task (`title` required)
- `PUT    /tasks/:id` - Update a task's completed status
- `DELETE /tasks/:id` - Delete a task by ID

## Deployment

- The backend can be deployed to services like Render, Heroku, or Vercel.
- The frontend can be built and deployed to Vercel, Netlify, or similar platforms.
- Update the `API_URL` in `client/src/App.jsx` to your deployed backend URL.

## Screenshots

![Todo List App Screenshot](screenshot.png)

## License

MIT
