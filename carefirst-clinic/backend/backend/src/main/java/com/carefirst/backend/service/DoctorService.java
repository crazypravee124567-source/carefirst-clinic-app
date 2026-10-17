package com.carefirst.backend.service;

import com.carefirst.backend.dto.DoctorResponse;
import com.carefirst.backend.repository.DoctorRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DoctorService {

    private static final BigDecimal NO_FEE_LIMIT = new BigDecimal("100000");

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Transactional(readOnly = true)
    public List<DoctorResponse> list(String department, String search,
                                     Double minRating, BigDecimal maxFee,
                                     boolean featuredOnly) {

        String departmentSlug = department == null ? "" : department.trim().toLowerCase(Locale.ROOT);
        String term = search == null ? "" : search.trim().toLowerCase(Locale.ROOT);
        String pattern = "%" + term + "%";
        double rating = minRating == null ? 0.0 : minRating;
        BigDecimal fee = maxFee == null ? NO_FEE_LIMIT : maxFee;

        return doctorRepository.search(departmentSlug, pattern, rating, fee, featuredOnly)
                .stream()
                .map(DoctorResponse::from)
                .toList();
    }
}
