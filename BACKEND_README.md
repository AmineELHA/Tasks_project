# Task Manager API - Spring Boot 3

A RESTful API for managing tasks and projects with JWT authentication.

## Features

- JWT-based authentication
- User management with BCrypt password hashing
- Project CRUD operations
- Task CRUD operations with project association
- Project progress tracking
- Global exception handling
- Input validation

## Tech Stack

- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (jjwt 0.12.3)
- Lombok
- Maven

## Project Structure

```
src/main/java/com/taskmanager/
├── controllers/        # REST controllers
├── services/          # Business logic
├── repositories/      # Data access layer
├── models/            # Entity classes
├── dtos/              # Data transfer objects
├── security/          # Security configuration & JWT
└── exception/         # Global exception handler
```

## Prerequisites

- **Java 17** (required - Lombok compatibility)
- Maven 3.6+
- PostgreSQL 12+

**Important:** This project must be built with Java 17 due to Lombok compatibility. If you have multiple Java versions installed, use the provided `run.sh` script or set JAVA_HOME:

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
```

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE taskmanager;
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Running the Application

### Option 1: Using the provided script (Recommended)
```bash
./run.sh
```

### Option 2: Manual setup

1. Set Java 17 (if you have multiple Java versions):
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```

2. Install dependencies:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Default User

A default user is created automatically:
- Email: `admin@demo.com`
- Password: `123456`

## API Endpoints

### Authentication

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "123456"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "admin@demo.com"
}
```

### Projects

All project endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-token>
```

#### Get All Projects
```http
GET /projects
```

#### Get Project by ID
```http
GET /projects/{id}
```

#### Create Project
```http
POST /projects
Content-Type: application/json

{
  "title": "My Project",
  "description": "Project description"
}
```

#### Update Project
```http
PUT /projects/{id}
Content-Type: application/json

{
  "title": "Updated Project",
  "description": "Updated description"
}
```

#### Delete Project
```http
DELETE /projects/{id}
```

#### Get Project Progress
```http
GET /projects/{id}/progress

Response:
{
  "totalTasks": 10,
  "completedTasks": 7,
  "progressPercentage": 70.0
}
```

### Tasks

#### Get Tasks by Project
```http
GET /tasks?projectId={projectId}
```

#### Get Task by ID
```http
GET /tasks/{id}
```

#### Create Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2025-12-31",
  "completed": false,
  "projectId": 1
}
```

#### Update Task
```http
PUT /tasks/{id}
Content-Type: application/json

{
  "title": "Updated task",
  "description": "Updated description",
  "dueDate": "2025-12-31",
  "completed": true,
  "projectId": 1
}
```

#### Delete Task
```http
DELETE /tasks/{id}
```

## Security

- JWT tokens expire after 24 hours (configurable in application.properties)
- Only `/auth/login` endpoint is public
- All other endpoints require valid JWT token
- Users can only access their own projects and tasks

## Configuration

Key configuration properties in `application.properties`:

```properties
# JWT Secret (should be at least 256 bits for HS256)
jwt.secret=yourSecretKeyMustBeAtLeast256BitsLongForHS256AlgorithmToWorkProperly

# JWT Expiration (in milliseconds, default: 24 hours)
jwt.expiration=86400000

# Database URL
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "status": 400
}
```

Validation errors return field-specific messages:

```json
{
  "email": "Email is required",
  "password": "Password is required"
}
```

## Building for Production

```bash
mvn clean package
java -jar target/task-manager-1.0.0.jar
```

## Notes

- The application uses BCrypt for password hashing
- Database schema is created automatically via JPA
- Initial user data is loaded from `data.sql`
- CORS is not configured by default (add if needed for frontend)
