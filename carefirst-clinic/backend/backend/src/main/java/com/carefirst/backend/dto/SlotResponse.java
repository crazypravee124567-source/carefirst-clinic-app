package com.carefirst.backend.dto;

import java.time.LocalTime;

public record SlotResponse(LocalTime time, boolean available) {
}
