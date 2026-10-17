package com.carefirst.backend.dto;

import java.time.LocalDate;
import java.util.List;

public record DaySlotsResponse(
        LocalDate date,
        int availableCount,
        List<SlotResponse> morning,
        List<SlotResponse> afternoon,
        List<SlotResponse> evening) {
}
