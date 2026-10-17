package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Department;

public record DepartmentResponse(Long id, String name, String slug) {

    public static DepartmentResponse from(Department department) {
        return new DepartmentResponse(
                department.getId(), department.getName(), department.getSlug());
    }
}
