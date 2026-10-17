package com.carefirst.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carefirst.backend.dto.DayAvailabilityResponse;
import com.carefirst.backend.dto.DaySlotsResponse;
import com.carefirst.backend.dto.SlotResponse;
import com.carefirst.backend.entity.Appointment;
import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorSchedule;
import com.carefirst.backend.exception.NotFoundException;
import com.carefirst.backend.repository.AppointmentRepository;
import com.carefirst.backend.repository.DoctorRepository;
import com.carefirst.backend.repository.DoctorScheduleRepository;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SlotServiceTest {

    private final DoctorRepository doctorRepository = mock(DoctorRepository.class);
    private final DoctorScheduleRepository scheduleRepository = mock(DoctorScheduleRepository.class);
    private final AppointmentRepository appointmentRepository = mock(AppointmentRepository.class);

    // Tuesday 13 October 2026, 10:00 in India (04:30 UTC)
    private final Clock clock =
            Clock.fixed(Instant.parse("2026-10-13T04:30:00Z"), ZoneId.of("Asia/Kolkata"));

    private final SlotService service = new SlotService(doctorRepository, scheduleRepository, appointmentRepository, clock);

    @BeforeEach
    void setUp() {
        Doctor doctor = mock(Doctor.class);
        when(doctor.isActive()).thenReturn(true);
        when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));

        // This doctor works Tuesdays only: 09:00-12:00 and 14:00-18:00
        List<DoctorSchedule> tuesday = List.of(block(2, 9, 12), block(2, 14, 18));
        when(scheduleRepository.findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(1L, 2)).thenReturn(tuesday);
        when(scheduleRepository.findAllByDoctorId(1L)).thenReturn(tuesday);
    }

    private DoctorSchedule block(int dayOfWeek, int startHour, int endHour) {
        DoctorSchedule schedule = mock(DoctorSchedule.class);
        when(schedule.getDayOfWeek()).thenReturn(dayOfWeek);
        when(schedule.getStartTime()).thenReturn(LocalTime.of(startHour, 0));
        when(schedule.getEndTime()).thenReturn(LocalTime.of(endHour, 0));
        when(schedule.getSlotMinutes()).thenReturn(30);
        return schedule;
    }

    @Test
    void futureTuesdayHasFourteenSlotsGroupedByPeriod() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 20));

        assertEquals(14, day.availableCount());
        assertEquals(6, day.morning().size());
        assertEquals(4, day.afternoon().size());
        assertEquals(4, day.evening().size());
    }

    @Test
    void todayHidesSlotsThatAlreadyStarted() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 13));

        assertEquals(11, day.availableCount());
        assertEquals(3, day.morning().size());
        assertEquals(LocalTime.of(10, 30), day.morning().get(0).time());
    }

    @Test
    void pastDayHasNoSlots() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 12));

        assertEquals(0, day.availableCount());
    }

    @Test
    void dayWithoutScheduleHasNoSlots() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 21));

        assertEquals(0, day.availableCount());
        assertTrue(day.morning().isEmpty());
    }

    @Test
    void unknownDoctorIsNotFound() {
        assertThrows(NotFoundException.class,
                () -> service.slotsForDay(99L, LocalDate.of(2026, 10, 20)));
    }

    @Test
    void availabilityMarksPastAndTodayAndCountsSlots() {
        List<DayAvailabilityResponse> days = service.availability(1L, YearMonth.of(2026, 10));

        assertEquals(31, days.size());
        assertTrue(days.get(11).past());           // 12 October
        assertEquals(0, days.get(11).availableSlots());
        assertTrue(days.get(12).today());          // 13 October
        assertEquals(11, days.get(12).availableSlots());
        assertEquals(14, days.get(19).availableSlots());   // 20 October
    }

    @Test
    void bookedSlotIsShownAsTakenAndRemovedFromCount() {
        Appointment taken = appointmentAt(LocalTime.of(10, 0));
        when(appointmentRepository.findByDoctorIdAndAppointmentDateAndStatus(
                1L, LocalDate.of(2026, 10, 20), "BOOKED"))
                .thenReturn(List.of(taken));

        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 20));

        assertEquals(13, day.availableCount());                  // one slot fewer
        assertEquals(6, day.morning().size());                   // the taken slot is still listed…
        assertEquals(false, day.morning().get(2).available());   // …but flagged (10:00)
        assertEquals(5, day.morning().stream().filter(SlotResponse::available).count());
    }

    @Test
    void availabilityCountExcludesBookedSlots() {
        Appointment taken = appointmentAt(LocalTime.of(10, 0));
        when(appointmentRepository.findByDoctorIdAndAppointmentDateAndStatus(
                1L, LocalDate.of(2026, 10, 20), "BOOKED"))
                .thenReturn(List.of(taken));

        List<DayAvailabilityResponse> days = service.availability(1L, YearMonth.of(2026, 10));

        assertEquals(13, days.get(19).availableSlots());        // 20 October minus the taken 10:00
    }

    private Appointment appointmentAt(LocalTime time) {
        Appointment appointment = mock(Appointment.class);
        when(appointment.getAppointmentTime()).thenReturn(time);
        return appointment;
    }
}
