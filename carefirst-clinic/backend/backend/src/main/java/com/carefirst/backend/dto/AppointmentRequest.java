package com.carefirst.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequest(
        @NotNull(message = "doctorId is required")
        Long doctorId,

        @NotBlank(message = "patientName is required")
        @Pattern(regexp = "^[A-Za-z .'-]{2,150}$",
                message = "patientName may only contain letters, spaces, dots, hyphens")
        String patientName,

        @NotBlank(message = "patientPhone is required")
        @Pattern(regexp = "^(?:\\+91\\s?)?[6-9]\\d{9}$",
                message = "patientPhone must be a 10-digit Indian mobile number")
        String patientPhone,

        @NotNull(message = "date is required")
        LocalDate date,

        @NotNull(message = "time is required")
        LocalTime time) {
    // Test helper: lets tests reuse one request with a different doctor,
    // instead of copy-pasting five identical request objects.
    public AppointmentRequest withDoctorId(Long otherDoctorId) {
        return new AppointmentRequest(otherDoctorId, patientName, patientPhone, date, time);
    }
}
