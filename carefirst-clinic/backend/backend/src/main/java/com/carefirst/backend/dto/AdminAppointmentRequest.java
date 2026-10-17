package com.carefirst.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record AdminAppointmentRequest(
        @NotNull Long doctorId,
        @NotBlank String patientName,
        @NotBlank String patientPhone,
        @NotNull LocalDate date,
        @NotNull LocalTime time) {
}
