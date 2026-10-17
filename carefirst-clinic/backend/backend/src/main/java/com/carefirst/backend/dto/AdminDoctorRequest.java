package com.carefirst.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminDoctorRequest(
        @NotBlank String name,
        @NotBlank String license,
        @NotBlank String specialization) {
}
