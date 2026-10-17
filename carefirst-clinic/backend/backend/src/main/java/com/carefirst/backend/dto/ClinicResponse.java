package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Clinic;

public record ClinicResponse(
        Long id,
        String name,
        String phone,
        String smsNumber,
        String address,
        String district,
        String parkingInfo,
        String mapUrl) {

    public static ClinicResponse from(Clinic clinic) {
        return new ClinicResponse(
                clinic.getId(),
                clinic.getName(),
                clinic.getPhone(),
                clinic.getSmsNumber(),
                clinic.getAddress(),
                clinic.getDistrict(),
                clinic.getParkingInfo(),
                clinic.getMapUrl());
    }
}
