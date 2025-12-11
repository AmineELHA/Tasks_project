# Task Manager Project - Setup Complete! ✅

## What Was Built

A full-stack **Task Manager** application with:
- **Backend:** Spring Boot 3 + PostgreSQL + JWT Authentication
- **Frontend:** React 18 + Vite + Tailwind CSS + React Router

---

## 🚀 Quick Start Guide

### 1. Start Backend (Terminal 1)

```bash
cd /home/amine/projects/Tasks_project

# Make sure PostgreSQL database 'taskmanager' exists
# Update credentials in src/main/resources/application.properties if needed

# Run the backend (uses Java 17 automatically)
./run.sh
```

Backend will start on: **http://localhost:8080**

### 2. Start Frontend (Terminal 2)

```bash
cd /home/amine/projects/Tasks_project/frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Frontend will start on: **http://localhost:3000**

### 3. Login

Open browser to **http://localhost:3000**

**Default credentials:**
- Email: `admin@demo.com`
- Password: `123456`

---

## ⚠️ Important Notes

### Java Version Requirement

This project **must be built with Java 17** due to Lombok compatibility with the compiler.

- Your system has Java 25 by default
- The provided `run.sh` script automatically uses Java 17
- If running manually, always set: `export JAVA_HOME=/usr/lib/jvm/java-17-openjdk`

### Database Setup

1. Ensure PostgreSQL is running
2. Create database: `createdb taskmanager`
3. Update credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

---

## 📁 Project Structure

```
Tasks_project/
├── run.sh                          # Backend startup script (uses Java 17)
├── pom.xml                         # Maven configuration
├── README.md                       # Backend documentation
├── src/main/java/com/taskmanager/ # Backend source code
│   ├── controllers/                # REST endpoints
│   ├── services/                   # Business logic
│   ├── models/                     # JPA entities
│   ├── repositories/               # Data access
│   ├── security/                   # JWT & Spring Security
│   └── dtos/                       # Request/Response objects
├── src/main/resources/
│   ├── application.properties      # Configuration
│   └── data.sql                    # Initial data (admin user)
│
└── frontend/                       # React frontend
    ├── src/
    │   ├── api/                    # API client with JWT
    │   ├── components/             # Reusable components
    │   ├── pages/                  # Page components
    │   ├── context/                # React context (Auth)
    │   ├── App.jsx                 # Main app with routing
    │   ├── main.jsx                # Entry point
    │   └── index.css               # Tailwind imports
    ├── package.json
    ├── vite.config.js              # Vite config (proxy to backend)
    ├── tailwind.config.js
    └── README.md                   # Frontend documentation
```

---

## 🔑 Features

### Backend API
- ✅ JWT Authentication (24h expiration)
- ✅ User Management (BCrypt password hashing)
- ✅ Projects CRUD (user-scoped)
- ✅ Tasks CRUD (with due dates, completion status)
- ✅ Project Progress Tracking (percentage complete)
- ✅ Global Exception Handling
- ✅ Input Validation

### Frontend
- ✅ Login/Logout with JWT
- ✅ Protected Routes
- ✅ Project Management (Create, Read, Update, Delete)
- ✅ Task Management (Create, Read, Update, Delete)
- ✅ Progress Bar Visualization
- ✅ Inline Task Editing
- ✅ Due Date Selection
- ✅ Responsive Design (Tailwind CSS)

---

## 📡 API Endpoints

**Public:**
- `POST /auth/login` - User login

**Protected (requires JWT token):**
- `GET /projects` - List all user projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/:id/progress` - Get progress stats
- `GET /tasks?projectId=:id` - List project tasks
- `POST /tasks` - Create task
- `GET /tasks/:id` - Get task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

---

## 🛠️ Tech Stack

### Backend
- Spring Boot 3.2.0
- Spring Security + JWT (jjwt 0.12.3)
- Spring Data JPA
- PostgreSQL
- Lombok 1.18.34
- Jakarta Validation

### Frontend
- React 18
- Vite (build tool)
- React Router v6
- Axios (HTTP client)
- Tailwind CSS
- Context API (state management)

---

## 🐛 Troubleshooting

### Backend won't compile
- Make sure you're using Java 17: `./run.sh`
- Run: `JAVA_HOME=/usr/lib/jvm/java-17-openjdk mvn clean install`

### Database connection error
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database exists: `psql -l | grep taskmanager`
- Check credentials in `application.properties`

### Frontend won't connect to backend
- Ensure backend is running on port 8080
- Check Vite proxy configuration in `frontend/vite.config.js`
- Clear browser localStorage and refresh

### Login fails
- Backend creates admin user automatically on first run
- Check backend logs for database initialization
- Verify PostgreSQL user has permissions

---

## 📝 Next Steps

1. **Customize JWT Secret:** Update `jwt.secret` in `application.properties` for production
2. **Add More Users:** Implement user registration endpoint
3. **Email Notifications:** Add task reminders
4. **File Attachments:** Allow uploading files to tasks
5. **Comments:** Add commenting system to tasks
6. **Teams:** Multi-user project collaboration

---

## 📚 Documentation

- Backend API: `/README.md`
- Frontend: `/frontend/README.md`
- API Testing: Use Postman/curl with JWT token

---

**Project is ready to use! 🎉**
