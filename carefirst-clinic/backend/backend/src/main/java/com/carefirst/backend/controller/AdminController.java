package com.carefirst.backend.controller;

import com.carefirst.backend.dto.AdminAppointmentRequest;
import com.carefirst.backend.dto.AdminAppointmentResponse;
import com.carefirst.backend.dto.AdminDoctorRequest;
import com.carefirst.backend.dto.AdminDoctorResponse;
import com.carefirst.backend.dto.AdminScheduleRequest;
import com.carefirst.backend.dto.AdminScheduleResponse;
import com.carefirst.backend.dto.AdminStatusRequest;
import com.carefirst.backend.service.AdminService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @GetMapping("/appointments")
    public List<AdminAppointmentResponse> appointments(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long doctorId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) LocalDate date) {
        return service.appointments(search, doctorId, status, date);
    }

    @PostMapping("/appointments/walk-in")
    public AdminAppointmentResponse walkIn(@Valid @RequestBody AdminAppointmentRequest request) {
        return service.createWalkIn(request);
    }

    @PatchMapping("/appointments/{id}/status")
    public AdminAppointmentResponse status(@PathVariable Long id,
                                           @Valid @RequestBody AdminStatusRequest request) {
        return service.updateStatus(id, request.status());
    }

    @GetMapping("/doctors")
    public List<AdminDoctorResponse> doctors() {
        return service.doctors().stream().map(AdminDoctorResponse::from).toList();
    }

    @PostMapping("/doctors")
    public AdminDoctorResponse createDoctor(@Valid @RequestBody AdminDoctorRequest request) {
        return AdminDoctorResponse.from(service.createDoctor(request));
    }

    @PatchMapping("/doctors/{id}/active")
    public AdminDoctorResponse toggleDoctor(@PathVariable Long id) {
        return AdminDoctorResponse.from(service.toggleDoctor(id));
    }

    @GetMapping("/doctors/{doctorId}/schedule")
    public List<AdminScheduleResponse> schedule(@PathVariable Long doctorId) {
        return service.getSchedule(doctorId);
    }

    @PutMapping("/doctors/{doctorId}/schedule")
    public List<AdminScheduleResponse> replaceSchedule(
            @PathVariable Long doctorId, @Valid @RequestBody AdminScheduleRequest request) {
        return service.replaceSchedule(doctorId, request);
    }
}
