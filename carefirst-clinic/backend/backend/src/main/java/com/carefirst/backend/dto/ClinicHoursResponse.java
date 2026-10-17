package com.carefirst.backend.dto;

import com.carefirst.backend.entity.ClinicHours;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.Locale;

public record ClinicHoursResponse(
        Integer dayOfWeek,
        String dayName,
        LocalTime openTime,
        LocalTime closeTime,
        String note) {

    public static ClinicHoursResponse from(ClinicHours hours) {
        String dayName = DayOfWeek.of(hours.getDayOfWeek())
                .getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        return new ClinicHoursResponse(
                hours.getDayOfWeek(),
                dayName,
                hours.getOpenTime(),
                hours.getCloseTime(),
                hours.getNote());
    }
}
