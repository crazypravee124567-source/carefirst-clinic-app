package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Appointment;
import java.time.LocalDate;
import java.time.LocalTime;

public record AdminAppointmentResponse(
        Long id,
        String bookingCode,
        LocalTime time,
        String patientName,
        String patientPhone,
        String doctor,
        Long doctorId,
        LocalDate date,
        String status) {

    public static AdminAppointmentResponse from(Appointment appointment) {
        return new AdminAppointmentResponse(
                appointment.getId(), appointment.getBookingCode(),
                appointment.getAppointmentTime(), appointment.getPatientName(),
                appointment.getPatientPhone(), appointment.getDoctor().getName(),
                appointment.getDoctor().getId(), appointment.getAppointmentDate(),
                appointment.getStatus());
    }
}
