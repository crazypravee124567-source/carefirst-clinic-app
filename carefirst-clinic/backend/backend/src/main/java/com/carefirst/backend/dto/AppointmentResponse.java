package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Appointment;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;

public record AppointmentResponse(
        String bookingCode,
        Long doctorId,
        String doctorName,
        String departmentName,
        LocalDate date,
        LocalTime time,
        String patientName,
        String patientPhone,
        String status,
        OffsetDateTime createdAt) {

    public static AppointmentResponse from(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getBookingCode(),
                appointment.getDoctor().getId(),
                appointment.getDoctor().getName(),
                appointment.getDoctor().getDepartment().getName(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                appointment.getPatientName(),
                appointment.getPatientPhone(),
                appointment.getStatus(),
                appointment.getCreatedAt());
    }
}
