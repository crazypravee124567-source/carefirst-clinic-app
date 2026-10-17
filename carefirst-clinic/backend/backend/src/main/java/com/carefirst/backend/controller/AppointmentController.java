package com.carefirst.backend.controller;

import com.carefirst.backend.dto.AppointmentRequest;
import com.carefirst.backend.dto.AppointmentResponse;
import com.carefirst.backend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.carefirst.backend.dto.AppointmentCancelRequest;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @GetMapping
    public ResponseEntity<AppointmentResponse> lookup(
            @RequestParam String code,
            @RequestParam String phoneLast4) {
        return ResponseEntity.ok(appointmentService.lookup(code, phoneLast4));
    }

    @PatchMapping("/{code}/cancel")
    public ResponseEntity<AppointmentResponse> cancel(
            @PathVariable String code,
            @Valid @RequestBody AppointmentCancelRequest request) {
        return ResponseEntity.ok(appointmentService.cancel(code, request.reason()));
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> book(
            @Valid @RequestBody AppointmentRequest request) {
        AppointmentResponse response = appointmentService.book(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }
}
