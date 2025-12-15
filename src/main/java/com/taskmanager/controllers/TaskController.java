package com.taskmanager.controllers;

import com.taskmanager.dtos.PageResponse;
import com.taskmanager.dtos.TaskFilterRequest;
import com.taskmanager.dtos.TaskRequest;
import com.taskmanager.dtos.TaskResponse;
import com.taskmanager.services.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasksByProjectId(@RequestParam Long projectId) {
        List<TaskResponse> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/filter")
    public ResponseEntity<PageResponse<TaskResponse>> getTasksWithFilters(
            @RequestParam Long projectId,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size) {
        
        TaskFilterRequest filterRequest = new TaskFilterRequest(
                projectId, search, completed, sortBy, sortDirection, page, size
        );
        
        PageResponse<TaskResponse> tasks = taskService.getTasksWithFilters(filterRequest);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        TaskResponse task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }
    
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {
        TaskResponse task = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequest request) {
        TaskResponse task = taskService.updateTask(id, request);
        return ResponseEntity.ok(task);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
