package com.carefirst.backend.repository;

import com.carefirst.backend.entity.Department;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByNameIgnoreCase(String name);
    Optional<Department> findBySlug(String slug);

    List<Department> findAllByOrderByNameAsc();
}
