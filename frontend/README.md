# Task Manager - Frontend

React + Vite + Tailwind CSS frontend for the Task Manager application.

## Features

- JWT Authentication with protected routes
- Project management (CRUD operations)
- Task management with due dates
- Real-time progress tracking
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:8080

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

The application is pre-configured to proxy API requests to `http://localhost:8080`. 

If your backend runs on a different port, update `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': 'http://localhost:YOUR_PORT'
  }
}
```

## Running the Application

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Default Login Credentials

```
Email: admin@demo.com
Password: 123456
```

## Project Structure

```
src/
├── api/              # API service layer
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── ProgressBar.jsx
│   ├── TaskForm.jsx
│   └── TaskItem.jsx
├── context/          # React context providers
│   └── AuthContext.jsx
├── pages/            # Page components
│   ├── Login.jsx
│   ├── ProjectList.jsx
│   ├── ProjectDetails.jsx
│   └── NewProject.jsx
├── App.jsx           # Main app with routing
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Available Routes

- `/login` - Login page
- `/projects` - List all projects
- `/projects/new` - Create new project
- `/projects/:id` - Project details with tasks

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## API Integration

The app communicates with the backend through the API service layer (`src/api/`). All requests automatically include the JWT token from localStorage.

### API Endpoints Used

- `POST /auth/login` - User authentication
- `GET /projects` - List user projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/:id/tasks` - List project tasks
- `POST /projects/:id/tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /projects/:id/progress` - Get project progress

## Notes

- Tokens are stored in localStorage
- Protected routes redirect to `/login` if not authenticated
- Public routes redirect to `/projects` if already authenticated
