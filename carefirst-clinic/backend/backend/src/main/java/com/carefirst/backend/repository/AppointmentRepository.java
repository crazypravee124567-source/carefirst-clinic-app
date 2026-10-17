package com.carefirst.backend.repository;

import com.carefirst.backend.entity.Appointment;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByBookingCode(String bookingCode);

    boolean existsByBookingCode(String bookingCode);

    List<Appointment> findByDoctorIdAndAppointmentDateAndStatus(
            Long doctorId, LocalDate appointmentDate, String status);

    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatus(
            Long doctorId, LocalDate appointmentDate, LocalTime appointmentTime, String status);

    List<Appointment> findAllByOrderByAppointmentDateAscAppointmentTimeAsc();

    List<Appointment> findAllByAppointmentDateOrderByAppointmentTimeAsc(LocalDate appointmentDate);
}