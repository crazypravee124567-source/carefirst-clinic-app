package com.carefirst.backend.util;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public final class SlotGenerator {

    private SlotGenerator() {
    }

    public static List<LocalTime> generate(LocalTime start, LocalTime end, int slotMinutes) {
        if (slotMinutes <= 0) {
            throw new IllegalArgumentException("slotMinutes must be positive");
        }

        int startMinute = start.getHour() * 60 + start.getMinute();
        int endMinute = end.getHour() * 60 + end.getMinute();

        List<LocalTime> slots = new ArrayList<>();
        for (int minute = startMinute; minute + slotMinutes <= endMinute; minute += slotMinutes) {
            slots.add(LocalTime.of(minute / 60, minute % 60));
        }
        return slots;
    }
}
