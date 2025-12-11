package com.taskmanager.services;

import com.taskmanager.dtos.ProjectRequest;
import com.taskmanager.dtos.ProjectResponse;
import com.taskmanager.dtos.ProgressResponse;
import com.taskmanager.models.Project;
import com.taskmanager.models.Task;
import com.taskmanager.models.User;
import com.taskmanager.repositories.ProjectRepository;
import com.taskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public List<ProjectResponse> getAllProjects() {
        User currentUser = getCurrentUser();
        List<Project> projects = projectRepository.findByUserId(currentUser.getId());
        
        return projects.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public ProjectResponse getProjectById(Long id) {
        User currentUser = getCurrentUser();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to project");
        }
        
        return convertToResponse(project);
    }
    
    public ProjectResponse createProject(ProjectRequest request) {
        User currentUser = getCurrentUser();
        
        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setUser(currentUser);
        
        Project savedProject = projectRepository.save(project);
        return convertToResponse(savedProject);
    }
    
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        User currentUser = getCurrentUser();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to project");
        }
        
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        
        Project updatedProject = projectRepository.save(project);
        return convertToResponse(updatedProject);
    }
    
    public void deleteProject(Long id) {
        User currentUser = getCurrentUser();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to project");
        }
        
        projectRepository.delete(project);
    }
    
    public ProgressResponse getProjectProgress(Long id) {
        User currentUser = getCurrentUser();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to project");
        }
        
        List<Task> tasks = project.getTasks();
        int totalTasks = tasks.size();
        int completedTasks = (int) tasks.stream()
                .filter(Task::getCompleted)
                .count();
        
        double progressPercentage = totalTasks == 0 ? 0.0 : (completedTasks * 100.0) / totalTasks;
        
        return new ProgressResponse(totalTasks, completedTasks, progressPercentage);
    }
    
    private ProjectResponse convertToResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getUser().getId()
        );
    }
}
