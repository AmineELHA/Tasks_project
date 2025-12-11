# Task Manager - Full Stack Application

A modern, full-stack task management application built with Spring Boot and React. Manage projects, track tasks, and monitor progress with an intuitive interface.

![Tech Stack](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## 🚀 Features

- **Authentication** - Secure JWT-based authentication system
- **Project Management** - Create, edit, and organize projects
- **Task Management** - Add tasks with titles, descriptions, and due dates
- **Progress Tracking** - Real-time progress visualization
- **Responsive UI** - Modern, clean interface with Tailwind CSS & shadcn/ui
- **RESTful API** - Well-documented backend API

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.2.0** - Java framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Data persistence
- **PostgreSQL** - Database
- **JWT (jjwt 0.12.3)** - Token-based authentication
- **Maven** - Dependency management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## 📋 Prerequisites

- **Java 17** (required for backend)
- **Node.js 16+** (required for frontend)
- **PostgreSQL 12+** (database)
- **Maven 3.6+** (backend build tool)
- **npm or yarn** (frontend package manager)

## 🚦 Quick Start

### Option 1: Manual Setup

#### 1. Database Setup

Create a PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE taskmanager;
\q
```

#### 2. Backend Setup

```bash
# Navigate to project root
cd Tasks_project

# Update database credentials in src/main/resources/application.properties
# spring.datasource.username=your_username
# spring.datasource.password=your_password

# Build and run (requires Java 17)
./run.sh

# OR manually:
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
mvn clean install
mvn spring-boot:run
```

Backend will start at: `http://localhost:8080`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start at: `http://localhost:3000`

### Option 2: Docker Setup (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- Database: `localhost:5432`

## 🔑 Default Credentials

```
Email: admin@demo.com
Password: 123456
```

## 📁 Project Structure

```
Tasks_project/
├── src/                          # Backend source code
│   └── main/
│       ├── java/com/taskmanager/
│       │   ├── controllers/      # REST controllers
│       │   ├── services/         # Business logic
│       │   ├── repositories/     # Data access layer
│       │   ├── models/           # Entity classes
│       │   ├── dtos/             # Data transfer objects
│       │   ├── security/         # Security & JWT config
│       │   └── exception/        # Global exception handler
│       └── resources/
│           ├── application.properties
│           └── data.sql          # Initial data
├── frontend/                     # Frontend source code
│   ├── src/
│   │   ├── api/                  # API service layer
│   │   ├── components/           # Reusable components
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── context/              # React context providers
│   │   ├── pages/                # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── ProjectList.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── NewProject.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── docker-compose.yml            # Docker configuration
├── README.md                     # This file
├── BACKEND_README.md             # Detailed backend docs
└── pom.xml                       # Maven configuration
```

## 📚 Documentation

- **[Backend Documentation](BACKEND_README.md)** - Complete API documentation, endpoints, security details
- **[Frontend Documentation](frontend/README.md)** - Frontend architecture, components, routing

## 🔗 API Endpoints

### Authentication
- `POST /auth/login` - User login (public)

### Projects
- `GET /projects` - List all projects
- `POST /projects` - Create project
- `GET /projects/{id}` - Get project by ID
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project
- `GET /projects/{id}/progress` - Get project progress

### Tasks
- `GET /tasks?projectId={id}` - Get tasks by project
- `POST /tasks` - Create task
- `GET /tasks/{id}` - Get task by ID
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

All endpoints except `/auth/login` require JWT authentication via `Authorization: Bearer <token>` header.

See [BACKEND_README.md](BACKEND_README.md) for detailed API documentation with request/response examples.

## 🎨 Screenshots

### Login Page
Clean authentication with demo credentials displayed.

### Projects Dashboard
Grid view of all projects with progress indicators and actions.

### Project Details
Detailed view with task list, progress tracking, and task management.

### Task Management
Create, edit, complete, and delete tasks with due dates.

## 🔒 Security

- **JWT Authentication** - Tokens expire after 24 hours
- **BCrypt Password Hashing** - Secure password storage
- **CORS Configuration** - Frontend-backend communication
- **Input Validation** - Server-side validation on all inputs
- **Authorization** - Users can only access their own data

## 🧪 Testing

### Backend
```bash
mvn test
```

### Frontend
```bash
cd frontend
npm run test
```

## 🏗️ Building for Production

### Backend
```bash
mvn clean package
java -jar target/task-manager-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🐳 Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild and restart
docker-compose up -d --build

# Remove volumes (reset database)
docker-compose down -v
```

## 🤝 Contributing

This is an internship technical test project. For any issues or improvements:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created as part of a technical assessment.

## 👤 Author

**Amine EL HARCHAOUI**
- GitHub: [@AmineELHA](https://github.com/AmineELHA)
- Repository: [Tasks_project](https://github.com/AmineELHA/Tasks_project)

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- shadcn/ui Component Library
- Tailwind CSS

---

**Made with ❤️ as part of a Full Stack Developer Internship Technical Assessment**
