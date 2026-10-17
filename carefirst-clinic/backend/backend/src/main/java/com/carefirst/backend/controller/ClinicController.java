package com.carefirst.backend.controller;

import com.carefirst.backend.dto.ClinicHoursResponse;
import com.carefirst.backend.dto.ClinicResponse;
import com.carefirst.backend.service.ClinicHoursService;
import com.carefirst.backend.service.ClinicService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clinic")
public class ClinicController {

    private final ClinicService clinicService;
    private final ClinicHoursService clinicHoursService;

    public ClinicController(ClinicService clinicService,
                            ClinicHoursService clinicHoursService) {
        this.clinicService = clinicService;
        this.clinicHoursService = clinicHoursService;
    }

    @GetMapping
    public ClinicResponse get() {
        return clinicService.get();
    }

    @GetMapping("/hours")
    public List<ClinicHoursResponse> hours() {
        return clinicHoursService.listAll();
    }
}
