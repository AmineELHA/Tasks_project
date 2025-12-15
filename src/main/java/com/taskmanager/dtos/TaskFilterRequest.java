package com.taskmanager.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskFilterRequest {
    private Long projectId;
    private String search;
    private Boolean completed;
    private String sortBy = "id";
    private String sortDirection = "asc";
    private Integer page = 0;
    private Integer size = 10;
}
