package com.carefirst.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carefirst.backend.dto.AppointmentRequest;
import com.carefirst.backend.dto.AppointmentResponse;
import com.carefirst.backend.entity.Appointment;
import com.carefirst.backend.entity.Department;
import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorSchedule;
import com.carefirst.backend.exception.ConflictException;
import com.carefirst.backend.exception.NotFoundException;
import com.carefirst.backend.repository.AppointmentRepository;
import com.carefirst.backend.repository.DoctorRepository;
import com.carefirst.backend.repository.DoctorScheduleRepository;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AppointmentServiceTest {

    private final DoctorRepository doctorRepository = mock(DoctorRepository.class);
    private final DoctorScheduleRepository scheduleRepository = mock(DoctorScheduleRepository.class);
    private final AppointmentRepository appointmentRepository = mock(AppointmentRepository.class);

    private Doctor doctor;

    // Tuesday 13 October 2026, 10:00 in India (04:30 UTC) — same fixed clock style
    // as SlotServiceTest, so "today" and "now" never change between runs.
    private final Clock clock =
            Clock.fixed(Instant.parse("2026-10-13T04:30:00Z"), ZoneId.of("Asia/Kolkata"));

    private final AppointmentService service = new AppointmentService(
            appointmentRepository, doctorRepository, scheduleRepository, clock);

    private final LocalDate nextTuesday = LocalDate.of(2026, 10, 20);

    @BeforeEach
    void setUp() {
        Department department = mock(Department.class);
        when(department.getName()).thenReturn("Family Medicine");

        doctor = mock(Doctor.class);
        when(doctor.getId()).thenReturn(1L);
        when(doctor.isActive()).thenReturn(true);
        when(doctor.getName()).thenReturn("Dr. Sarah Jenkins");
        when(doctor.getDepartment()).thenReturn(department);
        when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));

        // This doctor works Tuesdays only: 09:00-12:00 and 14:00-18:00
        List<DoctorSchedule> tuesday = List.of(block(9, 12), block(14, 18));
        when(scheduleRepository.findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(1L, 2))
                .thenReturn(tuesday);

        // No booking codes taken, slot free, and save() returns the real entity
        when(appointmentRepository.existsByBookingCode(any())).thenReturn(false);
        when(appointmentRepository.save(any(Appointment.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
    }

    private DoctorSchedule block(int startHour, int endHour) {
        DoctorSchedule schedule = mock(DoctorSchedule.class);
        when(schedule.getStartTime()).thenReturn(LocalTime.of(startHour, 0));
        when(schedule.getEndTime()).thenReturn(LocalTime.of(endHour, 0));
        when(schedule.getSlotMinutes()).thenReturn(30);
        return schedule;
    }

    private AppointmentRequest request(LocalDate date, LocalTime time) {
        return new AppointmentRequest(1L, "Alex Morgan", "9876543210", date, time);
    }

    private Appointment storedAppointment() {
        return new Appointment("CF-12345678", doctor, "Alex Morgan", "9876543210",
                nextTuesday, LocalTime.of(10, 30), OffsetDateTime.now(clock));
    }

    @Test
    void bookingValidFutureSlotSucceeds() {
        AppointmentResponse response = service.book(request(nextTuesday, LocalTime.of(10, 30)));

        assertTrue(response.bookingCode().matches("CF-\\d{8}"),
                "expected CF- followed by 8 digits, got " + response.bookingCode());
        assertEquals("Dr. Sarah Jenkins", response.doctorName());
        assertEquals("Family Medicine", response.departmentName());
        assertEquals("Alex Morgan", response.patientName());
        assertEquals("BOOKED", response.status());
        assertEquals(nextTuesday, response.date());
        assertEquals(LocalTime.of(10, 30), response.time());
    }

    @Test
    void unknownDoctorIsNotFound() {
        assertThrows(NotFoundException.class,
                () -> service.book(request(nextTuesday, LocalTime.of(10, 30)).withDoctorId(99L)));
    }

    @Test
    void inactiveDoctorIsNotFound() {
        Doctor inactive = mock(Doctor.class);
        when(inactive.isActive()).thenReturn(false);
        when(doctorRepository.findById(2L)).thenReturn(Optional.of(inactive));

        assertThrows(NotFoundException.class,
                () -> service.book(request(nextTuesday, LocalTime.of(10, 30)).withDoctorId(2L)));
    }

    @Test
    void pastDateIsConflict() {
        assertThrows(ConflictException.class,
                () -> service.book(request(LocalDate.of(2026, 10, 12), LocalTime.of(10, 30))));
    }

    @Test
    void timeAlreadyPassedTodayIsConflict() {
        // Clock says 10:00 today, so a 09:30 slot can no longer be booked
        assertThrows(ConflictException.class,
                () -> service.book(request(LocalDate.of(2026, 10, 13), LocalTime.of(9, 30))));
    }

    @Test
    void timeNotInScheduleIsNotFound() {
        // 13:00 falls in the lunch gap between the two Tuesday blocks
        assertThrows(NotFoundException.class,
                () -> service.book(request(nextTuesday, LocalTime.of(13, 0))));
    }

    @Test
    void alreadyBookedSlotIsConflict() {
        when(appointmentRepository
                .existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatus(
                        1L, nextTuesday, LocalTime.of(10, 30), "BOOKED"))
                .thenReturn(true);

        assertThrows(ConflictException.class,
                () -> service.book(request(nextTuesday, LocalTime.of(10, 30))));
    }

    @Test
    void lookupReturnsAppointmentWhenPhoneLast4Matches() {
        Appointment stored = storedAppointment();
        when(appointmentRepository.findByBookingCode("CF-12345678"))
                .thenReturn(Optional.of(stored));

        AppointmentResponse response = service.lookup("CF-12345678", "3210");

        assertEquals("CF-12345678", response.bookingCode());
        assertEquals("BOOKED", response.status());
    }

    @Test
    void lookupWithWrongPhoneLast4IsNotFound() {
        when(appointmentRepository.findByBookingCode("CF-12345678"))
                .thenReturn(Optional.of(storedAppointment()));

        assertThrows(NotFoundException.class,
                () -> service.lookup("CF-12345678", "9999"));
    }

    @Test
    void cancelMarksAppointmentAsCancelled() {
        Appointment stored = storedAppointment();
        when(appointmentRepository.findByBookingCode("CF-12345678"))
                .thenReturn(Optional.of(stored));

        AppointmentResponse response = service.cancel("CF-12345678", "Need another date");

        assertEquals("CANCELLED", response.status());
        assertEquals("Need another date", stored.getCancelReason());
    }

    @Test
    void cancellingUnknownCodeIsNotFound() {
        when(appointmentRepository.findByBookingCode(any())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> service.cancel("CF-00000000", "Reason"));
    }

    @Test
    void cancellingTwiceIsConflict() {
        Appointment stored = storedAppointment();
        stored.cancel("First cancellation");
        when(appointmentRepository.findByBookingCode("CF-12345678"))
                .thenReturn(Optional.of(stored));

        assertThrows(ConflictException.class,
                () -> service.cancel("CF-12345678", "Second attempt"));
    }
}