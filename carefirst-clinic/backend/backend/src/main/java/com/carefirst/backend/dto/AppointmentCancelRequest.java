package com.carefirst.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record AppointmentCancelRequest(
        @NotBlank(message = "reason is required")
        @Pattern(regexp = "^[A-Za-z0-9 ,.'-]{2,150}$",
                message = "reason must be 2-150 characters")
        String reason) {
}
