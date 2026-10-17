package com.carefirst.backend.dto;

import java.time.LocalDate;

public record DayAvailabilityResponse(
        LocalDate date,
        boolean past,
        boolean today,
        int availableSlots) {
}
