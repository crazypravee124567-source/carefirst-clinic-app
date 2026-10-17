package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Doctor;

public record AdminDoctorResponse(
        Long id, String name, String license, String specialization, boolean active) {
    public static AdminDoctorResponse from(Doctor doctor) {
        return new AdminDoctorResponse(doctor.getId(), doctor.getName(),
                doctor.getLicenseNumber(), doctor.getTitle(), doctor.isActive());
    }
}
