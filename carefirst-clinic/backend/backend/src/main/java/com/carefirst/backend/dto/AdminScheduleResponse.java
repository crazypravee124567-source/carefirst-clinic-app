package com.carefirst.backend.dto;

import com.carefirst.backend.entity.DoctorSchedule;
import java.time.LocalTime;

public record AdminScheduleResponse(
        Long id, int dayOfWeek, LocalTime startTime, LocalTime endTime, int slotMinutes) {
    public static AdminScheduleResponse from(DoctorSchedule schedule) {
        return new AdminScheduleResponse(schedule.getId(), schedule.getDayOfWeek(),
                schedule.getStartTime(), schedule.getEndTime(), schedule.getSlotMinutes());
    }
}
