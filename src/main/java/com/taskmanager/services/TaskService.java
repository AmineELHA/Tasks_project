package com.taskmanager.services;

import com.taskmanager.dtos.PageResponse;
import com.taskmanager.dtos.TaskFilterRequest;
import com.taskmanager.dtos.TaskRequest;
import com.taskmanager.dtos.TaskResponse;
import com.taskmanager.models.Project;
import com.taskmanager.models.Task;
import com.taskmanager.models.User;
import com.taskmanager.repositories.ProjectRepository;
import com.taskmanager.repositories.TaskRepository;
import com.taskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public List<TaskResponse> getTasksByProjectId(Long projectId) {
        User currentUser = getCurrentUser();
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to project");
        }
        
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        return tasks.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public PageResponse<TaskResponse> getTasksWithFilters(TaskFilterRequest filterRequest) {
        User currentUser = getCurrentUser();
        Project project = projectRepository.findById(filterRequest.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to project");
        }
        
        Sort sort = filterRequest.getSortDirection().equalsIgnoreCase("desc")
                ? Sort.by(filterRequest.getSortBy()).descending()
                : Sort.by(filterRequest.getSortBy()).ascending();
        
        Pageable pageable = PageRequest.of(filterRequest.getPage(), filterRequest.getSize(), sort);
        
        Page<Task> taskPage = taskRepository.findByFilters(
                filterRequest.getProjectId(),
                filterRequest.getSearch(),
                filterRequest.getCompleted(),
                pageable
        );
        
        List<TaskResponse> content = taskPage.getContent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        
        return new PageResponse<>(
                content,
                taskPage.getNumber(),
                taskPage.getSize(),
                taskPage.getTotalElements(),
                taskPage.getTotalPages(),
                taskPage.isFirst(),
                taskPage.isLast()
        );
    }
    
    public TaskResponse getTaskById(Long id) {
        User currentUser = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getProject().getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }
        
        return convertToResponse(task);
    }
    
    public TaskResponse createTask(TaskRequest request) {
        User currentUser = getCurrentUser();
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to project");
        }
        
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        task.setCompleted(request.getCompleted());
        task.setProject(project);
        
        Task savedTask = taskRepository.save(task);
        return convertToResponse(savedTask);
    }
    
    public TaskResponse updateTask(Long id, TaskRequest request) {
        User currentUser = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getProject().getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }
        
        // Check if project is being changed and validate access
        if (!task.getProject().getId().equals(request.getProjectId())) {
            Project newProject = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            
            if (!newProject.getUser().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Unauthorized access to target project");
            }
            
            task.setProject(newProject);
        }
        
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        task.setCompleted(request.getCompleted());
        
        Task updatedTask = taskRepository.save(task);
        return convertToResponse(updatedTask);
    }
    
    public void deleteTask(Long id) {
        User currentUser = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getProject().getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }
        
        taskRepository.delete(task);
    }
    
    private TaskResponse convertToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getCompleted(),
                task.getProject().getId()
        );
    }
}
