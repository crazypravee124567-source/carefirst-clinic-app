package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorTag;
import java.math.BigDecimal;
import java.util.List;

public record DoctorResponse(
        Long id,
        String name,
        String title,
        String departmentName,
        String departmentSlug,
        String photoUrl,
        Integer yearsExperience,
        BigDecimal consultationFee,
        Double ratingAverage,
        Integer ratingCount,
        boolean boardCertified,
        String visitType,
        String room,
        boolean featured,
        List<String> tags) {

    public static DoctorResponse from(Doctor doctor) {
        return new DoctorResponse(
                doctor.getId(),
                doctor.getName(),
                doctor.getTitle(),
                doctor.getDepartment().getName(),
                doctor.getDepartment().getSlug(),
                doctor.getPhotoUrl(),
                doctor.getYearsExperience(),
                doctor.getConsultationFee(),
                doctor.getRatingAverage(),
                doctor.getRatingCount(),
                doctor.isBoardCertified(),
                doctor.getVisitType(),
                doctor.getRoom(),
                doctor.isFeatured(),
                doctor.getTags().stream().map(DoctorTag::getTag).toList());
    }
}
