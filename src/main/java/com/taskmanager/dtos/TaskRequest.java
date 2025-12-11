package com.taskmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    private LocalDate dueDate;
    
    @NotNull(message = "Completed status is required")
    private Boolean completed;
    
    @NotNull(message = "Project ID is required")
    private Long projectId;
}
