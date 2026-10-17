package com.carefirst.backend.service;

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
import com.carefirst.backend.util.SlotGenerator;
import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SlotService {

    private static final LocalTime NOON = LocalTime.NOON;
    private static final LocalTime FOUR_PM = LocalTime.of(16, 0);

    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final AppointmentRepository appointmentRepository;
    private final Clock clock;

    public SlotService(DoctorRepository doctorRepository,
                       DoctorScheduleRepository scheduleRepository,
                       AppointmentRepository appointmentRepository,
                       Clock clock) {
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.appointmentRepository = appointmentRepository;
        this.clock = clock;
    }

    @Transactional(readOnly = true)
    public DaySlotsResponse slotsForDay(Long doctorId, LocalDate date) {
        requireActiveDoctor(doctorId);

        List<DoctorSchedule> blocks = scheduleRepository
                .findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(doctorId, date.getDayOfWeek().getValue());
        List<LocalTime> times = availableTimes(blocks, date);
        Set<LocalTime> booked = bookedTimes(doctorId, date);
        int free = (int) times.stream().filter(t -> !booked.contains(t)).count();

        return new DaySlotsResponse(
                date,
                free,
                slots(times, booked, t -> t.isBefore(NOON)),
                slots(times, booked, t -> !t.isBefore(NOON) && t.isBefore(FOUR_PM)),
                slots(times, booked, t -> !t.isBefore(FOUR_PM)));
    }

    @Transactional(readOnly = true)
    public List<DayAvailabilityResponse> availability(Long doctorId, YearMonth month) {
        requireActiveDoctor(doctorId);

        Map<Integer, List<DoctorSchedule>> blocksByWeekday = scheduleRepository
                .findAllByDoctorId(doctorId).stream()
                .collect(Collectors.groupingBy(DoctorSchedule::getDayOfWeek));
        LocalDate today = LocalDate.now(clock);

        List<DayAvailabilityResponse> days = new ArrayList<>();
        for (int day = 1; day <= month.lengthOfMonth(); day++) {
            LocalDate date = month.atDay(day);
            List<DoctorSchedule> blocks =
                    blocksByWeekday.getOrDefault(date.getDayOfWeek().getValue(), List.of());
            Set<LocalTime> booked = bookedTimes(doctorId, date);
            int free = (int) availableTimes(blocks, date).stream()
                    .filter(t -> !booked.contains(t))
                    .count();
            days.add(new DayAvailabilityResponse(
                    date,
                    date.isBefore(today),
                    date.equals(today),
                    free));
        }
        return days;
    }

    private void requireActiveDoctor(Long doctorId) {
        doctorRepository.findById(doctorId)
                .filter(Doctor::isActive)
                .orElseThrow(() -> new NotFoundException("Doctor not found"));
    }

    private List<LocalTime> availableTimes(List<DoctorSchedule> blocks, LocalDate date) {
        LocalDate today = LocalDate.now(clock);
        if (date.isBefore(today)) {
            return List.of();
        }

        List<LocalTime> times = blocks.stream()
                .flatMap(block -> SlotGenerator
                        .generate(block.getStartTime(), block.getEndTime(), block.getSlotMinutes())
                        .stream())
                .sorted()
                .toList();

        if (date.equals(today)) {
            LocalTime now = LocalTime.now(clock);
            return times.stream().filter(time -> time.isAfter(now)).toList();
        }
        return times;
    }

    // Times already taken by a BOOKED appointment — the UI draws those as "Taken".
    private Set<LocalTime> bookedTimes(Long doctorId, LocalDate date) {
        return appointmentRepository
                .findByDoctorIdAndAppointmentDateAndStatus(doctorId, date, "BOOKED")
                .stream()
                .map(Appointment::getAppointmentTime)
                .collect(Collectors.toSet());
    }

    private List<SlotResponse> slots(List<LocalTime> times, Set<LocalTime> booked,
                                     Predicate<LocalTime> inGroup) {
        return times.stream()
                .filter(inGroup)
                .map(time -> new SlotResponse(time, !booked.contains(time)))
                .toList();
    }
}
