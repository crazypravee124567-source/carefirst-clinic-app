package com.carefirst.backend.controller;

import com.carefirst.backend.dto.DoctorResponse;
import com.carefirst.backend.service.DoctorService;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public List<DoctorResponse> list(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) BigDecimal maxFee,
            @RequestParam(defaultValue = "false") boolean featured) {
        return doctorService.list(department, search, minRating, maxFee, featured);
    }
}
