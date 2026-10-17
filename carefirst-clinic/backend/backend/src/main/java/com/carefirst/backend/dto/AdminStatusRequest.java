package com.carefirst.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminStatusRequest(@NotBlank String status) {
}
