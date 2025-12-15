package com.taskmanager.repositories;

import com.taskmanager.models.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    
    Page<Task> findByProjectId(Long projectId, Pageable pageable);
    
    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId " +
           "AND (:search IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:completed IS NULL OR t.completed = :completed)")
    Page<Task> findByFilters(@Param("projectId") Long projectId,
                              @Param("search") String search,
                              @Param("completed") Boolean completed,
                              Pageable pageable);
}
