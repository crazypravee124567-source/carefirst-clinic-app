package com.carefirst.backend.controller;

import com.carefirst.backend.dto.DayAvailabilityResponse;
import com.carefirst.backend.dto.DaySlotsResponse;
import com.carefirst.backend.service.SlotService;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctors/{doctorId}")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    @GetMapping("/slots")
    public DaySlotsResponse slots(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return slotService.slotsForDay(doctorId, date);
    }

    @GetMapping("/availability")
    public List<DayAvailabilityResponse> availability(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth month) {
        return slotService.availability(doctorId, month);
    }
}
