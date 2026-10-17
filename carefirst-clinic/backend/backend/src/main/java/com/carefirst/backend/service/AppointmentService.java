package com.carefirst.backend.service;

import com.carefirst.backend.dto.AppointmentRequest;
import com.carefirst.backend.dto.AppointmentResponse;
import com.carefirst.backend.entity.Appointment;
import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorSchedule;
import com.carefirst.backend.exception.ConflictException;
import com.carefirst.backend.exception.NotFoundException;
import com.carefirst.backend.repository.AppointmentRepository;
import com.carefirst.backend.repository.DoctorRepository;
import com.carefirst.backend.repository.DoctorScheduleRepository;
import com.carefirst.backend.util.SlotGenerator;
import java.security.SecureRandom;
import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppointmentService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final Clock clock;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              DoctorRepository doctorRepository,
                              DoctorScheduleRepository scheduleRepository,
                              Clock clock) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.clock = clock;
    }

    @Transactional
    public AppointmentResponse book(AppointmentRequest request) {

        // 1. Doctor must exist AND be active
        Doctor doctor = doctorRepository.findById(request.doctorId())
                .filter(Doctor::isActive)
                .orElseThrow(() -> new NotFoundException("Doctor not found"));

        // 2. No bookings in the past, and today's slots must not have started yet
        LocalDate today = LocalDate.now(clock);
        if (request.date().isBefore(today)) {
            throw new ConflictException("Cannot book a slot in the past");
        }
        if (request.date().equals(today)
                && !request.time().isAfter(LocalTime.now(clock))) {
            throw new ConflictException("That time has already passed today");
        }

        // 3. The requested time must be one this doctor actually works
        List<DoctorSchedule> blocks = scheduleRepository
                .findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(
                        doctor.getId(), request.date().getDayOfWeek().getValue());

        List<LocalTime> offered = blocks.stream()
                .flatMap(block -> SlotGenerator
                        .generate(block.getStartTime(), block.getEndTime(), block.getSlotMinutes())
                        .stream())
                .toList();

        if (!offered.contains(request.time())) {
            throw new NotFoundException("This doctor does not offer a slot at that time");
        }

        // 4. The slot must not already be taken
        if (appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatus(
                doctor.getId(), request.date(), request.time(), "BOOKED")) {
            throw new ConflictException("That slot is already booked. Please choose another.");
        }

        // 5. Build, save, return
        Appointment appointment = new Appointment(
                generateBookingCode(), doctor,
                request.patientName().trim(), request.patientPhone().trim(),
                request.date(), request.time(),
                OffsetDateTime.now(clock));

        try {
            Appointment saved = appointmentRepository.save(appointment);
            return AppointmentResponse.from(saved);
        } catch (DataIntegrityViolationException e) {
            // Two users clicked the same slot at the same moment —
            // the unique index in V8 caught it, turn that into a friendly 409.
            throw new ConflictException("That slot was just taken. Please choose another.");
        }
    }

    private String generateBookingCode() {
        for (int attempt = 0; attempt < 5; attempt++) {
            int number = 10_000_000 + RANDOM.nextInt(90_000_000); // 8 digits
            String code = "CF-" + number;
            if (!appointmentRepository.existsByBookingCode(code)) {
                return code;
            }
        }
        throw new ConflictException("Could not generate a booking code, please try again");
    }
    @Transactional(readOnly = true)
    public AppointmentResponse lookup(String code, String phoneLast4) {
        if (phoneLast4 == null || !phoneLast4.matches("\\d{4}")) {
            // Same message as "not found" on purpose — never reveal WHICH
            // part of the credentials was wrong to an anonymous caller.
            throw new NotFoundException(
                    "No appointment found for that booking code and phone number");
        }

        Appointment appointment = appointmentRepository
                .findByBookingCode(code.trim().toUpperCase())
                .filter(a -> a.getPatientPhone().endsWith(phoneLast4))
                .orElseThrow(() -> new NotFoundException(
                        "No appointment found for that booking code and phone number"));

        return AppointmentResponse.from(appointment);
    }

    @Transactional
    public AppointmentResponse cancel(String code, String reason) {
        Appointment appointment = appointmentRepository
                .findByBookingCode(code.trim().toUpperCase())
                .orElseThrow(() -> new NotFoundException("Appointment not found"));

        if (!appointment.isBooked()) {
            throw new ConflictException("This appointment is already cancelled");
        }

        appointment.cancel(reason.trim());          // the entity method you wrote
        appointmentRepository.save(appointment);
        return AppointmentResponse.from(appointment);
    }
}